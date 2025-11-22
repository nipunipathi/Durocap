/*
# Add Phone and Address Fields to Profiles Table

## Plain English Explanation
This migration adds two new optional fields to the profiles table:
- `phone`: stores user's phone number
- `address`: stores user's mailing/shipping address

These fields allow users to maintain complete profile information for order fulfillment and contact purposes.

## Changes
1. Add `phone` column (text, nullable)
2. Add `address` column (text, nullable)

## Security
- No RLS changes needed
- Fields are optional and can be updated by profile owner
- Existing policies cover these new fields
*/

-- Add phone and address fields to profiles table
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS address text;