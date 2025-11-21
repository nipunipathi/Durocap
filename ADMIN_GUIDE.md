# Admin Dashboard Guide

## Access Information

### Admin Login Credentials
- **URL:** `/admin/login`
- **Username:** `admin`
- **Password:** `admin123`

## Features Overview

### 1. Public Website (No Login Required)
- **Home Page** - Main landing page with hero section
- **Products Page** - Browse and view all roofing products
- All pages include a back navigation button for easy navigation

### 2. Admin Dashboard (Login Required)

#### Dashboard Overview (`/admin`)
- **Sales Visualization**
  - Daily sales chart (line graph)
  - Monthly revenue chart (bar graph)
- **Statistics Cards**
  - Total Revenue
  - Total Orders
  - Active Products Count
  - Active Services Count
- **Quick Access Links**
  - Manage Products
  - Manage Orders
  - Edit Pages

#### Product Management (`/admin/products`)
- Add new products
- Edit existing products
- Delete products
- Manage product categories
- Set product pricing and availability

#### Order Management (`/admin/orders`)
- View all customer orders
- Track order status
- Update order information
- View order details and customer information

#### Page Content Editor (`/admin/pages`)
Edit content for multiple pages:
- **Home Page**
  - Hero title and subtitle
  - Feature taglines
- **About Page**
  - Page title and subtitle
  - Company description
- **Contact Page**
  - Phone number
  - Email address
  - Physical address
  - Business hours

### 3. Security Features
- Session-based authentication
- Protected admin routes (automatic redirect to login)
- Logout functionality available on all admin pages
- Session persists across page refreshes

## Navigation Structure

```
Public Access:
├── / (Home)
├── /products (Products)
├── /about (About Us)
├── /services (Services)
├── /projects (Projects)
└── /contact (Contact)

Admin Access (Login Required):
├── /admin/login (Login Page)
└── /admin (Dashboard)
    ├── /admin/products (Product Management)
    ├── /admin/orders (Order Management)
    └── /admin/pages (Page Content Editor)
```

## Usage Instructions

### For Administrators:
1. Navigate to `/admin/login`
2. Enter credentials (admin/admin123)
3. Access the admin dashboard
4. Use the navigation cards to manage different aspects
5. Click "Logout" button when finished

### For Clients/Customers:
1. Browse the public website (Home, Products)
2. View product catalog
3. Use the back button to navigate between pages
4. No login required for browsing

## Technical Notes
- Admin session stored in browser sessionStorage
- Session cleared on logout
- Unauthenticated access to admin routes redirects to login
- All admin pages include logout button for security
