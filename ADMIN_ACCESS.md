# 🔐 Admin Dashboard Access Guide

## How to Access the Admin Dashboard

### Step 1: Create Your Admin Account

**Important**: The first user who registers automatically becomes the admin!

1. **Navigate to the Login Page**
   - Click "Sign In" button in the top right corner of the website
   - Or go directly to `/login` route

2. **Create Your Account**
   - Click "Don't have an account? Sign up"
   - Enter your email address (e.g., `admin@roofingsolutions.com`)
   - Enter a secure password (minimum 6 characters)
   - Click "Sign Up"

3. **You're Now the Admin!**
   - The first registered user is automatically assigned the admin role
   - You'll be logged in immediately after signup
   - No email verification required (disabled for easier testing)

### Step 2: Access the Admin Dashboard

After logging in:

1. **Click Your Profile Icon**
   - Located in the top right corner of the header
   - It shows your email address

2. **Select "Admin Dashboard"**
   - A dropdown menu will appear
   - Click "Admin Dashboard" option
   - You'll be redirected to `/admin`

### Step 3: Manage Your Platform

From the Admin Dashboard, you can:

- **Manage Products** - Add, edit, delete products
- **Manage Services** - Update service offerings
- **Manage Projects** - Showcase completed projects
- **View Orders** - Track and update order status
- **Review Inquiries** - See customer contact form submissions

## 📝 Example Admin Credentials

You create your own credentials during signup. Here's an example:

```
Email: admin@roofingsolutions.com
Password: YourSecurePassword123
```

**Note**: Replace these with your actual email and password when you sign up.

## 🔑 Admin Features

### Products Management
- **Add New Products**: Click "Add Product" button
- **Edit Products**: Click edit icon on any product
- **Delete Products**: Click delete icon (with confirmation)
- **Toggle Active Status**: Show/hide products from customers

### Services Management
- **Add Services**: Create new service offerings
- **Edit Services**: Update descriptions and details
- **Manage Visibility**: Control which services are displayed

### Projects Management
- **Add Projects**: Showcase completed work
- **Upload Images**: Add project photos
- **Feature Projects**: Highlight best work on homepage

### Orders Management
- **View All Orders**: See complete order history
- **Update Status**: Change order status (Pending → Completed → Cancelled)
- **View Details**: See customer info and order items

### Inquiries Management
- **View Messages**: Read customer contact form submissions
- **Track Status**: Mark inquiries as read/responded

## 🚨 Important Security Notes

1. **First User = Admin**
   - Only the first registered user gets admin role
   - All subsequent users are regular customers
   - This is controlled by a database trigger

2. **Secure Your Account**
   - Use a strong password
   - Don't share your admin credentials
   - Log out when finished

3. **Admin-Only Access**
   - Admin routes are protected
   - Regular users cannot access admin dashboard
   - Attempting to access will redirect to home page

## 🔄 If You Need to Create Another Admin

If you need multiple admin accounts:

1. **Access Supabase Dashboard**
   - Go to https://supabase.com/dashboard
   - Select your project: `cmkqdmvklwgfwjplddtk`

2. **Update User Role**
   - Go to Authentication → Users
   - Find the user you want to make admin
   - Go to Table Editor → profiles
   - Find the user's profile
   - Change `role` from `user` to `admin`

## 📱 Admin Dashboard Routes

- **Dashboard Home**: `/admin`
- **Products Management**: `/admin/products`
- **Orders Management**: `/admin/orders`

## ✅ Quick Access Checklist

- [ ] Navigate to the website
- [ ] Click "Sign In" button
- [ ] Click "Don't have an account? Sign up"
- [ ] Enter your email and password
- [ ] Click "Sign Up"
- [ ] Click profile icon in header
- [ ] Select "Admin Dashboard"
- [ ] Start managing your platform!

## 🎯 Current Database Info

**Supabase Project ID**: `cmkqdmvklwgfwjplddtk`
**Supabase URL**: `https://cmkqdmvklwgfwjplddtk.supabase.co`

You can access the Supabase dashboard to view/manage data directly if needed.

## 💡 Tips

- **Test Before Production**: Create a test admin account first
- **Sample Data**: The platform includes sample products/services for testing
- **Replace Sample Data**: Use the admin dashboard to replace with real data
- **Backup Important**: Consider backing up your data regularly

## 🆘 Troubleshooting

**Can't Access Admin Dashboard?**
- Ensure you're the first registered user
- Check if you're logged in (profile icon should show in header)
- Try logging out and back in
- Verify your role in Supabase dashboard

**Forgot Password?**
- Currently using email/password auth
- Can reset via Supabase dashboard if needed
- Or create a new account (if no admin exists yet)

---

**Ready to manage your Roofing Solutions Hub! 🏗️**
