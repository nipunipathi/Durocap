# Roofing Solutions E-Commerce Website Requirements Document

## 1. Website Overview

### 1.1 Website Name
Durocap Roofing Solutions (durocap.com)

### 1.2 Website Description
A professional e-commerce platform specializing in roofing solutions, providing customers with comprehensive roofing products and services. The website enables online browsing, purchasing, and order management, while offering administrators full control over product and service listings.

### 1.3 Website Pages
- Home\n- About Us
- Products
- Product List Page
- Services
- Projects
- Contact Us
- User Login Page
- User Registration Page
- User Page (User Profile + Cart + Payment)
- Cart Page
- Payment Page
- Admin Login Page
- Admin Dashboard
\n## 2. Core Features

### 2.1 Customer-Facing Features
- Product browsing and search functionality
- Shopping cart system for adding and managing items
- Secure payment integration for online transactions via Razorpay
- Service inquiry and booking\n- Project portfolio showcase with interactive image gallery
- Contact form for customer inquiries
- User registration and login with email/password and Google authentication
- User profile management
- Cart management and checkout\n- QR code payment processing
- **Currency conversion switch between USD and INR with real-time price display**

### 2.2 SEO Optimization Features
\n#### 2.2.1 Meta Tags & Page Titles
- **Home Page**:\n  - Title: 'Durocap Roofing Solutions | Roofing Sheets & Accessories Kerala'
  - Meta Description: 'Trusted supplier of roofing sheets, accessories and custom roofing solutions across Kerala. Durable, affordable and delivered on time. Contact Durocap Roofing Solutions today.'
  - Meta Keywords: 'roofing Kerala, roofing sheets, metal roofing, commercial roofing, Durocap'\n  - Meta Robots: 'index, follow'
\n- **About Page**:
  - Title: 'About Durocap Roofing Solutions | Trusted Roofing Supplier in Kerala'
  - Meta Description: Custom description highlighting company history, values, and expertise in roofing solutions
\n- **Contact Page**:
  - Title: 'Contact Durocap Roofing Solutions | Request a Quote'
  - Meta Description: Contact information and inquiry form details

- **Services Page**:
  - Title: 'Roofing Services Kerala | Commercial & Residential Solutions'
  - Meta Description: Comprehensive roofing services description

- **Products Page**:
  - Title: 'Roofing Products & Materials | Durocap Kerala'
  - Meta Description: Product catalog overview\n
- **Projects Page**:
  - Title: 'Completed Roofing Projects | Durocap Portfolio Kerala'
  - Meta Description: Showcase of successful roofing installations

