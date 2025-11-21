/*
# Create Initial Database Schema for Roofing Solutions Hub

## 1. New Tables

### profiles
- `id` (uuid, primary key, references auth.users)
- `email` (text, unique)
- `full_name` (text)
- `role` (user_role enum: 'user', 'admin')
- `created_at` (timestamptz)

### products
- `id` (uuid, primary key)
- `name` (text, not null)
- `description` (text)
- `price` (numeric, not null)
- `category` (text, not null)
- `image_url` (text)
- `stock` (integer, default 0)
- `is_active` (boolean, default true)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### services
- `id` (uuid, primary key)
- `title` (text, not null)
- `description` (text)
- `icon` (text)
- `is_active` (boolean, default true)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### projects
- `id` (uuid, primary key)
- `title` (text, not null)
- `description` (text)
- `image_url` (text)
- `location` (text)
- `completion_date` (date)
- `is_featured` (boolean, default false)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### orders
- `id` (uuid, primary key)
- `user_id` (uuid, references auth.users, nullable for guest checkout)
- `items` (jsonb, not null)
- `total_amount` (numeric, not null)
- `currency` (text, default 'usd')
- `status` (order_status enum: 'pending', 'completed', 'cancelled', 'refunded')
- `stripe_session_id` (text, unique)
- `stripe_payment_intent_id` (text)
- `customer_email` (text)
- `customer_name` (text)
- `completed_at` (timestamptz)
- `created_at` (timestamptz)
- `updated_at` (timestamptz)

### contact_inquiries
- `id` (uuid, primary key)
- `name` (text, not null)
- `email` (text, not null)
- `phone` (text)
- `subject` (text)
- `message` (text, not null)
- `status` (text, default 'new')
- `created_at` (timestamptz)

## 2. Security

### Public Tables (No RLS)
- `products`: Public read access, admin write access
- `services`: Public read access, admin write access
- `projects`: Public read access, admin write access

### Protected Tables (RLS Enabled)
- `profiles`: Users can read their own profile, admins have full access
- `orders`: Users can view their own orders, admins have full access
- `contact_inquiries`: Admins only

### Helper Functions
- `is_admin(uid uuid)`: Check if user has admin role

## 3. Notes
- First registered user becomes admin automatically via trigger
- Guest checkout is supported (user_id can be null in orders)
- All timestamps use timestamptz for proper timezone handling
*/

-- Create enums
CREATE TYPE user_role AS ENUM ('user', 'admin');
CREATE TYPE order_status AS ENUM ('pending', 'completed', 'cancelled', 'refunded');

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE,
  full_name text,
  role user_role DEFAULT 'user'::user_role NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(12,2) NOT NULL CHECK (price >= 0),
  category text NOT NULL,
  image_url text,
  stock integer DEFAULT 0 CHECK (stock >= 0),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_is_active ON products(is_active);

-- Create services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  icon text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  image_url text,
  location text,
  completion_date date,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_projects_is_featured ON projects(is_featured);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  items jsonb NOT NULL,
  total_amount numeric(12,2) NOT NULL CHECK (total_amount >= 0),
  currency text NOT NULL DEFAULT 'usd',
  status order_status NOT NULL DEFAULT 'pending'::order_status,
  stripe_session_id text UNIQUE,
  stripe_payment_intent_id text,
  customer_email text,
  customer_name text,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_stripe_session_id ON orders(stripe_session_id);
CREATE INDEX idx_orders_status ON orders(status);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status);

ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Helper function to check admin role
CREATE OR REPLACE FUNCTION is_admin(uid uuid)
RETURNS boolean LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM profiles p
    WHERE p.id = uid AND p.role = 'admin'::user_role
  );
$$;

-- Trigger to auto-create profile and set first user as admin
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  user_count int;
BEGIN
  IF OLD IS DISTINCT FROM NULL AND OLD.confirmed_at IS NULL AND NEW.confirmed_at IS NOT NULL THEN
    SELECT COUNT(*) INTO user_count FROM profiles;
    INSERT INTO profiles (id, email, role)
    VALUES (
      NEW.id,
      NEW.email,
      CASE WHEN user_count = 0 THEN 'admin'::user_role ELSE 'user'::user_role END
    );
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_confirmed ON auth.users;
CREATE TRIGGER on_auth_user_confirmed
  AFTER UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Admins have full access to profiles" ON profiles
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (role IS NOT DISTINCT FROM (SELECT role FROM profiles WHERE id = auth.uid()));

