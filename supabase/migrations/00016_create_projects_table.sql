/*
# Create Projects Table

## Overview
This migration creates a projects table to store portfolio projects that will be displayed in the homepage carousel and projects page. Admins can manage these projects through the admin panel.

## Tables Created

### `projects`
- `id` (uuid, primary key) - Unique identifier for each project
- `title` (text, not null) - Project title/name
- `description` (text, not null) - Brief description of the project
- `image_url` (text, not null) - URL to the project image
- `category` (text, not null) - Project category (Residential, Commercial, Luxury, Modern, Industrial)
- `location` (text, not null) - Project location (city in Kerala)
- `year` (integer, not null) - Year of project completion
- `featured` (boolean, default false) - Whether to feature in homepage carousel
- `created_at` (timestamptz, default now()) - Record creation timestamp
- `updated_at` (timestamptz, default now()) - Record update timestamp

## Security
- No RLS enabled - public read access for all users
- Admin panel will handle write operations through authenticated routes

## Initial Data
- 5 sample projects pre-populated for immediate display
- All projects marked as featured for carousel display
*/

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  category text NOT NULL,
  location text NOT NULL,
  year integer NOT NULL,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create index for featured projects
CREATE INDEX idx_projects_featured ON projects(featured, created_at DESC);

-- Create index for category filtering
CREATE INDEX idx_projects_category ON projects(category);

-- Insert initial sample projects
INSERT INTO projects (title, description, image_url, category, location, year, featured) VALUES
(
  'Luxury Residential Project',
  'Premium tile roofing installation for a modern villa in Kochi',
  'https://miaoda-site-img.s3cdn.medo.dev/images/07c54199-47a7-4c7a-8ae8-d2dd6c3aaac9.jpg',
  'Residential',
  'Kochi',
  2024,
  true
),
(
  'Commercial Complex Roofing',
  'Large-scale commercial roofing installation in Trivandrum',
  'https://miaoda-site-img.s3cdn.medo.dev/images/681ebb11-2fb7-4e60-a7e4-c4ebfbf35311.jpg',
  'Commercial',
  'Trivandrum',
  2024,
  true
),
(
  'Premium Villa Roofing',
  'High-end roofing solution for luxury villa in Calicut',
  'https://miaoda-site-img.s3cdn.medo.dev/images/6c985edd-e826-4844-9227-7b8207934a06.jpg',
  'Luxury',
  'Calicut',
  2024,
  true
),
(
  'Modern Residential Roofing',
  'Contemporary roofing design for modern home in Thrissur',
  'https://miaoda-site-img.s3cdn.medo.dev/images/6c7ec46e-a800-46c5-ae7e-4c7ee2e945b0.jpg',
  'Modern',
  'Thrissur',
  2024,
  true
),
(
  'Industrial Roofing Solution',
  'Heavy-duty industrial roofing installation in Ernakulam',
  'https://miaoda-site-img.s3cdn.medo.dev/images/a9330262-e912-455e-bc79-512efa5267c4.jpg',
  'Industrial',
  'Ernakulam',
  2024,
  true
);