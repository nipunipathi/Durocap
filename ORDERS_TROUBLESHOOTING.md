# 🔍 Orders Showing 0 - Troubleshooting Guide

## Issue: Total Orders Show 0 Even After User Payment

### Possible Causes

1. **Orders Not Being Created**
   - Stripe checkout not completing
   - Edge function not deployed
   - Edge function errors

2. **Orders Created But Not Visible**
   - RLS (Row Level Security) blocking access
   - API query error
   - Frontend not fetching correctly

3. **Stripe Configuration Issues**
   - Missing STRIPE_SECRET_KEY
   - Webhook not configured
   - Payment not completing

---

## Step-by-Step Diagnosis

### Step 1: Check Browser Console

**Open Admin Dashboard and check console:**

1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for these messages:
   ```
   Loading dashboard data...
   Orders loaded: X [array of orders]
   ```

**What to look for:**
- If "Orders loaded: 0 []" → Orders not in database
- If you see errors → Note the error message
- If no logs appear → JavaScript not running

---

### Step 2: Check Database Directly

**Test if orders exist in database:**

1. Open browser console on admin dashboard
2. Run this command:
   ```javascript
   const { data, error } = await supabase.from('orders').select('*');
   console.log('Direct query - Orders:', data);
   console.log('Direct query - Error:', error);
   ```

**Expected Results:**
- **If data is empty array []**: No orders in database
- **If data has orders**: RLS or API issue
- **If error exists**: Permission or connection issue

---

### Step 3: Test Order Creation

**Try creating a test order:**

1. Go to Products page
2. Add a product to cart
3. Go to Cart page
4. Click "Proceed to Checkout"
5. Check browser console for errors

**Look for:**
- "Checkout error:" messages
- Network errors
- Stripe redirect working?

---

### Step 4: Check Stripe Configuration

**Verify Stripe is configured:**

1. Check if STRIPE_SECRET_KEY is set in Supabase
2. Go to Supabase Dashboard → Edge Functions → Secrets
3. Look for: `STRIPE_SECRET_KEY`

**If missing:**
- Orders cannot be created
- Checkout will fail
- Need to add Stripe secret key

---

### Step 5: Check Edge Functions

**Verify Edge Functions are deployed:**

1. Go to Supabase Dashboard
2. Navigate to Edge Functions
3. Check for these functions:
   - `create_stripe_checkout`
   - `verify_stripe_payment`

**If missing:**
- Functions need to be deployed
- Orders cannot be created

---

## Common Issues & Solutions

### Issue 1: "No orders in database"

**Cause:** Orders are not being created during checkout

**Solution:**
1. Check Stripe configuration
2. Verify Edge Functions are deployed
3. Add STRIPE_SECRET_KEY to Supabase secrets
4. Test checkout process again

**How to add Stripe key:**
```bash
# In Supabase Dashboard:
# Settings → Edge Functions → Add Secret
# Name: STRIPE_SECRET_KEY
# Value: sk_test_... (your Stripe secret key)
```

---

### Issue 2: "Orders exist but show 0 in dashboard"

**Cause:** RLS policies blocking access

**Solution:**
Already fixed with migration `fix_orders_rls_for_admin.sql`

**Verify fix applied:**
1. Go to Supabase Dashboard
2. Database → Policies
3. Check "orders" table
4. Should see policy: "Public can view all orders"

---

### Issue 3: "Checkout fails with error"

**Cause:** Edge function error or Stripe API issue

**Solution:**
1. Check browser console for error message
2. Check Supabase Edge Function logs
3. Verify Stripe API key is correct
4. Check Stripe dashboard for failed payments

---

### Issue 4: "Payment completes but order stays pending"

**Cause:** `verify_stripe_payment` function not called

**Solution:**
1. Check PaymentSuccess page
2. Verify it calls `api.payment.verifyPayment()`
3. Check Edge Function logs for errors

---

## Testing Checklist

### Pre-Test Setup