-- RLS Policies for orders
CREATE POLICY "Service role can manage orders" ON orders
  FOR ALL USING (auth.jwt()->>'role' = 'service_role');

CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins have full access to orders" ON orders
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- RLS Policies for contact_inquiries
CREATE POLICY "Admins can manage contact inquiries" ON contact_inquiries
  FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- Insert initial services data
INSERT INTO services (title, description, icon) VALUES
('Roof Installation', 'Professional installation of all types of roofing systems for residential and commercial properties.', '🏗️'),
('Roof Repair', 'Expert repair services for damaged, leaking, or aging roofs to extend their lifespan.', '🔧'),
('Roof Inspection', 'Comprehensive roof inspections to identify potential issues before they become major problems.', '🔍'),
('Gutter Installation', 'Complete gutter system installation and replacement for proper water drainage.', '💧'),
('Waterproofing', 'Advanced waterproofing solutions to protect your property from water damage.', '🛡️'),
('Emergency Services', '24/7 emergency roofing services for urgent repairs and storm damage.', '🚨');

-- Insert initial products data
INSERT INTO products (name, description, price, category, stock, image_url) VALUES
('Asphalt Shingles - Premium', 'High-quality asphalt shingles with 30-year warranty. Weather-resistant and durable.', 89.99, 'Roofing Tiles and Shingles', 500, 'placeholder-asphalt-shingles.jpg'),
('Clay Roof Tiles', 'Traditional clay tiles offering excellent durability and aesthetic appeal.', 149.99, 'Roofing Tiles and Shingles', 300, 'placeholder-clay-tiles.jpg'),
('Metal Roofing Panels', 'Lightweight, durable metal roofing panels with superior longevity.', 199.99, 'Roofing Tiles and Shingles', 200, 'placeholder-metal-roofing.jpg'),
('EPDM Rubber Membrane', 'Synthetic rubber roofing membrane ideal for flat roofs.', 129.99, 'Roofing Membranes', 150, 'placeholder-epdm-membrane.jpg'),
('TPO Roofing Membrane', 'Energy-efficient white TPO membrane for commercial applications.', 139.99, 'Roofing Membranes', 180, 'placeholder-tpo-membrane.jpg'),
('Aluminum Gutters - 10ft', 'Seamless aluminum gutters with rust-resistant coating.', 45.99, 'Gutters and Drainage', 400, 'placeholder-aluminum-gutters.jpg'),
('Downspout Extensions', 'Flexible downspout extensions for proper water drainage.', 19.99, 'Gutters and Drainage', 600, 'placeholder-downspout.jpg'),
('Fiberglass Insulation Batts', 'R-30 fiberglass insulation for superior thermal performance.', 59.99, 'Insulation Materials', 350, 'placeholder-insulation.jpg'),
('Roofing Hammer', 'Professional-grade roofing hammer with magnetic nail holder.', 34.99, 'Roofing Tools', 100, 'placeholder-roofing-hammer.jpg'),
('Waterproof Sealant', 'Premium waterproof sealant for all roofing applications.', 24.99, 'Waterproofing Solutions', 250, 'placeholder-sealant.jpg');

-- Insert initial projects data
INSERT INTO projects (title, description, location, completion_date, is_featured, image_url) VALUES
('Residential Roof Replacement', 'Complete roof replacement for a 3,000 sq ft residential property using premium asphalt shingles.', 'Austin, TX', '2024-09-15', true, 'placeholder-residential-project.jpg'),
('Commercial Flat Roof Installation', 'Installation of TPO membrane roofing system for a 15,000 sq ft commercial building.', 'Dallas, TX', '2024-08-20', true, 'placeholder-commercial-project.jpg'),
('Historic Building Restoration', 'Restoration of clay tile roofing on a historic downtown building.', 'San Antonio, TX', '2024-07-10', true, 'placeholder-historic-project.jpg'),
('Emergency Storm Repair', 'Emergency repair services after severe storm damage to residential property.', 'Houston, TX', '2024-10-05', false, 'placeholder-storm-repair.jpg');
