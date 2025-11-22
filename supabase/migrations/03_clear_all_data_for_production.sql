/*
# Clear All Data for Production Deployment

## Plain English Explanation
This migration removes all existing data from the database tables to prepare for production deployment.
The table structures, policies, and functions remain intact - only the data is cleared.

## Tables Cleared
- orders: All order records removed
- products: All product records removed
- services: All service records removed
- projects: All project records removed
- contact_inquiries: All inquiry records removed
- profiles: All user profile records removed (except system-required profiles)

## Security
- No security changes
- All RLS policies remain active
- All triggers remain functional

## Notes
- This is a one-time cleanup for production deployment
- After deployment, the first user to sign up will automatically become admin
- All tables are ready to receive real production data
*/

-- Clear all data from tables (in correct order to respect foreign key constraints)
TRUNCATE TABLE orders CASCADE;
TRUNCATE TABLE contact_inquiries CASCADE;
TRUNCATE TABLE projects CASCADE;
TRUNCATE TABLE services CASCADE;
TRUNCATE TABLE products CASCADE;
TRUNCATE TABLE profiles CASCADE;
