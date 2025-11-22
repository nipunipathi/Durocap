# Production Deployment Checklist

## Pre-Deployment Checklist

### 1. Environment Variables ✅
Ensure all required environment variables are set in your hosting platform:

```env
VITE_APP_ID=app-7p9lig9vkiyp
VITE_SUPABASE_URL=https://cmkqdmvklwgfwjplddtk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNta3FkbXZrbHdnZndqcGxkZHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTU3MTYsImV4cCI6MjA3OTI3MTcxNn0.DtjzeJIW2_QGILTjhbCpHKiR1m3PaEgSO_VzS4RJ5CU
VITE_LOGIN_TYPE=gmail
```

**How to set in different platforms**:

**Vercel**:
1. Go to Project Settings → Environment Variables
2. Add each variable with name and value
3. Select "Production" environment
4. Click "Save"

**Netlify**:
1. Go to Site Settings → Build & Deploy → Environment
2. Click "Edit variables"
3. Add each variable
4. Click "Save"

**Other Platforms**:
- Check your platform's documentation for setting environment variables
- Ensure variables start with `VITE_` prefix

---

### 2. Supabase Configuration ✅

#### A. URL Configuration
1. Go to Supabase Dashboard
2. Navigate to: **Authentication** → **URL Configuration**
3. Set **Site URL** to your production domain:
   ```
   https://yourdomain.com
   ```
4. Add **Redirect URLs**:
   ```
   https://yourdomain.com
   https://yourdomain.com/login
   https://yourdomain.com/admin/login
   ```

#### B. Email Templates
1. Go to: **Authentication** → **Email Templates**
2. Update email templates with your domain
3. Test email delivery

#### C. Database Policies
1. Go to: **Authentication** → **Policies**
2. Verify RLS policies are enabled
3. Test policies with different user roles

---

### 3. Admin User Setup ✅

Create at least one admin user:

```sql
-- Method 1: Update existing user
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-admin-email@example.com';

-- Method 2: Create new admin (after user signs up)
INSERT INTO profiles (id, email, role)
VALUES (
  'user-uuid-from-auth-users-table',
  'admin@example.com',
  'admin'
);
```

**Steps**:
1. Sign up a user through the application
2. Go to Supabase Dashboard → Authentication → Users
3. Copy the user's UUID
4. Go to Database → SQL Editor
5. Run the UPDATE query above with your email
6. Verify by logging in to /admin/login

---

### 4. Hosting Platform Configuration ✅

#### For Vercel:
- ✅ `vercel.json` file is included
- ✅ Rewrites configured for SPA routing
- ✅ Security headers configured

#### For Netlify:
- ✅ `netlify.toml` file is included
- ✅ Redirects configured for SPA routing
- ✅ Build settings configured
- ✅ Cache headers configured

#### For Other Platforms:
Ensure SPA routing is configured. The application uses React Router, so all routes must redirect to `index.html`.

---

### 5. Build Verification ✅

Before deploying, verify the application compiles:

```bash
npm run lint
```

Expected output:
```
Checked 104 files in XXXms. No fixes applied.
```

If there are errors, fix them before deploying.

---

### 6. Database Migrations ✅

Verify all migrations are applied:

1. Go to Supabase Dashboard → Database → Migrations
2. Check that all 15 migrations are applied
3. If any are missing, apply them manually

---

## Deployment Steps

### Step 1: Choose Hosting Platform

**Recommended Platforms**:
- ✅ Vercel (Easiest, automatic deployments)
- ✅ Netlify (Great for static sites)
- ✅ Cloudflare Pages
- ✅ AWS Amplify
- ✅ GitHub Pages (requires additional configuration)

---

### Step 2: Connect Repository

1. Create a Git repository (if not already done)
2. Push code to GitHub/GitLab/Bitbucket
3. Connect repository to hosting platform
4. Configure build settings:
   - **Build Command**: `npm run build` (or leave empty if platform handles it)
   - **Output Directory**: `dist`
   - **Node Version**: 18 or higher

---

### Step 3: Set Environment Variables

In your hosting platform dashboard:
1. Navigate to Environment Variables section
2. Add all variables from `.env` file
3. Ensure they start with `VITE_` prefix
4. Save and redeploy if necessary

---

### Step 4: Deploy

1. Trigger deployment (automatic or manual)
2. Wait for build to complete
3. Check deployment logs for errors
4. Visit your production URL

---

## Post-Deployment Verification

### 1. Basic Functionality ✅

Visit your production URL and test:

- [ ] Homepage loads correctly
- [ ] Navigation works (all menu items)
- [ ] Images load properly
- [ ] No console errors (F12 → Console)
- [ ] Mobile responsiveness works

