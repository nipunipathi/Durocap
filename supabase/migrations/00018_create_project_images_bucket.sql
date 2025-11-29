/*
# Create Storage Bucket for Project Images

## Overview
Create a public storage bucket for project images with appropriate size limits and file type restrictions.

## Changes
- Create `project_images` bucket
- Set public access for image viewing
- Configure 5MB file size limit
- Allow common image formats (PNG, JPG, JPEG, WebP, GIF)

## Security
- Public bucket for easy image access
- File size limit prevents abuse
- Allowed MIME types restrict to images only
*/

-- Create storage bucket for project images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'project_images',
  'project_images',
  true,
  5242880, -- 5MB in bytes
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
)
ON CONFLICT (id) DO NOTHING;

-- Create policy for public read access
CREATE POLICY "Public read access for project images"
ON storage.objects FOR SELECT
USING (bucket_id = 'project_images');

-- Create policy for authenticated insert
CREATE POLICY "Authenticated users can upload project images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'project_images');

-- Create policy for authenticated update
CREATE POLICY "Authenticated users can update project images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'project_images');

-- Create policy for authenticated delete
CREATE POLICY "Authenticated users can delete project images"
ON storage.objects FOR DELETE
USING (bucket_id = 'project_images');