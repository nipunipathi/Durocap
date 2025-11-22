/*
# Add image_url to services and update all images

This migration:
1. Adds image_url column to services table
2. Updates all product, service, and project images with real image URLs

## Changes
- Add image_url column to services table
- Update all product images with relevant roofing product photos
- Update all service images with relevant roofing service photos
- Update all project images with relevant completed project photos
*/

-- Add image_url column to services table
ALTER TABLE services ADD COLUMN IF NOT EXISTS image_url text;

-- Demo data updates removed - Add your own images through the admin panel
