# Razorpay Integration Guide

## Overview
This application now supports Razorpay payment gateway for automatic payment processing alongside the existing Stripe and manual payment options.

## Features Implemented

### 1. Database Schema
- Added `payment_method` enum field (razorpay, manual, qr_code)
- Added `currency` field (USD, INR)
- Added Razorpay-specific fields:
  - `razorpay_order_id`
  - `razorpay_payment_id`
  - `razorpay_signature`
- Added currency conversion fields:
  - `exchange_rate`
  - `amount_in_usd`
  - `amount_in_inr`

### 2. Edge Functions
Two Supabase Edge Functions handle Razorpay operations:

#### create-razorpay-order
- Creates a Razorpay order
- Stores order details in database
- Returns Razorpay order ID for checkout

#### verify-razorpay-payment
- Verifies payment signature
- Updates order status to 'completed'
- Auto-confirms payment (no admin approval needed)

### 3. Frontend Components

#### RazorpayPaymentFlow Component
Location: `src/components/payment/RazorpayPaymentFlow.tsx`

Features:
- Creates order in database
- Initiates Razorpay checkout
- Handles payment success/failure
- Clears cart on successful payment
- Redirects to orders page

#### Cart Page Updates
Location: `src/pages/Cart.tsx`

Changes:
- Added Razorpay as default payment option
- Three payment tabs: Razorpay, Stripe, QR Payment
- Integrated RazorpayPaymentFlow component

#### Orders Page Updates
Location: `src/pages/Orders.tsx`

Changes:
- Added payment method badges
- Shows Razorpay, Manual, or Stripe badge for each order
- Color-coded badges for easy identification

#### Admin Revenue Dashboard Updates
Location: `src/pages/admin/AdminRevenue.tsx`

Changes:
- Added payment method breakdown section
- Shows Razorpay revenue and order count
- Shows Manual payment revenue and order count
- Displays percentage breakdown

## Configuration

### Environment Variables
Add these to your `.env` file:

```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

### Supabase Secrets
The following secrets are configured in Supabase:
- `RAZORPAY_KEY_ID`
- `RAZORPAY_KEY_SECRET`

## Payment Flow

### Razorpay Payment Flow
1. User adds items to cart
2. User selects "Razorpay" payment option
3. User clicks "Pay with Razorpay" button
4. System creates order in database with status='pending'
5. System calls Edge Function to create Razorpay order
6. Razorpay checkout modal opens
7. User completes payment
8. Razorpay sends payment details to verify Edge Function
9. Edge Function verifies signature and updates order:
   - status='completed'
   - payment_confirmation_status='confirmed'
10. User is redirected to orders page

### Manual Payment Flow (Unchanged)
1. User adds items to cart
2. User selects "QR Payment" option
3. User scans QR code and makes payment
4. User clicks "Submit Payment Confirmation"
5. Admin reviews and approves payment

## Currency Support
- Default currency: USD
- Razorpay supports both USD and INR
- Exchange rate stored with each order
- Amounts stored in both currencies for reporting

## Testing

### Test Razorpay Payment
1. Add products to cart
2. Go to cart page
3. Select "Razorpay" tab
4. Click "Pay with Razorpay"
5. Use Razorpay test credentials:
   - Card: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date

### Verify Integration
1. Check order appears in Orders page with "Razorpay" badge
2. Check order status is "Completed"
3. Check payment status is "Payment Confirmed"
4. Check admin dashboard shows Razorpay revenue

## API Methods

### Create Razorpay Order
```typescript
await api.orders.createRazorpayOrder(
  orderId: string,
  amount: number,
  currency: string,
  customerEmail?: string,
  customerName?: string
)
```

### Verify Razorpay Payment
```typescript
await api.orders.verifyRazorpayPayment(
  orderId: string,
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
)
```

### Create Order
```typescript
await api.orders.create({
  user_id: string | null,
  items: any[],
  total_amount: number,
  currency: string,
  payment_method: string,
  customer_email?: string,
  customer_name?: string,
})
```

## Database Functions

### confirm_razorpay_payment
RPC function that:
- Updates order status to 'completed'
- Sets payment_confirmation_status to 'confirmed'
- Stores Razorpay payment details
- Returns success/error status

### get_revenue_stats
Updated to include:
- `razorpay_revenue`: Total revenue from Razorpay
- `razorpay_count`: Number of Razorpay orders
- `manual_revenue`: Total revenue from manual payments
- `manual_count`: Number of manual payment orders

## Security

### Payment Verification
- All payments verified using Razorpay signature
- HMAC SHA256 verification in Edge Function
- Prevents payment tampering

### Secrets Management
- API keys stored in Supabase secrets
- Never exposed to frontend
- Edge Functions use service role key

## Troubleshooting

### Razorpay SDK Not Loaded
**Error**: "Razorpay SDK not loaded"
**Solution**: Check that `index.html` includes Razorpay script:
```html
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
```

### Payment Verification Failed
**Error**: "Payment verification failed"
**Solution**: 
- Check Razorpay secrets are correct
- Verify signature calculation in Edge Function
- Check order exists in database

### Edge Function Error
**Error**: Edge Function returns error
**Solution**:
- Check Supabase logs for detailed error
- Verify secrets are configured
- Check database permissions

## Future Enhancements

### Potential Improvements
1. Add webhook support for payment status updates
2. Support for refunds via Razorpay API
3. Multi-currency pricing display
4. Payment method analytics dashboard
5. Automatic currency conversion based on user location

## Support

For issues or questions:
1. Check Supabase logs for Edge Function errors
2. Verify environment variables are set correctly
3. Test with Razorpay test mode first
4. Review Razorpay documentation: https://razorpay.com/docs/

## Migration Notes

### Database Migration
Migration file: `supabase/migrations/00020_add_razorpay_integration.sql`

To apply manually:
```sql
-- Run the migration SQL in Supabase SQL Editor
```

### Rollback
To rollback Razorpay integration:
1. Remove Razorpay tab from Cart page
2. Remove payment method badges from Orders page
3. Remove payment method breakdown from Admin dashboard
4. Keep database schema (for historical data)

## Conclusion

The Razorpay integration provides a seamless payment experience with automatic order confirmation, reducing manual admin work while maintaining the flexibility of manual payment options.
