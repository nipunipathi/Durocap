/*
# Brochure Management System

## Overview
Creates a comprehensive brochure/catalog management system for Durocap Roofing Solutions.
Allows admins to upload, manage, and organize product brochures (PDFs) with categories,
and provides customers with a searchable catalog to view and download brochures.

## Tables Created

### 1. brochure_categories
Stores brochure categories for organization.
- `id` (uuid, primary key): Unique identifier
- `name` (text, unique, not null): Category name (e.g., "Roofing Sheets", "Accessories")
- `description` (text): Category description
- `display_order` (integer, default 0): Order for display
- `created_at` (timestamptz): Creation timestamp
- `updated_at` (timestamptz): Last update timestamp

### 2. brochures
Stores brochure metadata and file information.
- `id` (uuid, primary key): Unique identifier
- `category_id` (uuid, foreign key): References brochure_categories
- `title` (text, not null): Brochure title
- `description` (text): Brochure description
- `file_url` (text, not null): URL to PDF file in Supabase Storage
- `file_name` (text, not null): Original filename
- `file_size` (bigint): File size in bytes
- `thumbnail_url` (text): Optional thumbnail image URL
- `is_featured` (boolean, default false): Featured brochure flag
- `download_count` (integer, default 0): Number of downloads
- `view_count` (integer, default 0): Number of views
- `created_at` (timestamptz): Creation timestamp
- `updated_at` (timestamptz): Last update timestamp

## Security
- Public read access for all users (no RLS needed for public catalog)
- Admin-only write access controlled by application logic
- File storage in Supabase Storage bucket with public access

## Functions
- `increment_download_count`: Increments download counter
- `increment_view_count`: Increments view counter
*/

-- Create brochure_categories table
CREATE TABLE IF NOT EXISTS brochure_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create brochures table
CREATE TABLE IF NOT EXISTS brochures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES brochure_categories(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text,
  file_url text NOT NULL,
  file_name text NOT NULL,
  file_size bigint,
  thumbnail_url text,
  is_featured boolean DEFAULT false,
  download_count integer DEFAULT 0,
  view_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX idx_brochures_category ON brochures(category_id);
CREATE INDEX idx_brochures_featured ON brochures(is_featured) WHERE is_featured = true;
CREATE INDEX idx_brochures_created ON brochures(created_at DESC);

-- Function to increment download count
CREATE OR REPLACE FUNCTION increment_download_count(brochure_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE brochures
  SET download_count = download_count + 1
  WHERE id = brochure_id;
END;
$$;

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(brochure_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE brochures
  SET view_count = view_count + 1
  WHERE id = brochure_id;
END;
$$;

-- Insert default categories
INSERT INTO brochure_categories (name, description, display_order) VALUES
  ('Roofing Sheets', 'Metal roofing sheets, PPGI sheets, and roofing panels', 1),
  ('Accessories', 'Roofing accessories, fasteners, and fixing materials', 2),
  ('Installation Guides', 'Step-by-step installation instructions and best practices', 3),
  ('Warranty Documents', 'Product warranties and guarantee information', 4),
  ('Technical Specifications', 'Detailed technical specifications and data sheets', 5)
ON CONFLICT (name) DO NOTHING;
