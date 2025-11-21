# 🔧 Stripe Payment Setup Guide

## Overview

This guide will help you configure Stripe payment processing for your Roofing Solutions e-commerce website. Currently, the website has **test orders** in the database to demonstrate the admin dashboard functionality. To enable real customer payments, you need to configure Stripe.

---

## Current Status

✅ **Admin Dashboard**: Working - displays test orders  
✅ **Products Page**: Working - shows all products with images  
✅ **Shopping Cart**: Working - customers can add products  
✅ **Database**: Working - orders table is ready  
✅ **Edge Functions**: Deployed - payment processing code is ready  
❌ **Stripe Integration**: NOT CONFIGURED - needs API keys  

---

## Why Orders Show Test Data

The admin dashboard currently shows **5 test orders** that were manually created to demonstrate functionality:

1. Test Customer - $214.97 (Completed)
2. John Smith - $449.97 (Completed)
3. Sarah Johnson - $424.97 (Completed)
4. Mike Davis - $129.99 (Pending)
5. Emily Brown - $289.92 (Completed)

**Total Test Revenue**: $1,509.82

These are **demonstration orders only**. Real customer orders will appear once Stripe is configured.

---

## Step 1: Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Click "Sign Up" or "Start Now"
3. Fill in your business information
4. Verify your email address
5. Complete the account setup

---

## Step 2: Get Your Stripe API Keys

### For Testing (Recommended First)

