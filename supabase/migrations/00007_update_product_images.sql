/*
# Update Product Images with Real URLs

## Purpose
Replace placeholder product images with actual high-quality product images.

## Changes
- Update all product image_url fields with real image URLs
- Ensures products display properly on the website
- Improves user experience with professional product photos

## Products Updated
1. Asphalt Shingles - Premium
2. Clay Roof Tiles
3. Metal Roofing Panels
4. EPDM Rubber Membrane
5. TPO Roofing Membrane
6. Aluminum Gutters - 10ft
7. Downspout Extensions
8. Fiberglass Insulation Batts
9. Roofing Hammer
10. Waterproof Sealant
*/

-- Update product images with real URLs
UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/8c314acd-0346-4d3d-a71f-87845ca75553.jpg' 
WHERE name = 'Asphalt Shingles - Premium';

UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/58b0e63f-61d8-4eb1-962f-ca569239de8d.jpg' 
WHERE name = 'Clay Roof Tiles';

UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/ac99b717-fe38-4c15-95db-29f2fd7cdce4.jpg' 
WHERE name = 'Metal Roofing Panels';

UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/1875a48a-334e-480f-8931-a68a55e6268b.jpg' 
WHERE name = 'EPDM Rubber Membrane';

UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/10f60178-f923-4524-8269-40c59f577685.jpg' 
WHERE name = 'TPO Roofing Membrane';

UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/fe36b9f1-1bfc-4ad0-ae05-ba5fe048fff7.jpg' 
WHERE name = 'Aluminum Gutters - 10ft';

UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/eabf9b2d-f1aa-4e12-a31f-290b8794af8e.jpg' 
WHERE name = 'Downspout Extensions';

UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/eeb68ac0-8be1-4868-ad0c-61b569d652b4.jpg' 
WHERE name = 'Fiberglass Insulation Batts';

UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/887e91e5-98c7-422f-a620-86657d968497.jpg' 
WHERE name = 'Roofing Hammer';

UPDATE products SET image_url = 'https://miaoda-site-img.s3cdn.medo.dev/images/14f68068-5a00-441a-8241-71b17fb9dd9e.jpg' 
WHERE name = 'Waterproof Sealant';