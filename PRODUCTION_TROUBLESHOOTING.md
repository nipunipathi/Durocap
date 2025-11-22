# Production Troubleshooting Guide

## Common Production Issues and Fixes

### Issue 1: White Screen / Blank Page

**Symptoms**: Application shows a white screen or blank page when published

**Possible Causes**:
1. Environment variables not set
2. Build errors
3. JavaScript errors in production
4. Routing issues

**Solutions**:

#### A. Check Environment Variables
Ensure these environment variables are set in your production environment:

```env
VITE_APP_ID=app-7p9lig9vkiyp
VITE_SUPABASE_URL=https://cmkqdmvklwgfwjplddtk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNta3FkbXZrbHdnZndqcGxkZHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTU3MTYsImV4cCI6MjA3OTI3MTcxNn0.DtjzeJIW2_QGILTjhbCpHKiR1m3PaEgSO_VzS4RJ5CU
VITE_LOGIN_TYPE=gmail
```

#### B. Check Browser Console
1. Open browser DevTools (F12)
2. Go to Console tab
3. Look for error messages
4. Common errors and fixes:

**Error**: "Missing Supabase environment variables"
- **Fix**: Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in production

**Error**: "Failed to fetch" or "Network Error"
- **Fix**: Check Supabase URL is correct and accessible
- **Fix**: Verify Supabase project is active

**Error**: "Cannot read property of undefined"
- **Fix**: Check if data is loading before rendering
- **Fix**: Add null checks in components

---

### Issue 2: Authentication Not Working

**Symptoms**: Cannot log in, session not persisting, redirects not working

**Solutions**:

#### A. Check Supabase Configuration
1. Go to Supabase Dashboard
2. Navigate to Authentication → URL Configuration
3. Add your production URL to:
   - **Site URL**: `https://yourdomain.com`
   - **Redirect URLs**: Add your production domain

#### B. Check Email Settings
1. Go to Supabase Dashboard → Authentication → Email Templates
2. Ensure email verification is configured
3. Check spam folder for verification emails

#### C. Session Storage
- Supabase uses localStorage for session storage
- Ensure cookies are enabled in browser
- Check if third-party cookies are blocked

---

### Issue 3: Database Queries Failing

**Symptoms**: Data not loading, "Permission denied" errors

**Solutions**:

#### A. Check Row Level Security (RLS)
1. Go to Supabase Dashboard → Authentication → Policies
2. Verify RLS policies are correctly configured
3. Common policy issues:

**Products Table**:
```sql
-- Allow public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT USING (true);

-- Allow admin write access
CREATE POLICY "Allow admin write access" ON products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

**Orders Table**:
```sql
-- Users can view their own orders
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
```

#### B. Check API Calls
Look for these common issues in browser console:
- 401 Unauthorized: User not authenticated
- 403 Forbidden: RLS policy blocking access
- 404 Not Found: Table or endpoint doesn't exist

---

### Issue 4: Images Not Loading

**Symptoms**: Broken image icons, images not displaying

**Solutions**:

#### A. Check Image Paths
- Ensure images are in `/public/images/` directory
- Use absolute paths: `/images/filename.jpg`
- Don't use relative paths like `../images/`

#### B. Check Image URLs
- External images must use HTTPS
- Verify image URLs are accessible
- Check CORS settings if loading from external domains

#### C. Supabase Storage
If using Supabase Storage:
1. Go to Supabase Dashboard → Storage
2. Check bucket permissions
3. Ensure bucket is public if images should be publicly accessible

---

### Issue 5: Routing Issues (404 Errors)

**Symptoms**: Page refreshes show 404, direct URLs don't work

**Solutions**:

#### A. Configure Server for SPA
Most hosting platforms need SPA configuration:

**Vercel** (`vercel.json`):
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Netlify** (`netlify.toml`):
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

**Nginx**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

### Issue 6: Stripe Payment Not Working

**Symptoms**: Payment button doesn't work, checkout fails

**Solutions**:

#### A. Check Stripe Configuration
1. Verify Stripe publishable key is set
2. Check if using test or live keys
3. Ensure webhook endpoint is configured

#### B. Check CORS
- Stripe requires HTTPS in production
- Verify domain is whitelisted in Stripe dashboard

---

### Issue 7: Admin Panel Not Accessible

**Symptoms**: Cannot access /admin, redirects to login, "Access denied"

**Solutions**:

#### A. Check Admin User
1. Go to Supabase Dashboard → Authentication → Users
2. Find your user
3. Go to Database → profiles table
4. Ensure your user has `role = 'admin'`

#### B. Create Admin User
```sql
-- Update existing user to admin
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';