1. Log in to your Stripe Dashboard
2. Click on "Developers" in the left sidebar
3. Click on "API keys"
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_`)
   - **Secret key** (starts with `sk_test_`)
5. Click "Reveal test key" to see your secret key
6. **Copy both keys** - you'll need them in the next steps

### For Production (After Testing)

1. Toggle the "View test data" switch to OFF
2. You'll see your live keys:
   - **Publishable key** (starts with `pk_live_`)
   - **Secret key** (starts with `sk_live_`)
3. **Important**: Only use live keys when you're ready to accept real payments

---

## Step 3: Configure Stripe Keys in Supabase

### Add Secret Key (Backend)

1. Go to your Supabase Dashboard: [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: **Roofing Solutions Hub**
3. Click on "Edge Functions" in the left sidebar
4. Click on "Manage secrets" or "Secrets" tab
5. Click "Add new secret"
6. Enter:
   - **Name**: `STRIPE_SECRET_KEY`
   - **Value**: Your Stripe secret key (e.g., `sk_test_...`)
7. Click "Save" or "Add secret"

### Add Publishable Key (Frontend)

1. Open your project's `.env` file
2. Add this line:
   ```
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
   ```
3. Replace `pk_test_your_key_here` with your actual Stripe publishable key
4. Save the file

---

## Step 4: Verify Edge Functions Are Deployed

The following Edge Functions should already be deployed:

1. **create_stripe_checkout** - Creates checkout sessions
2. **verify_stripe_payment** - Verifies completed payments

### To Check:

1. Go to Supabase Dashboard → Edge Functions
2. You should see both functions listed
3. If they're missing, they need to be redeployed

---

## Step 5: Test the Payment Flow

### Using Stripe Test Cards

Once Stripe is configured, test the checkout process:

1. **Go to Products page** on your website
2. **Add a product to cart**
3. **Go to Cart page**
4. **Click "Proceed to Checkout"**
5. **Use a Stripe test card**:
   - Card Number: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., `12/25`)
   - CVC: Any 3 digits (e.g., `123`)
   - ZIP: Any 5 digits (e.g., `12345`)
6. **Complete the payment**
7. **You should be redirected** to a success page
8. **Check the admin dashboard** - the order should appear

### Expected Result

- ✅ Checkout page opens (Stripe hosted page)
- ✅ Payment completes successfully
- ✅ Redirected to success page
- ✅ Order appears in admin dashboard
- ✅ Order status is "completed"

---

## Step 6: Remove Test Orders (Optional)

Once you've verified real payments are working, you can remove the test orders:

### Option 1: Via Supabase Dashboard

1. Go to Supabase Dashboard
2. Click "Table Editor"
3. Select "orders" table
4. Find test orders (customer names: Test Customer, John Smith, etc.)
5. Delete each test order

### Option 2: Via SQL Query

1. Go to Supabase Dashboard → SQL Editor
2. Run this query:
   ```sql
   -- Delete all test orders
   DELETE FROM orders 
   WHERE stripe_session_id LIKE 'test_session_%';
   ```
3. Click "Run"

---

## Troubleshooting

### Issue: "Checkout button doesn't work"

**Cause**: Stripe secret key not configured

**Solution**:
1. Verify STRIPE_SECRET_KEY is added to Supabase secrets
2. Check the browser console for error messages
3. Verify Edge Functions are deployed

### Issue: "Payment completes but order doesn't appear"

**Cause**: Payment verification failing

**Solution**:
1. Check Supabase Edge Function logs
2. Verify `verify_stripe_payment` function is deployed
3. Check browser console for errors on success page

### Issue: "Stripe checkout page shows error"

**Cause**: Invalid API key or Edge Function error

**Solution**:
1. Verify your Stripe secret key is correct
2. Check you're using the right key (test vs live)
3. Check Supabase Edge Function logs for errors

---

## Stripe Webhook Configuration (Optional)

For production, you may want to set up webhooks to handle payment events:

1. Go to Stripe Dashboard → Developers → Webhooks
2. Click "Add endpoint"
3. Enter your webhook URL (if you have one)
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Save the webhook
6. Copy the webhook signing secret
7. Add it to Supabase secrets as `STRIPE_WEBHOOK_SECRET`

---

## Going Live Checklist

Before accepting real payments:

- [ ] Stripe account fully verified
- [ ] Business information complete in Stripe
- [ ] Bank account connected for payouts
- [ ] Switched to live API keys (pk_live_ and sk_live_)
- [ ] Updated STRIPE_SECRET_KEY in Supabase with live key
- [ ] Updated VITE_STRIPE_PUBLISHABLE_KEY in .env with live key
- [ ] Tested checkout flow with test cards
- [ ] Removed all test orders from database
- [ ] Verified order emails are working (if configured)
- [ ] Set up webhook endpoint (recommended)
- [ ] Reviewed Stripe's terms of service
- [ ] Configured tax settings (if applicable)

---

## Important Notes

### Security

- ✅ **Never commit** your Stripe secret key to Git
- ✅ **Never expose** secret keys in frontend code
- ✅ **Always use** environment variables for API keys
- ✅ **Keep** .env file in .gitignore

### Test vs Live Mode

- **Test Mode**: Use test API keys (pk_test_ and sk_test_)
  - No real money is charged
  - Use test card numbers
  - Orders are for testing only

- **Live Mode**: Use live API keys (pk_live_ and sk_live_)
  - Real money is charged
  - Real credit cards are used
  - Orders are real customer orders

### Stripe Fees

Stripe charges a fee for each transaction:
- **Standard rate**: 2.9% + $0.30 per successful charge
- Check [Stripe Pricing](https://stripe.com/pricing) for your region

---

## Support Resources

### Stripe Documentation

- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [Test Cards](https://stripe.com/docs/testing)
- [API Keys](https://stripe.com/docs/keys)
- [Webhooks](https://stripe.com/docs/webhooks)

### Supabase Documentation

- [Edge Functions](https://supabase.com/docs/guides/functions)
- [Environment Variables](https://supabase.com/docs/guides/functions/secrets)

---

## Quick Reference

### Environment Variables Needed

```bash
# Frontend (.env file)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here

# Backend (Supabase Secrets)
STRIPE_SECRET_KEY=sk_test_your_key_here
```

### Test Card Numbers

| Card Number | Result |
|-------------|--------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Card declined |
| 4000 0000 0000 9995 | Insufficient funds |

---

## Summary

1. ✅ **Test orders are visible** in admin dashboard
2. ⚠️ **Stripe needs configuration** for real payments
3. 📝 **Follow steps above** to enable payment processing
4. 🧪 **Test thoroughly** before going live
5. 🚀 **Switch to live keys** when ready for production

---

**Last Updated**: 2025-11-21  
**Status**: Test orders created, Stripe configuration pending
