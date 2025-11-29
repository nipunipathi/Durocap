/*
# Add Razorpay Payment Integration

## Overview
Add support for Razorpay payment gateway alongside existing manual payment confirmation system.

## Changes
1. Add payment_method column to orders table
2. Add Razorpay transaction tracking columns
3. Add currency and exchange rate columns
4. Update payment confirmation logic to auto-confirm Razorpay payments

## Payment Methods
- 'razorpay' - Automatic confirmation via Razorpay gateway
- 'manual' - Manual payment requiring admin confirmation
- 'qr_code' - QR code payment requiring admin confirmation

## Currency Support
- 'USD' - US Dollars
- 'INR' - Indian Rupees
- Exchange rate stored for historical accuracy
*/

-- Add payment method enum
CREATE TYPE payment_method AS ENUM ('razorpay', 'manual', 'qr_code');

-- Add currency enum
CREATE TYPE currency_type AS ENUM ('USD', 'INR');

-- Add Razorpay and currency columns to orders table
ALTER TABLE orders 
ADD COLUMN IF NOT EXISTS payment_method payment_method DEFAULT 'manual'::payment_method,
ADD COLUMN IF NOT EXISTS razorpay_order_id text,
ADD COLUMN IF NOT EXISTS razorpay_payment_id text,
ADD COLUMN IF NOT EXISTS razorpay_signature text,
ADD COLUMN IF NOT EXISTS currency currency_type DEFAULT 'USD'::currency_type,
ADD COLUMN IF NOT EXISTS exchange_rate numeric(10, 4) DEFAULT 1.0,
ADD COLUMN IF NOT EXISTS amount_in_usd numeric(10, 2),
ADD COLUMN IF NOT EXISTS amount_in_inr numeric(10, 2);

-- Create index for Razorpay lookups
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_order_id ON orders(razorpay_order_id);
CREATE INDEX IF NOT EXISTS idx_orders_razorpay_payment_id ON orders(razorpay_payment_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_method ON orders(payment_method);

-- Function to auto-confirm Razorpay payments
CREATE OR REPLACE FUNCTION confirm_razorpay_payment(
  order_id uuid,
  rzp_order_id text,
  rzp_payment_id text,
  rzp_signature text
)
RETURNS json AS $$
DECLARE
  result json;
BEGIN
  -- Update order with Razorpay details and auto-confirm
  UPDATE orders
  SET 
    razorpay_order_id = rzp_order_id,
    razorpay_payment_id = rzp_payment_id,
    razorpay_signature = rzp_signature,
    payment_confirmation_status = 'confirmed'::payment_confirmation_status,
    payment_confirmed_at = now(),
    status = 'completed'::order_status,
    payment_notes = 'Automatically confirmed via Razorpay payment gateway'
  WHERE id = order_id
    AND payment_method = 'razorpay'::payment_method;
  
  IF FOUND THEN
    SELECT json_build_object(
      'success', true,
      'message', 'Razorpay payment confirmed successfully'
    ) INTO result;
  ELSE
    SELECT json_build_object(
      'success', false,
      'message', 'Unable to confirm Razorpay payment'
    ) INTO result;
  END IF;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update get_revenue_stats to include payment method breakdown
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
  razorpay_revenue numeric;
  manual_revenue numeric;
  razorpay_count integer;
  manual_count integer;
BEGIN
  -- Check if user is admin
  IF NOT is_admin(auth.uid()) THEN
    RETURN json_build_object(
      'success', false,
      'message', 'Unauthorized: Admin access required'
    );
  END IF;

  -- Calculate overall statistics
  SELECT 
    COALESCE(SUM(total_amount), 0),
    COUNT(*),
    COALESCE(AVG(total_amount), 0)
  INTO total_revenue, confirmed_orders, avg_order_value
  FROM orders
  WHERE payment_confirmation_status = 'confirmed'::payment_confirmation_status
    AND (start_date IS NULL OR payment_confirmed_at >= start_date)
    AND (end_date IS NULL OR payment_confirmed_at <= end_date);

  -- Calculate Razorpay statistics
  SELECT 
    COALESCE(SUM(total_amount), 0),
    COUNT(*)
  INTO razorpay_revenue, razorpay_count
  FROM orders
  WHERE payment_confirmation_status = 'confirmed'::payment_confirmation_status
    AND payment_method = 'razorpay'::payment_method
    AND (start_date IS NULL OR payment_confirmed_at >= start_date)
    AND (end_date IS NULL OR payment_confirmed_at <= end_date);

  -- Calculate manual payment statistics
  SELECT 
    COALESCE(SUM(total_amount), 0),
    COUNT(*)
  INTO manual_revenue, manual_count
  FROM orders
  WHERE payment_confirmation_status = 'confirmed'::payment_confirmation_status
    AND payment_method IN ('manual'::payment_method, 'qr_code'::payment_method)
    AND (start_date IS NULL OR payment_confirmed_at >= start_date)
    AND (end_date IS NULL OR payment_confirmed_at <= end_date);

  -- Count pending orders
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
      'average_order_value', avg_order_value,
      'razorpay_revenue', razorpay_revenue,
      'razorpay_count', razorpay_count,
      'manual_revenue', manual_revenue,
      'manual_count', manual_count
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;