/*
# Update Projects Table - Add Category and Year

## Overview
Add category and year columns to the existing projects table for better organization and filtering.

## Changes
- Add `category` column (text) - Project category (Residential, Commercial, Luxury, Modern, Industrial)
- Add `year` column (integer) - Year of project completion

## Initial Data
- Insert 5 sample projects for immediate display in carousel
*/

-- Add category and year columns if they don't exist
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category text;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS year integer;

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- Clear existing data and insert sample projects
DELETE FROM projects;

INSERT INTO projects (title, description, image_url, category, location, year, is_featured) VALUES
('Luxury Residential Project', 'Premium tile roofing installation for a modern villa in Kochi', 'https://miaoda-site-img.s3cdn.medo.dev/images/07c54199-47a7-4c7a-8ae8-d2dd6c3aaac9.jpg', 'Residential', 'Kochi', 2024, true),
('Commercial Complex Roofing', 'Large-scale commercial roofing installation in Trivandrum', 'https://miaoda-site-img.s3cdn.medo.dev/images/681ebb11-2fb7-4e60-a7e4-c4ebfbf35311.jpg', 'Commercial', 'Trivandrum', 2024, true),
('Premium Villa Roofing', 'High-end roofing solution for luxury villa in Calicut', 'https://miaoda-site-img.s3cdn.medo.dev/images/6c985edd-e826-4844-9227-7b8207934a06.jpg', 'Luxury', 'Calicut', 2024, true),
('Modern Residential Roofing', 'Contemporary roofing design for modern home in Thrissur', 'https://miaoda-site-img.s3cdn.medo.dev/images/6c7ec46e-a800-46c5-ae7e-4c7ee2e945b0.jpg', 'Modern', 'Thrissur', 2024, true),
('Industrial Roofing Solution', 'Heavy-duty industrial roofing installation in Ernakulam', 'https://miaoda-site-img.s3cdn.medo.dev/images/a9330262-e912-455e-bc79-512efa5267c4.jpg', 'Industrial', 'Ernakulam', 2024, true);