#### 2.2.2 Robots.txt Configuration
- Create robots.txt file at site root (https://durocap.com/robots.txt)
- Content:\n  ```
  User-agent: *
  Allow: /
  Sitemap: https://durocap.com/sitemap.xml
  ```

#### 2.2.3 XML Sitemap
- Generate sitemap.xml at site root (https://durocap.com/sitemap.xml)
- Include all main pages with priority and change frequency:\n  - Home: priority 1.0, changefreq daily
  - About: priority 0.8, changefreq monthly
  - Services: priority 0.8, changefreq monthly
  - Products: priority 0.9, changefreq weekly
  - Projects: priority 0.7, changefreq monthly
  - Contact: priority 0.6, changefreq monthly
- Auto-update sitemap when new pages or products are added

#### 2.2.4 Structured Data (JSON-LD)
- Add Organization schema to Home page:\n  ```json
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Durocap Roofing Solutions',
    'url': 'https://durocap.com',
    'logo': 'https://durocap.com/MainLogo.png',
    'address': {
      '@type': 'PostalAddress',
      'addressLocality': 'Kozhikode',
      'addressRegion': 'Kerala',
      'addressCountry': 'IN'
    },
    'telephone': '+91-XXXXXXXXXX'\n  }
  ```\n- Add Product schema for product pages\n- Add BreadcrumbList schema for navigation

#### 2.2.5 Google Search Console Integration
- Support for Domain property verification via DNS TXT record
- Support for URL prefix verification methods (HTML file, HTML tag, DNS)\n- Sitemap submission capability to Google Search Console
- URL inspection and indexing request functionality
- Crawl error monitoring and reporting

#### 2.2.6 SEO-Friendly URLs
- Clean, descriptive URLs for all pages
- Examples:
  - https://durocap.com/\n  - https://durocap.com/about
  - https://durocap.com/services
  - https://durocap.com/products
  - https://durocap.com/projects
  - https://durocap.com/contact
  - https://durocap.com/products/[product-name]

#### 2.2.7 Canonical URLs
- Implement canonical tags to prevent duplicate content issues
- Handle www vs non-www versions properly
- Set preferred domain version\n
#### 2.2.8 Open Graph & Social Media Meta Tags
- Add Open Graph tags for social media sharing:\n  - og:title\n  - og:description
  - og:image
  - og:url
  - og:type
- Add Twitter Card meta tags\n
#### 2.2.9 Performance Optimization for SEO
- Image optimization with alt tags
- Lazy loading for images
- Minified CSS and JavaScript
- Fast page load times (target under 3 seconds)
- Mobile-responsive design
- SSL certificate (HTTPS)

#### 2.2.10 Admin SEO Management Dashboard
- Interface to edit meta titles and descriptions for all pages
- Sitemap regeneration tool
- SEO checklist and recommendations
- Google Search Console integration dashboard showing:
  - Indexing status
  - Search performance metrics
  - Crawl errors
  - Sitemap submission status

### 2.3 Currency Conversion Feature
- **Currency Selector**: Dropdown or toggle switch in website header to select between USD and INR
- **Real-Time Conversion**: All product prices, cart totals, and payment amounts automatically convert based on selected currency
- **Currency Symbol Display**: Show ₹ symbol for INR and $ symbol for USD throughout the website
- **Persistent Selection**: Remember user's currency preference across browsing session
- **Conversion Rate**: Use current exchange rate for accurate price conversion
- **Display Format**: INR prices formatted as ₹X,XXX.XX and USD prices as $X,XXX.XX\n
### 2.4 User Login Page
- **Login Form**: Email/username and password input fields
- **Remember Me**: Checkbox option to save login credentials
- **Forgot Password**: Link to password recovery process
- **Sign Up Link**: Redirect to user registration page for new customers
- **Google Sign In**: Quick login via OSS Google login method with'Sign in with Google' button displaying Google logo
- **Security**: Input validation and encrypted password transmission

### 2.5 User Registration Page
- **Registration Form**: Input fields for name, email, password, and confirm password
- **Email Verification**: Send verification email to confirm account\n- **Password Requirements**: Display password strength requirements (minimum 8 characters, mix of letters and numbers)
- **Google Sign Up**: Quick registration via OSS Google login method with 'Sign up with Google' button displaying Google logo
- **Terms Agreement**: Checkbox to agree to terms and conditions before registration
- **Already Have Account**: Link to redirect existing users to login page

### 2.6 User Page Features
- **User Profile Section**: Display and edit user information including name, email, phone number, shipping address, and order history
- **Cart Section**: View cart items, adjust quantities, remove items, view subtotal and total amounts in selected currency
- **Payment Section**: Complete checkout with Razorpay payment gateway and QR code payment option for secure transactions, amounts displayed in selected currency
\n### 2.7 Product List Page
- **Product Grid Display**: Products displayed in responsive grid layout (3-4 columns on desktop, 2 columns on tablet, 1 column on mobile)\n- **Product Cards**: Each card shows product image, name, price in selected currency (USD/INR), brief description, and 'Add to Cart' button
- **Category Filter**: Sidebar or top filter bar to filter products by category (roofing tiles, membranes, gutters, insulation, tools, waterproofing)\n- **Search Bar**: Search functionality to find products by name or keyword
- **Sort Options**: Sort products by price (low to high, high to low), name (A-Z, Z-A), or popularity\n- **Pagination**: Navigate through multiple pages of products with page numbers and next/previous buttons
- **Quick View**: Hover or click to view product details in modal popup without leaving the page
- **Product Details Link**: Click on product card to navigate to detailed product page with full specifications, multiple images, and customer reviews
\n### 2.8 Cart Page
- **Cart Items List**: Display all items added to cart with product image, name, unit price in selected currency, quantity selector, and subtotal
- **Quantity Adjustment**: Increase or decrease quantity with +/- buttons, with real-time price update in selected currency
- **Remove Item**: Delete button to remove individual items from cart
- **Cart Summary**: Display subtotal, estimated tax, shipping cost, and total amount in selected currency (USD or INR)
- **Coupon Code Input**: Field to enter promotional or discount codes with'Apply' button
- **Continue Shopping Button**: Link back to product list page
- **Proceed to Checkout Button**: Navigate to payment page when ready to complete purchase
- **Empty Cart State**: Display message and 'Browse Products' button when cart is empty
- **Save for Later**: Option to move items to wishlist or saved items section

### 2.9 Payment Page
- **Order Summary**: Display final list of items, quantities, prices in selected currency, and total amount
- **Shipping Information**: Form to enter or confirm delivery address (name, phone, address, city, postal code)\n- **Billing Information**: Option to use same as shipping address or enter different billing address
- **Payment Method Selection**: Choose from available payment options including:\n  - **Razorpay Payment Gateway**: Integrated Razorpay checkout supporting credit/debit cards, UPI, net banking, wallets, and EMI options
  - **QR Code Payment**: Display QR code for scanning with mobile payment apps
  - **Digital Wallet**: Other digital wallet options\n- **Razorpay Integration**:
  - Secure Razorpay checkout modal with multiple payment options
  - Support for INR and USD currency transactions
  - Real-time payment status updates
  - Automatic payment confirmation upon successful transaction
  - Payment receipt generation
- **Credit Card Form**: Secure input fields for card number, expiration date, CVV, and cardholder name (via Razorpay)
- **Order Notes**: Optional text area for special delivery instructions or comments
- **Terms and Conditions**: Checkbox to agree to terms before completing purchase
- **Place Order Button**: Final confirmation button to submit order and initiate Razorpay payment
- **I Have Made Payment Button**: For QR code or external payment methods, user clicks this button to notify admin of payment completion
- **Payment Confirmation Notification**: When'I Have Made Payment' button is clicked, system sends notification to admin dashboard with order details and payment amount in selected currency, marking order as 'Pending Admin Confirmation'
- **Razorpay Automatic Confirmation**: Orders paid via Razorpay are automatically confirmed without requiring admin approval
- **Security Badges**: Display SSL encryption, Razorpay secure payment badge, and other security icons for customer trust
- **Order Confirmation**: After successful Razorpay payment or admin confirmation, display order confirmation page with order number, estimated delivery date, and email confirmation notice
- **Currency Display**: All payment amounts shown in user's selected currency (USD or INR)

### 2.10 Admin Login Page
- **Login Form**: Admin username and password input fields
- **Two-Factor Authentication**: Optional security code verification for enhanced security
- **Forgot Password**: Link to admin password recovery process
- **Session Timeout**: Automatic logout after period of inactivity
- **Security**: Encrypted credentials and IP address logging for security monitoring
\n### 2.11 Admin Dashboard
- **Product Management**: Add, edit, delete, and update product listings with image upload and category assignment
- **Service Management**: Add, edit, delete, and modify service offerings and descriptions
- **Order History Management**: View complete order history with filtering options by date, status, payment method (Razorpay/QR code/other), and customer\n- **Payment Confirmation Queue**: Display list of orders with'Pending Admin Confirmation' status (for non-Razorpay payments), showing order number, customer name, payment amount in original currency, and timestamp
- **Razorpay Transaction Dashboard**: View all Razorpay transactions with payment ID, status, amount, and timestamp
- **Confirm Payment Action**: Admin reviews payment notification and clicks 'Confirm Payment' button to approve manual transactions
- **Revenue Update**: Upon admin confirmation or automatic Razorpay confirmation, order amount is automatically added to total revenue counter and reflected in business growth analytics
- **Reject Payment Option**: Admin can reject payment if verification fails, triggering notification to customer for payment resubmission
- **Razorpay Refund Management**: Process refunds for Razorpay transactions directly from admin dashboard
- **Client Management**: View and manage customer information, track customer orders, and communication history
- **Business Growth Analytics**: Interactive dashboard displaying business growth metrics through visual graphs and charts, including:
  - Revenue trends over time (line/bar charts) with real-time updates after payment confirmations
  - Order volume statistics (monthly/quarterly comparisons)
  - Product category performance analysis
  - Customer acquisition trends
  - Payment method breakdown (Razorpay vs other methods)
  - Total revenue counter displaying cumulative confirmed payments
- **Sales Visualization Report**: Visual charts and graphs automatically update to reflect newly confirmed payments, showing revenue breakdown by date, product category, and payment method
- **Project Portfolio Management**: Add, edit, and delete project showcase images in PNG format with descriptions and metadata
- **Customer Inquiry Management**: Review and respond to customer inquiries from contact forms
- **Homepage Carousel Management**: Add, edit, delete, and reorder carousel slides with image upload, overlay text editing, and call-to-action button configuration
- **SEO Management Dashboard**: Edit meta tags, manage sitemap, view Google Search Console integration data, and access SEO recommendations
\n### 2.12 Projects Section Enhancement
- Display '100+ Successful Projects' headline with prominent visibility
- Interactive image gallery showcasing completed roofing projects
- Hover effects on project images: zoom-in animation (1.1x scale) with smooth transition
- Project images displayed in grid layout with overlay information on hover
- 'See more' button linking to full Projects page\n- Use Screenshot2025-11-21 085459.png as reference for project showcase styling

### 2.13 Homepage Carousel Feature
- **Carousel/Slider Component**: Auto-rotating image carousel positioned prominently on landing page below header navigation
- **Carousel Images**: Display multiple high-quality images showcasing roofing projects, products, and services
- **Auto-Play**: Automatic slide transition every 5-7 seconds with smooth fade or slide animation
- **Navigation Controls**: Left/right arrow buttons for manual slide navigation
- **Indicator Dots**: Bottom indicator dots showing current slide position and allowing direct slide selection
- **Pause on Hover**: Carousel pauses automatic rotation when user hovers over images
- **Responsive Design**: Carousel adapts to different screen sizes (full-width on desktop, optimized for mobile)
- **Optional Overlay Text**: Each slide can include overlay text with call-to-action buttons (e.g., 'View Products', 'Contact Us')
- **Touch/Swipe Support**: Mobile users can swipe left/right to navigate slides
- **Admin Editable**: Carousel content (images, overlay text, buttons, slide order) can be fully managed through Admin Dashboard

## 3. Product Categories\n- Roofing tiles and shingles
- Roofing membranes and underlayment
- Gutters and drainage systems
- Insulation materials
- Roofing tools and accessories
- Waterproofing solutions
\n## 4. Design Style\n\n### 4.1 Color Scheme
- Primary color: Deep teal blue (#2C5F7C) representing professionalism and trust
- Secondary color: Bright cyan (#7DD3E8) for modern appeal and interactive elements
- Accent color: Clean white (#FFFFFF) for contrast and clarity
- Razorpay brand color: Blue (#528FF0) for payment buttons and badges
- Reference image: Screenshot 2025-11-21 085459.png\n
### 4.2 Visual Details
- Smooth rounded corners (8px radius) for modern card-based layouts
- Subtle shadow effects (04px 12px rgba(0,0,0,0.1)) for depth and hierarchy
- Animated buttons with hover scale effects (1.05x zoom)\n- Project gallery images with hover zoom effect (1.1x scale) and overlay darkening
- Smooth page transitions and scroll animations
- Icon style: Line-based minimalist icons for navigation and features
- Logo integration: MainLogo.png displayed in header navigation
- Login and registration pages feature centered form cards with soft shadows and clean input fields
- Google sign in/up buttons styled with official Google brand colors (white background, blue Google logo, dark text)
- Razorpay payment button styled with Razorpay brand blue color and secure payment badge
- Currency selector styled as modern toggle switch or dropdown with flag icons
- Carousel transitions with smooth fade or slide effects (0.5s duration)
- Payment confirmation notifications styled with alert badge icons and highlighted background color
- Admin confirmation buttons styled with green accent color for approve action and red for reject action
\n### 4.3 Background Images
- **AI-Generated Background Images**: Use AI-generated background images throughout the website to create modern, professional, and visually appealing atmosphere
- **Homepage Hero Section**: AI-generated abstract gradient background with roofing-related geometric patterns, blending teal blue and cyan tones
- **Homepage Carousel**: High-quality images of completed roofing projects, product showcases, and service highlights
- **Login/Registration Pages**: Soft-focus AI-generated background featuring architectural elements and roofing textures with subtle overlay for form readability
- **Product Pages**: Clean AI-generated backgrounds with subtle texture patterns related to construction and roofing materials
- **About Us Page**: AI-generated background showcasing modern building silhouettes with sky gradient transitioning from deep blue to light cyan
- **Admin Dashboard**: Minimalist AI-generated geometric pattern background in muted teal tones for professional workspace feel
- **Background Style**: All AI-generated backgrounds should maintain consistent color palette (teal blue, cyan, white) and complement the overall design without overwhelming content

### 4.4 Layout Approach
- Grid-based product display with responsive card layouts
- Hero section on homepage with animated call-to-action buttons using HeroImage.jpg
- **Homepage carousel positioned below header navigation, spanning full viewport width**
- Projects section with grid-based image gallery (3-4 columns on desktop, responsive on mobile)
- Sticky navigation bar for easy access across pages with currency selector positioned in top-right corner
- Visual hierarchy emphasizing product images and key information
- User page organized in tabbed or sectioned layout: Profile, Cart, and Payment sections clearly separated
- Admin dashboard with sidebar navigation and main content area featuring data visualization charts, Razorpay transaction dashboard, payment confirmation queue, SEO management tools, and management tables
- Login and registration pages with centered vertical layout, form card positioned in middle of viewport with AI-generated background image
- Product list page with sidebar filters and main content area for product grid\n- Cart page with two-column layout: item list on left, order summary on right (stacked on mobile)
- Payment page with step-by-step form layout, progress indicator at top showing current step, Razorpay checkout modal integration, and prominent'I Have Made Payment' button for alternative payment methods

## 5. Technical SEO Implementation Checklist

### 5.1 On-Page SEO\n- [ ] Unique meta title and description for each page
- [ ] Proper heading hierarchy (H1, H2, H3)
- [ ] Alt text for all images
- [ ] Internal linking structure
- [ ] Mobile-responsive design
- [ ] Fast page load speed\n- [ ] HTTPS/SSL certificate
- [ ] Clean URL structure
\n### 5.2 Technical Setup
- [ ] robots.txt file configured and accessible
- [ ] XML sitemap generated and submitted
- [ ] Canonical URLs implemented
- [ ]404 error page customized
- [ ] 301 redirects for changed URLs
- [ ] Structured data (JSON-LD) implemented
\n### 5.3 Google Integration
- [ ] Google Search Console property verified
- [ ] Sitemap submitted to Search Console
- [ ] URL inspection and indexing requested
- [ ] Google Analytics 4 connected (optional)
- [ ] Google Business Profile created (optional)

### 5.4 Content Optimization
- [ ] Keyword research for target pages
- [ ] Unique content for each page (300+ words)
- [ ] Product descriptions optimized
- [ ] Blog/FAQ section for content marketing (optional)
\n## 6. Reference Images
- Screenshot 2025-11-21 085459.png\n- MainLogo.png
- HeroImage.jpg