---

### 2. Authentication ✅

Test user authentication:

- [ ] Can access /login page
- [ ] Can sign up new user
- [ ] Receive verification email
- [ ] Can verify email
- [ ] Can log in with verified account
- [ ] Session persists after page refresh
- [ ] Can log out

---

### 3. Admin Panel ✅

Test admin functionality:

- [ ] Can access /admin/login
- [ ] Can log in with admin credentials
- [ ] Dashboard loads correctly
- [ ] Can view products
- [ ] Can add/edit/delete products
- [ ] Can view orders
- [ ] Can cancel/delete orders
- [ ] Can view clients
- [ ] Can manage pages

---

### 4. E-Commerce Features ✅

Test shopping functionality:

- [ ] Products page loads
- [ ] Can view product details
- [ ] Can add products to cart
- [ ] Cart updates correctly
- [ ] Can proceed to checkout
- [ ] Payment integration works (if configured)
- [ ] Order confirmation works

---

### 5. Database Operations ✅

Test data persistence:

- [ ] Products load from database
- [ ] Orders are saved correctly
- [ ] User profiles are created
- [ ] Admin changes persist
- [ ] No "Permission denied" errors

---

### 6. Performance ✅

Check application performance:

- [ ] Pages load in < 3 seconds
- [ ] Images are optimized
- [ ] No memory leaks
- [ ] Smooth scrolling and interactions
- [ ] Works on slow connections

---

## Common Issues and Solutions

### Issue: White Screen After Deployment

**Cause**: Environment variables not set or build errors

**Solution**:
1. Check browser console for errors
2. Verify environment variables are set
3. Check deployment logs for build errors
4. Ensure SPA routing is configured

---

### Issue: "Missing Supabase environment variables"

**Cause**: Environment variables not set in hosting platform

**Solution**:
1. Go to hosting platform settings
2. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
3. Redeploy application

---

### Issue: Authentication Not Working

**Cause**: Redirect URLs not configured in Supabase

**Solution**:
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your production domain to Redirect URLs
3. Save and test again

---

### Issue: 404 on Page Refresh

**Cause**: SPA routing not configured

**Solution**:
1. Ensure `vercel.json` or `netlify.toml` is in root directory
2. Check hosting platform documentation for SPA configuration
3. Redeploy application

---

### Issue: Images Not Loading

**Cause**: Incorrect image paths or missing images

**Solution**:
1. Check images are in `/public/images/` directory
2. Use absolute paths: `/images/filename.jpg`
3. Verify images are included in deployment

---

### Issue: Admin Panel Not Accessible

**Cause**: No admin user exists

**Solution**:
1. Create admin user using SQL query (see Admin User Setup above)
2. Verify role is set to 'admin' in profiles table
3. Log out and log in again

---

## Monitoring and Maintenance

### 1. Set Up Monitoring

- [ ] Configure error tracking (e.g., Sentry)
- [ ] Set up uptime monitoring
- [ ] Enable analytics (e.g., Google Analytics)
- [ ] Monitor Supabase usage

---

### 2. Regular Maintenance

- [ ] Check error logs weekly
- [ ] Monitor database size
- [ ] Review user feedback
- [ ] Update dependencies monthly
- [ ] Backup database regularly

---

### 3. Performance Optimization

- [ ] Enable CDN for static assets
- [ ] Implement image optimization
- [ ] Add service workers for offline support
- [ ] Optimize database queries
- [ ] Enable caching where appropriate

---

## Rollback Plan

If deployment fails or causes issues:

1. **Immediate Rollback**:
   - Most platforms have a "Rollback" button
   - Click to revert to previous deployment

2. **Manual Rollback**:
   - Revert Git commit
   - Push to repository
   - Trigger new deployment

3. **Database Rollback**:
   - Supabase doesn't have automatic rollback
   - Restore from backup if needed
   - Revert migrations manually if necessary

---

## Success Criteria

Deployment is successful when:

- ✅ Application loads without errors
- ✅ All pages are accessible
- ✅ Authentication works correctly
- ✅ Admin panel is functional
- ✅ Database operations work
- ✅ No console errors
- ✅ Mobile responsive
- ✅ Performance is acceptable
- ✅ All tests pass

---

## Support Resources

- **Production Troubleshooting**: See `PRODUCTION_TROUBLESHOOTING.md`
- **Deployment Guide**: See `DEPLOYMENT_GUIDE.md`
- **Supabase Docs**: https://supabase.com/docs
- **Vercel Docs**: https://vercel.com/docs
- **Netlify Docs**: https://docs.netlify.com

---

**Last Updated**: November 22, 2025  
**Version**: 1.0  
**Status**: Production Ready
