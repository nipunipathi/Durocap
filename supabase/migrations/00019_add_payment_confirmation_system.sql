/*
# Add Payment Confirmation System

## Overview
Implement a payment confirmation workflow where users can mark payments as made,
admins receive notifications, and confirmed payments are tracked in revenue reports.

## Changes
1. Add payment_confirmation_status to orders table
2. Create notifications table for admin alerts
3. Add payment_confirmed_at timestamp
4. Add payment_confirmed_by admin reference
5. Create indexes for performance

## Payment Confirmation Flow
- User clicks "I have made payment" → status becomes 'pending_confirmation'
- Admin receives notification
- Admin confirms → status becomes 'confirmed', added to revenue
- Admin rejects → status becomes 'payment_failed'

## Security
- Users can only update their own orders to pending_confirmation
- Only admins can confirm/reject payments
- Notifications are admin-only access
*/

-- Add payment confirmation enum
CREATE TYPE payment_confirmation_status AS ENUM (
  'not_submitted',
  'pending_confirmation', 
  'confirmed',
  'payment_failed'
);

-- Add payment confirmation columns to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_confirmation_status payment_confirmation_status DEFAULT 'not_submitted'::payment_confirmation_status,
ADD COLUMN IF NOT EXISTS payment_submitted_at timestamptz,
ADD COLUMN IF NOT EXISTS payment_confirmed_at timestamptz,
ADD COLUMN IF NOT EXISTS payment_confirmed_by uuid REFERENCES profiles(id),
ADD COLUMN IF NOT EXISTS payment_notes text;

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  related_id uuid,
  related_type text,
  is_read boolean DEFAULT false,
  created_for_admin boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_confirmation_status);
CREATE INDEX IF NOT EXISTS idx_orders_confirmed_at ON orders(payment_confirmed_at);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON notifications(is_read, created_at DESC);

-- Enable RLS on notifications
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Policy: Only admins can view notifications
CREATE POLICY "Admins can view all notifications"
ON notifications FOR SELECT
TO authenticated
USING (is_admin(auth.uid()));

-- Policy: System can insert notifications
CREATE POLICY "System can create notifications"
ON notifications FOR INSERT
WITH CHECK (true);

-- Policy: Admins can mark notifications as read
CREATE POLICY "Admins can update notifications"
ON notifications FOR UPDATE
TO authenticated
USING (is_admin(auth.uid()));

-- Function to create notification when payment is submitted
CREATE OR REPLACE FUNCTION notify_admin_payment_submitted()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.payment_confirmation_status = 'pending_confirmation' 
     AND OLD.payment_confirmation_status = 'not_submitted' THEN
    INSERT INTO notifications (
      type,
      title,
      message,
      related_id,
      related_type,
      created_for_admin
    ) VALUES (
      'payment_confirmation',
      'New Payment Confirmation Required',
      'Order #' || SUBSTRING(NEW.id::text, 1, 8) || ' - Customer ' || COALESCE(NEW.customer_name, 'Unknown') || ' has submitted payment of $' || NEW.total_amount,
      NEW.id,
      'order',
      true
    );
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for payment submission notifications
DROP TRIGGER IF EXISTS trigger_payment_submitted ON orders;
CREATE TRIGGER trigger_payment_submitted
AFTER UPDATE ON orders
FOR EACH ROW
EXECUTE FUNCTION notify_admin_payment_submitted();

-- Function to update order payment status (for users)
CREATE OR REPLACE FUNCTION submit_payment_confirmation(order_id uuid)
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  UPDATE orders
  SET 
    payment_confirmation_status = 'pending_confirmation'::payment_confirmation_status,
    payment_submitted_at = now()
  WHERE id = order_id
    AND user_id = auth.uid()
    AND payment_confirmation_status = 'not_submitted'::payment_confirmation_status;
  
  IF FOUND THEN
    SELECT json_build_object(
      'success', true,
      'message', 'Payment confirmation submitted successfully'
    ) INTO result;
  ELSE
    SELECT json_build_object(
      'success', false,
      'message', 'Unable to submit payment confirmation'
    ) INTO result;
  END IF;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to confirm payment (for admins)
CREATE OR REPLACE FUNCTION confirm_payment(
  order_id uuid,
  notes text DEFAULT NULL
)
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  -- Check if user is admin
  IF NOT is_admin(auth.uid()) THEN
    SELECT json_build_object(
      'success', false,
      'message', 'Unauthorized: Admin access required'
    ) INTO result;
    RETURN result;
  END IF;

  UPDATE orders
  SET 
    payment_confirmation_status = 'confirmed'::payment_confirmation_status,
    payment_confirmed_at = now(),
    payment_confirmed_by = auth.uid(),
    payment_notes = notes,
    status = 'completed'::order_status
  WHERE id = order_id
    AND payment_confirmation_status = 'pending_confirmation'::payment_confirmation_status;
  
  IF FOUND THEN
    SELECT json_build_object(
      'success', true,
      'message', 'Payment confirmed successfully'
    ) INTO result;
  ELSE
    SELECT json_build_object(
      'success', false,
      'message', 'Unable to confirm payment'
    ) INTO result;
  END IF;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reject payment (for admins)
CREATE OR REPLACE FUNCTION reject_payment(
  order_id uuid,
  notes text DEFAULT NULL
)
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  -- Check if user is admin
  IF NOT is_admin(auth.uid()) THEN
    SELECT json_build_object(
      'success', false,
      'message', 'Unauthorized: Admin access required'
    ) INTO result;
    RETURN result;
  END IF;

  UPDATE orders
  SET 
    payment_confirmation_status = 'payment_failed'::payment_confirmation_status,
    payment_confirmed_at = now(),
    payment_confirmed_by = auth.uid(),
    payment_notes = notes
  WHERE id = order_id
    AND payment_confirmation_status = 'pending_confirmation'::payment_confirmation_status;
  
  IF FOUND THEN
    SELECT json_build_object(
      'success', true,
      'message', 'Payment rejected'
    ) INTO result;
  ELSE
    SELECT json_build_object(
      'success', false,
      'message', 'Unable to reject payment'
    ) INTO result;
  END IF;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get revenue statistics
CREATE OR REPLACE FUNCTION get_revenue_stats(
  start_date timestamptz DEFAULT NULL,
  end_date timestamptz DEFAULT NULL
)
RETURNS json AS $$
DECLARE
  result json;
  total_revenue numeric;
  confirmed_orders integer;
  pending_orders integer;
  avg_order_value numeric;
BEGIN
  -- Check if user is admin
  IF NOT is_admin(auth.uid()) THEN
    RETURN json_build_object(
      'success', false,
      'message', 'Unauthorized: Admin access required'
    );
  END IF;

  -- Calculate statistics
  SELECT 
    COALESCE(SUM(total_amount), 0),
    COUNT(*),
    COALESCE(AVG(total_amount), 0)
  INTO total_revenue, confirmed_orders, avg_order_value
  FROM orders
  WHERE payment_confirmation_status = 'confirmed'::payment_confirmation_status
    AND (start_date IS NULL OR payment_confirmed_at >= start_date)
    AND (end_date IS NULL OR payment_confirmed_at <= end_date);

  SELECT COUNT(*)
  INTO pending_orders
  FROM orders
  WHERE payment_confirmation_status = 'pending_confirmation'::payment_confirmation_status;

  SELECT json_build_object(
    'success', true,
    'data', json_build_object(
      'total_revenue', total_revenue,
      'confirmed_orders', confirmed_orders,
      'pending_orders', pending_orders,
      'average_order_value', avg_order_value
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;