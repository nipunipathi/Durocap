/*
# Create Test Orders for Admin Dashboard

## Purpose
Create sample orders to demonstrate admin dashboard functionality while Stripe payment integration is being configured.

## Test Orders Created
1. Test Customer - $214.97 (Completed) - Asphalt Shingles + Roofing Hammer
2. John Smith - $449.97 (Completed) - Clay Roof Tiles
3. Sarah Johnson - $424.97 (Completed) - Metal Roofing Panels + Waterproof Sealant
4. Mike Davis - $129.99 (Pending) - EPDM Rubber Membrane
5. Emily Brown - $289.92 (Completed) - Aluminum Gutters + Downspout Extensions

## Total Test Revenue
$1,509.82

## Note
These are demonstration orders only. They can be deleted once real Stripe payments are configured and tested.

## To Remove Test Orders
Run this query when ready:
DELETE FROM orders WHERE stripe_session_id LIKE 'test_session_%';
*/

-- Create test order 1
INSERT INTO orders (
  user_id,
  items,
  total_amount,
  currency,
  status,
  customer_name,
  customer_email,
  stripe_session_id
) VALUES (
  NULL,
  '[{"id": "test-1", "name": "Asphalt Shingles - Premium", "price": 89.99, "quantity": 2}, {"id": "test-2", "name": "Roofing Hammer", "price": 34.99, "quantity": 1}]'::jsonb,
  214.97,
  'usd',
  'completed',
  'Test Customer',
  'test@example.com',
  'test_session_123'
);

-- Create test order 2
INSERT INTO orders (
  user_id,
  items,
  total_amount,
  currency,
  status,
  customer_name,
  customer_email,
  stripe_session_id
) VALUES (
  NULL,
  '[{"id": "prod-1", "name": "Clay Roof Tiles", "price": 149.99, "quantity": 3}]'::jsonb,
  449.97,
  'usd',
  'completed',
  'John Smith',
  'john.smith@example.com',
  'test_session_124'
);

-- Create test order 3
INSERT INTO orders (
  user_id,
  items,
  total_amount,
  currency,
  status,
  customer_name,
  customer_email,
  stripe_session_id
) VALUES (
  NULL,
  '[{"id": "prod-2", "name": "Metal Roofing Panels", "price": 199.99, "quantity": 2}, {"id": "prod-3", "name": "Waterproof Sealant", "price": 24.99, "quantity": 1}]'::jsonb,
  424.97,
  'usd',
  'completed',
  'Sarah Johnson',
  'sarah.j@example.com',
  'test_session_125'
);

-- Create test order 4 (pending status)
INSERT INTO orders (
  user_id,
  items,
  total_amount,
  currency,
  status,
  customer_name,
  customer_email,
  stripe_session_id
) VALUES (
  NULL,
  '[{"id": "prod-4", "name": "EPDM Rubber Membrane", "price": 129.99, "quantity": 1}]'::jsonb,
  129.99,
  'usd',
  'pending',
  'Mike Davis',
  'mike.davis@example.com',
  'test_session_126'
);

-- Create test order 5
INSERT INTO orders (
  user_id,
  items,
  total_amount,
  currency,
  status,
  customer_name,
  customer_email,
  stripe_session_id
) VALUES (
  NULL,
  '[{"id": "prod-5", "name": "Aluminum Gutters - 10ft", "price": 45.99, "quantity": 5}, {"id": "prod-6", "name": "Downspout Extensions", "price": 19.99, "quantity": 3}]'::jsonb,
  289.92,
  'usd',
  'completed',
  'Emily Brown',
  'emily.brown@example.com',
  'test_session_127'
);
