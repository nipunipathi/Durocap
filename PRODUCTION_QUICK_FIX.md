# Production Quick Fix Guide

## 🚨 Emergency Fixes for Common Production Issues

### Issue: White Screen / Application Not Loading

**Quick Fix**:
1. Open browser console (Press F12)
2. Look for error messages
3. Apply fix based on error:

| Error Message | Quick Fix |
|--------------|-----------|
| "Missing Supabase environment variables" | Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in hosting platform |
| "Failed to fetch" | Check Supabase URL is correct and project is active |
| "Cannot read property of undefined" | Clear browser cache and reload |
| No errors, just white screen | Check if environment variables are set correctly |

---

### Issue: Cannot Log In

**Quick Fix**:
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your production domain to:
   - Site URL: `https://yourdomain.com`
   - Redirect URLs: `https://yourdomain.com`
3. Save and try logging in again

---

### Issue: 404 Error on Page Refresh

**Quick Fix**:
1. Ensure `vercel.json` or `netlify.toml` exists in root directory
2. Redeploy application
3. If using other hosting, configure SPA routing

---

### Issue: Admin Panel Not Accessible

**Quick Fix**:
1. Go to Supabase Dashboard → Database → SQL Editor
2. Run this query:
```sql
UPDATE profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```
3. Log out and log in again

---

### Issue: Images Not Loading

**Quick Fix**:
1. Check images are in `/public/images/` directory
2. Verify image paths use absolute paths: `/images/filename.jpg`
3. Clear browser cache and reload

---

### Issue: Database Queries Failing

**Quick Fix**:
1. Go to Supabase Dashboard → Authentication → Policies
2. Check if RLS policies are blocking access
3. Temporarily disable RLS to test:
```sql
ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;
```
4. Re-enable after testing and fix policies

---

## 📋 Environment Variables Checklist

Copy these to your hosting platform:

```env
VITE_APP_ID=app-7p9lig9vkiyp
VITE_SUPABASE_URL=https://cmkqdmvklwgfwjplddtk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNta3FkbXZrbHdnZndqcGxkZHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2OTU3MTYsImV4cCI6MjA3OTI3MTcxNn0.DtjzeJIW2_QGILTjhbCpHKiR1m3PaEgSO_VzS4RJ5CU
VITE_LOGIN_TYPE=gmail
```

---

## 🔍 Quick Diagnostic Commands

### Check if environment variables are loaded:
```javascript
// Run in browser console
console.log(import.meta.env);
```

### Test Supabase connection:
```javascript
// Run in browser console
fetch('https://cmkqdmvklwgfwjplddtk.supabase.co/rest/v1/')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
```

### Check authentication session:
```javascript
// Run in browser console
localStorage.getItem('sb-cmkqdmvklwgfwjplddtk-auth-token');
```

---

## 🛠️ Platform-Specific Fixes

### Vercel
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env` file
3. Redeploy

### Netlify
1. Go to Site Settings → Build & Deploy → Environment
2. Add all variables from `.env` file
3. Trigger new deploy

### Other Platforms
- Check platform documentation for setting environment variables
- Ensure variables start with `VITE_` prefix
- Redeploy after adding variables

---

## 📞 Still Having Issues?

1. **Check Documentation**:
   - `PRODUCTION_TROUBLESHOOTING.md` - Detailed troubleshooting
   - `DEPLOYMENT_CHECKLIST.md` - Complete deployment guide

2. **Run Diagnostic Tool**:
   ```bash
   ./diagnose_production.sh
   ```

3. **Check Browser Console**:
   - Press F12
   - Go to Console tab
   - Look for error messages

4. **Check Network Tab**:
   - Press F12
   - Go to Network tab
   - Look for failed requests (red)

---

**Last Updated**: November 22, 2025  
**Version**: 1.0