- [ ] Stripe account created
- [ ] Stripe test API keys obtained
- [ ] STRIPE_SECRET_KEY added to Supabase secrets
- [ ] Edge Functions deployed
- [ ] RLS policies updated

### Test Order Creation

- [ ] Add product to cart
- [ ] Proceed to checkout
- [ ] Stripe checkout page opens
- [ ] Complete test payment (use test card: 4242 4242 4242 4242)
- [ ] Redirected to success page
- [ ] Check admin dashboard for new order

### Verify Order Display

- [ ] Login to admin dashboard
- [ ] Check "Total Orders" stat
- [ ] Check "Recent Orders" section
- [ ] Go to "Manage Orders" page
- [ ] Verify order appears with correct details

---

## Debug Commands

### Check Orders in Database

```javascript
// Run in browser console
const { data, error } = await supabase.from('orders').select('*');
console.log('Orders:', data);
console.log('Count:', data?.length || 0);
```

### Check RLS Policies

```javascript
// Run in browser console
const { data, error } = await supabase
  .from('orders')
  .select('*', { count: 'exact' });
console.log('Can access orders:', !error);
console.log('Order count:', data?.length || 0);
```

### Test Edge Function

```javascript
// Run in browser console
const { data, error } = await supabase.functions.invoke('create_stripe_checkout', {
  body: JSON.stringify({
    items: [{
      name: 'Test Product',
      price: 10.00,
      quantity: 1
    }]
  })
});
console.log('Checkout response:', data);
console.log('Error:', error);
```

---

## Expected Behavior

### Successful Order Flow

```
1. Customer adds product to cart
   ↓
2. Customer clicks "Proceed to Checkout"
   ↓
3. Frontend calls create_stripe_checkout Edge Function
   ↓
4. Edge Function creates order in database (status: pending)
   ↓
5. Edge Function creates Stripe checkout session
   ↓
6. Customer redirected to Stripe payment page
   ↓
7. Customer completes payment
   ↓
8. Stripe redirects to success page
   ↓
9. Success page calls verify_stripe_payment Edge Function
   ↓
10. Edge Function updates order (status: completed)
   ↓
11. Order visible in admin dashboard ✅
```

---

## Quick Fix Commands

### If orders exist but not visible:

```sql
-- Run in Supabase SQL Editor
-- Check if orders exist
SELECT COUNT(*) FROM orders;

-- View all orders
SELECT * FROM orders ORDER BY created_at DESC;

-- Check RLS policies
SELECT * FROM pg_policies WHERE tablename = 'orders';
```

### If RLS is blocking:

```sql
-- Run in Supabase SQL Editor
-- Temporarily disable RLS (for testing only!)
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;

-- Re-enable after testing
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
```

---

## Contact Information

### If Issue Persists

**Check these logs:**
1. Browser console (F12 → Console)
2. Supabase Edge Function logs
3. Stripe Dashboard → Developers → Logs
4. Network tab (F12 → Network)

**Gather this information:**
- Error messages from console
- Network request failures
- Edge Function logs
- Stripe payment status

---

## Prevention

### To avoid this issue in future:

1. **Always test checkout flow** after deployment
2. **Verify Edge Functions** are deployed
3. **Check Stripe configuration** before going live
4. **Monitor Edge Function logs** regularly
5. **Test with Stripe test cards** before real payments

---

## Test Cards

### Stripe Test Cards

**Successful Payment:**
- Card: 4242 4242 4242 4242
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

**Failed Payment:**
- Card: 4000 0000 0000 0002
- Expiry: Any future date
- CVC: Any 3 digits
- ZIP: Any 5 digits

---

## Summary

**Most Common Cause:**
- Missing STRIPE_SECRET_KEY in Supabase secrets

**Quick Fix:**
1. Add STRIPE_SECRET_KEY to Supabase
2. Redeploy Edge Functions
3. Test checkout flow
4. Verify orders appear in dashboard

**If still not working:**
- Check browser console for errors
- Check Supabase Edge Function logs
- Verify RLS policies are correct
- Test database query directly

---

**Last Updated:** 2025-01-21
