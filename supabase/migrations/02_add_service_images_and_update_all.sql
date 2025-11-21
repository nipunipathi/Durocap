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

-- Update Products with images
UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/006df72f-954d-4ca2-bf05-86a3661a74ac.jpg' WHERE name = 'Premium Asphalt Shingles';
UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/006df72f-954d-4ca2-bf05-86a3661a74ac.jpg' WHERE name = 'Clay Roof Tiles';
UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/a4ef5ac1-9ee8-4666-bfbc-f05651d9b9a2.jpg' WHERE name = 'TPO Roofing Membrane';
UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/7684fef7-70f2-4e5d-91b2-641c9f747393.jpg' WHERE name = 'Seamless Aluminum Gutters';
UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/ff2e399c-e01e-49cc-9e57-4ab97bfea427.jpg' WHERE name = 'Spray Foam Insulation';
UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/49008762-d2d9-4255-a2ee-0f84b147313e.jpg' WHERE name = 'Elastomeric Roof Coating';
UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/aca4522e-7eb5-4e3a-a9e1-93cab8143475.jpg' WHERE name = 'Professional Roofing Nailer';
UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/a4ef5ac1-9ee8-4666-bfbc-f05651d9b9a2.jpg' WHERE name = 'Synthetic Underlayment';
UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/006df72f-954d-4ca2-bf05-86a3661a74ac.jpg' WHERE name = 'Metal Roofing Panels';
UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/49008762-d2d9-4255-a2ee-0f84b147313e.jpg' WHERE name = 'Silicone Roof Sealant';

-- Update Services with images
UPDATE services SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/81741052-c8ef-4098-80b4-25e5cd8fbc7a.jpg' WHERE title = 'Residential Roof Installation';
UPDATE services SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/ed09e28e-b212-4ea2-a402-8f58751fac17.jpg' WHERE title = 'Commercial Roofing Solutions';
UPDATE services SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/558217da-d137-4041-a491-ae02ab65dc89.jpg' WHERE title = 'Roof Repair & Maintenance';
UPDATE services SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/9e65a2e9-5ab8-46a8-a88b-43b087fa1f58.jpg' WHERE title = 'Roof Inspection Services';
UPDATE services SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/7684fef7-70f2-4e5d-91b2-641c9f747393.jpg' WHERE title = 'Gutter Installation & Repair';
UPDATE services SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/222739e2-8e30-41da-b253-dd79be8763a9.jpg' WHERE title = 'Emergency Roof Repair';

-- Update Projects with images
UPDATE projects SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/a06926bc-6f68-420c-8fee-f518ae40aa06.jpg' WHERE title = 'Modern Family Home Roof Replacement';
UPDATE projects SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/25150a27-1287-44a0-b5c2-c27e98a9d8a8.jpg' WHERE title = 'Downtown Office Building Commercial Roofing';
UPDATE projects SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/9251a7af-99db-4dc5-89ab-922de1d39ba9.jpg' WHERE title = 'Historic Home Restoration';
UPDATE projects SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/8c706ddf-3e63-4ec8-b51b-faaa80b13aba.jpg' WHERE title = 'Industrial Warehouse Roof System';
