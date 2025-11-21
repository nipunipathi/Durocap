/*
# Update Project Images with Real URLs

## Purpose
Replace placeholder project images with actual high-quality project photos.

## Changes
- Update all project image_url fields with real image URLs
- Ensures projects display properly on the website
- Improves portfolio presentation with professional photos

## Projects Updated
1. Residential Roof Replacement
2. Commercial Flat Roof Installation
3. Historic Building Restoration
4. Emergency Storm Repair
*/

-- Update project images with real URLs
UPDATE projects SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/9a8aab66-1da5-434d-b9ec-d95b92864e6c.jpg' 
WHERE title = 'Residential Roof Replacement';

UPDATE projects SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/c4197be7-9866-4ded-b72c-d6c9fb78ac69.jpg' 
WHERE title = 'Commercial Flat Roof Installation';

UPDATE projects SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/469795ca-6609-4cb1-9c74-6e5faa823b6b.jpg' 
WHERE title = 'Historic Building Restoration';

UPDATE projects SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/d6e7cea9-94c7-4e28-9b5b-ea9ea91f9f93.jpg' 
WHERE title = 'Emergency Storm Repair';
