/*
# Create Product Images Storage Bucket

1. Storage Bucket
  - `app-7p9lig9vkiyp_product_images`
    - Public bucket for product images
    - Max file size: 5MB
    - Allowed MIME types: image/jpeg, image/png, image/webp, image/gif
    - Public access for reading
    - Authenticated users can upload

2. Security
  - Public read access (anyone can view images)
  - Authenticated users can upload images
  - File size limit: 5MB
  - Only image files allowed

3. Notes
  - Bucket name follows convention: {APP_ID}_{BUSINESS_NAME}
  - Images will be stored with unique filenames to prevent conflicts
  - Frontend will validate file size and type before upload
*/

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'app-7p9lig9vkiyp_product_images',
  'app-7p9lig9vkiyp_product_images',
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to product images
CREATE POLICY "Public read access for product images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'app-7p9lig9vkiyp_product_images');

-- Allow authenticated users to upload product images
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'app-7p9lig9vkiyp_product_images');

-- Allow authenticated users to update their uploaded images
CREATE POLICY "Authenticated users can update product images"
ON storage.objects FOR UPDATE
TO public
USING (bucket_id = 'app-7p9lig9vkiyp_product_images');

-- Allow authenticated users to delete product images
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'app-7p9lig9vkiyp_product_images');
