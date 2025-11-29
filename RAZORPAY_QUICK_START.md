# Razorpay Integration - Quick Start Guide

## 🚀 Getting Started

### 1. Configuration (Already Done)
The Razorpay integration is already configured with:
- ✅ Database schema
- ✅ Edge Functions deployed
- ✅ Frontend components
- ✅ Supabase secrets

### 2. Environment Variables
Your `.env` file should have:
```env
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id_here
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret_here
```

### 3. Testing the Integration

#### Test Payment Flow
1. Go to Products page
2. Add items to cart
3. Go to Cart page
4. **Razorpay tab is selected by default**
5. Click "Pay with Razorpay" button
6. Use test card:
   - **Card Number**: 4111 1111 1111 1111
   - **CVV**: Any 3 digits
   - **Expiry**: Any future date
7. Complete payment
8. You'll be redirected to Orders page
9. Order should show "Razorpay" badge and "Payment Confirmed" status

#### Verify in Admin Dashboard
1. Login as admin
2. Go to Admin Revenue page
3. Check "Payment Method Breakdown" section
4. Verify Razorpay revenue and order count

## 📊 Features Overview

### For Customers
- **Razorpay Payment** (Default)
  - Instant payment confirmation
  - No waiting for admin approval
  - Supports UPI, cards, net banking, wallets
  
- **Manual Payment** (QR Code)
  - Scan QR code and pay
  - Submit payment confirmation
  - Wait for admin approval

### For Admins
- **Payment Method Tracking**
  - See which payment method was used for each order
  - Razorpay orders auto-confirmed
  - Manual payments require approval

- **Revenue Analytics**
  - Total revenue breakdown by payment method
  - Razorpay vs Manual payment comparison
  - Percentage distribution

## 🎯 Key Differences

| Feature | Razorpay | Manual Payment |
|---------|----------|----------------|
| Confirmation | Automatic | Admin approval required |
| Payment Time | Instant | Varies |
| Admin Work | None | Review & approve |
| Payment Methods | UPI, Cards, Net Banking, Wallets | Bank transfer, UPI |
| Order Status | Completed immediately | Pending until approved |

## 🔧 API Usage

### Create Order with Razorpay
```typescript
// 1. Create order in database
const order = await api.orders.create({
  user_id: user?.id || null,
  items: cartItems,
  total_amount: total,
  currency: "USD",
  payment_method: "razorpay",
});

// 2. Create Razorpay order
const razorpayOrder = await api.orders.createRazorpayOrder(
  order.id,
  total,
  "USD",
  user?.email,
  user?.name
);

// 3. Open Razorpay checkout
const razorpay = new window.Razorpay({
  key: RAZORPAY_KEY_ID,
  order_id: razorpayOrder.id,
  handler: async (response) => {
    // 4. Verify payment
    await api.orders.verifyRazorpayPayment(
      order.id,
      response.razorpay_order_id,
      response.razorpay_payment_id,
      response.razorpay_signature
    );
  }
});
razorpay.open();
```

## 🐛 Troubleshooting

### Payment Not Working
1. Check browser console for errors
2. Verify Razorpay SDK is loaded (check Network tab)
3. Confirm environment variables are set
4. Check Supabase Edge Function logs

### Order Not Confirmed
1. Check payment was successful in Razorpay dashboard
2. Verify signature verification in Edge Function logs
3. Check order status in database
4. Review payment_confirmation_status field

### Admin Dashboard Not Showing Data
1. Refresh the page
2. Check if orders exist with payment_method='razorpay'
3. Verify get_revenue_stats() function is working
4. Check browser console for API errors

## 📚 Documentation

- **Complete Guide**: `RAZORPAY_INTEGRATION.md`
- **Summary**: `RAZORPAY_SUMMARY.md`
- **Implementation Details**: `TODO.md`

## 🔐 Security Notes

- API keys are stored securely in Supabase secrets
- Payment verification uses HMAC SHA256
- Frontend never sees secret key
- All payments verified server-side

## 💡 Tips

1. **Test Mode First**: Always test with Razorpay test credentials before going live
2. **Monitor Logs**: Check Supabase Edge Function logs for any issues
3. **User Feedback**: Razorpay provides better UX than manual payments
4. **Analytics**: Use admin dashboard to track payment method preferences

## 🎉 Success Indicators

Your integration is working correctly if:
- ✅ Razorpay checkout modal opens
- ✅ Payment completes successfully
- ✅ Order appears with "Razorpay" badge
- ✅ Order status is "Completed"
- ✅ Payment status is "Payment Confirmed"
- ✅ Admin dashboard shows Razorpay revenue

## 🚨 Important Notes

1. **Default Payment Method**: Razorpay is now the default payment option
2. **Backward Compatibility**: Manual payment still works for existing users
3. **Currency**: Currently set to USD, can be changed to INR
4. **Exchange Rate**: Fixed at 83.5 INR/USD (can be updated in currency utility)

## 📞 Support

For issues or questions:
1. Check documentation files
2. Review Supabase logs
3. Test with Razorpay test mode
4. Verify configuration settings

---

**Quick Start Complete!** 🎊

You're now ready to accept payments via Razorpay. Test the flow and enjoy automatic payment confirmation!