-- Or insert new admin profile
INSERT INTO profiles (id, email, role)
VALUES (
  'user-uuid-from-auth-users',
  'admin@example.com',
  'admin'
);
```

---

### Issue 8: Performance Issues

**Symptoms**: Slow loading, laggy interface

**Solutions**:

#### A. Enable Caching
- Use CDN for static assets
- Enable browser caching
- Implement service workers

#### B. Optimize Images
- Compress images before upload
- Use appropriate image formats (WebP)
- Implement lazy loading

#### C. Database Optimization
- Add indexes to frequently queried columns
- Use pagination for large datasets
- Implement data caching

---

## Debugging Steps

### Step 1: Check Browser Console
```
1. Open DevTools (F12)
2. Go to Console tab
3. Look for red error messages
4. Note the error message and file/line number
```

### Step 2: Check Network Tab
```
1. Open DevTools (F12)
2. Go to Network tab
3. Refresh the page
4. Look for failed requests (red)
5. Click on failed request to see details
```

### Step 3: Check Application Tab
```
1. Open DevTools (F12)
2. Go to Application tab
3. Check Local Storage for session data
4. Check if Supabase session exists
```

### Step 4: Test API Endpoints
```
1. Open browser console
2. Run: console.log(import.meta.env)
3. Verify environment variables are loaded
4. Test Supabase connection:
   
   import { supabase } from './src/db/supabase'
   supabase.from('products').select('*').then(console.log)
```

---

## Production Checklist

Before deploying to production, verify:

- [ ] All environment variables are set
- [ ] Supabase URL and keys are correct
- [ ] Site URL is configured in Supabase
- [ ] RLS policies are enabled and correct
- [ ] Admin user exists with correct role
- [ ] Images are accessible
- [ ] SPA routing is configured
- [ ] HTTPS is enabled
- [ ] Email verification is working
- [ ] Payment integration is tested
- [ ] All pages load without errors
- [ ] Mobile responsiveness is tested
- [ ] Browser console shows no errors

---

## Quick Fixes

### Fix 1: Reset Environment
```bash
# Clear browser cache and storage
1. Open DevTools (F12)
2. Go to Application tab
3. Click "Clear storage"
4. Refresh page
```

### Fix 2: Verify Supabase Connection
```javascript
// Test in browser console
fetch('https://cmkqdmvklwgfwjplddtk.supabase.co/rest/v1/')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

### Fix 3: Check Authentication
```javascript
// Test in browser console
import { supabase } from './src/db/supabase'
supabase.auth.getSession().then(console.log)
```

---

## Getting Help

### Information to Provide
When reporting issues, include:
1. Error message from console
2. Browser and version
3. Steps to reproduce
4. Screenshots of errors
5. Network tab showing failed requests

### Common Error Messages

**"Missing Supabase environment variables"**
- Cause: Environment variables not set
- Fix: Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY

**"Failed to fetch"**
- Cause: Network issue or incorrect URL
- Fix: Check Supabase URL and internet connection

**"Permission denied"**
- Cause: RLS policy blocking access
- Fix: Update RLS policies in Supabase

**"User not found"**
- Cause: User not authenticated
- Fix: Log in again

**"Invalid token"**
- Cause: Session expired
- Fix: Log out and log in again

---

## Contact Support

If issues persist:
1. Check Supabase status: https://status.supabase.com
2. Review Supabase docs: https://supabase.com/docs
3. Check application logs in hosting platform
4. Contact hosting provider support

---

**Last Updated**: November 22, 2025  
**Version**: 1.0  
**Status**: Production Ready
