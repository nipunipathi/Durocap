/*
# Remove Order History Access for Regular Users

## Purpose
Remove the ability for signed-up users to view their order history.
Only admins should have access to view and manage orders.

## Changes
1. Drop the "Users can view own orders" policy
2. Keep only admin access and service role access to orders

## Security
- Regular users (non-admin) cannot view any orders
- Admins have full access to all orders
- Service role (for Stripe webhooks) can manage orders

## Note
Guest checkout is still supported. Orders are created with user_id = NULL.
Users who sign up will not have access to view their past orders.
*/

-- Drop the policy that allows users to view their own orders
DROP POLICY IF EXISTS "Users can view own orders" ON orders;

-- Verify remaining policies:
-- 1. "Service role can manage orders" - for Stripe webhooks
-- 2. "Admins have full access to orders" - for admin dashboard
-- These policies remain active and unchanged
