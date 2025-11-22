# Google Authentication - Quick Setup Guide

## 🚀 5-Minute Setup

### Prerequisites
- Supabase project for Roofing Solutions Hub
- Google account
- Admin access to Supabase Dashboard

---

## Step 1: Google Cloud Console (3 minutes)

### 1.1 Create OAuth Credentials

1. Go to: https://console.cloud.google.com/
2. Create new project or select existing
3. Navigate to: **APIs & Services** → **Credentials**
4. Click: **Create Credentials** → **OAuth client ID**
5. Application type: **Web application**
6. Name: `Roofing Solutions Hub`

### 1.2 Configure Authorized Redirect URIs

Add this URL (replace `[YOUR-PROJECT-REF]` with your Supabase project reference):

```
https://[YOUR-PROJECT-REF].supabase.co/auth/v1/callback
```

**Example**:
```
https://abcdefghijklmnop.supabase.co/auth/v1/callback
```

### 1.3 Copy Credentials

After creating, you'll see:
- **Client ID**: `123456789-abc...apps.googleusercontent.com`
- **Client Secret**: `GOCSPX-abc...xyz`

**⚠️ Keep these secure!**

---

## Step 2: Supabase Configuration (2 minutes)

### 2.1 Enable Google Provider

1. Go to: https://supabase.com/dashboard
2. Select your project
3. Navigate to: **Authentication** → **Providers**
4. Find **Google** in the list
5. Toggle **Enable Google provider** to ON

### 2.2 Enter Credentials

Paste the credentials from Step 1:
- **Client ID**: Paste your Google Client ID
- **Client Secret**: Paste your Google Client Secret

### 2.3 Configure URLs

- **Site URL**: Your production URL (e.g., `https://yourdomain.com`)
- **Redirect URLs**: Add your application URL

### 2.4 Save

Click **Save** to apply changes.

---

## Step 3: Test (1 minute)

### 3.1 Test Sign-In

1. Go to your application's login page: `/login`
2. Click **"Continue with Google"**
3. Authenticate with your Google account
4. Verify redirect to home page
5. Check you're logged in

### 3.2 Verify Database

1. Go to Supabase Dashboard
2. Navigate to: **Authentication** → **Users**
3. Verify new user appears in the list
4. Check email matches your Google account

---

## ✅ Setup Complete!

Your users can now sign in with Google!

---

## 🔧 Quick Reference

### Find Your Supabase Project Reference

1. Go to Supabase Dashboard
2. Select your project
3. Go to **Settings** → **API**
4. Look for **Project URL**: `https://[PROJECT-REF].supabase.co`
5. The `[PROJECT-REF]` is the part before `.supabase.co`

### Example Configuration

**Google Cloud Console**:
```
Authorized redirect URIs:
https://abcdefghijklmnop.supabase.co/auth/v1/callback
```

**Supabase Dashboard**:
```
Client ID: 123456789-abc...apps.googleusercontent.com
Client Secret: GOCSPX-abc...xyz
Site URL: https://roofingsolutions.com
```

---

## 🐛 Troubleshooting

### "Invalid Client" Error
- ✅ Check Client ID and Secret are correct
- ✅ No extra spaces in credentials
- ✅ Credentials saved in Supabase

### "Redirect URI Mismatch" Error
- ✅ Check redirect URI in Google Console
- ✅ Must match exactly: `https://[PROJECT-REF].supabase.co/auth/v1/callback`
- ✅ Wait 5 minutes after saving changes

### Button Not Working
- ✅ Check Google provider is enabled in Supabase
- ✅ Check browser console for errors
- ✅ Try in incognito mode

---

## 📞 Need Help?

- **Detailed Guide**: See `GOOGLE_AUTH_SETUP.md`
- **Supabase Docs**: https://supabase.com/docs/guides/auth/social-login/auth-google
- **Google OAuth Docs**: https://developers.google.com/identity/protocols/oauth2

---

## 🎉 What's Next?

Users can now:
- ✅ Sign in with Google (one click)
- ✅ Sign up with Google (no password needed)
- ✅ Access their account instantly
- ✅ Enjoy secure OAuth 2.0 authentication

**No additional configuration needed!**
