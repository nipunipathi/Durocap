/*
# Create Storage Bucket for Brochures

Creates a public storage bucket for PDF brochures with appropriate size limits.
*/

-- Create storage bucket for brochures
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'brochures',
  'brochures',
  true,
  10485760, -- 10MB limit per file
  ARRAY['application/pdf', 'image/png', 'image/jpeg']::text[]
)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to read files
CREATE POLICY "Public Access to Brochures"
ON storage.objects FOR SELECT
USING (bucket_id = 'brochures');

-- Allow authenticated users to upload (admin only in practice)
CREATE POLICY "Authenticated Upload to Brochures"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'brochures');

-- Allow authenticated users to update (admin only in practice)
CREATE POLICY "Authenticated Update Brochures"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'brochures');

-- Allow authenticated users to delete (admin only in practice)
CREATE POLICY "Authenticated Delete Brochures"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'brochures');
