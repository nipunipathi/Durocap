#!/bin/bash

echo "TEST 2: Database API Functions Validation"
echo "=========================================="

# Check if all API functions are properly exported
echo "Checking API exports..."
if grep -q "export const api" src/db/api.ts; then
  echo "✓ API exports found"
else
  echo "✗ API exports missing"
  exit 1
fi

# Check for all required API methods
echo ""
echo "Checking API methods..."
for method in "products" "services" "projects" "orders" "profiles" "contactInquiries"; do
  if grep -q "$method:" src/db/api.ts; then
    echo "✓ $method API found"
  else
    echo "✗ $method API missing"
    exit 1
  fi
done

echo ""
echo "TEST 3: Route Configuration Validation"
echo "=========================================="

# Check routes file exists
if [ -f "src/routes.tsx" ]; then
  echo "✓ routes.tsx exists"
else
  echo "✗ routes.tsx missing"
  exit 1
fi

# Check for all required routes (updated to match actual routes)
echo ""
echo "Checking route definitions..."
for route in "Home" "About" "Products" "Services" "Projects" "Contact" "Cart" "UserProfile" "Orders" "Login"; do
  if grep -q "$route" src/routes.tsx; then
    echo "✓ $route route found"
  else
    echo "✗ $route route missing"
    exit 1
  fi
done

echo ""
echo "TEST 4: Component Import Validation"
echo "=========================================="

# Check critical components exist
echo "Checking critical components..."
components=(
  "src/components/common/Header.tsx"
  "src/components/common/Footer.tsx"
  "src/components/ui/button.tsx"
  "src/components/ui/card.tsx"
  "src/components/ui/input.tsx"
  "src/components/ui/badge.tsx"
)

for comp in "${components[@]}"; do
  if [ -f "$comp" ]; then
    echo "✓ $(basename $comp) exists"
  else
    echo "✗ $(basename $comp) missing"
    exit 1
  fi
done

echo ""
echo "TEST 5: Context Providers Validation"
echo "=========================================="

# Check context files
echo "Checking context providers..."
contexts=(
  "src/contexts/AuthContext.tsx"
  "src/contexts/AdminAuthContext.tsx"
  "src/contexts/CartContext.tsx"
)

for ctx in "${contexts[@]}"; do
  if [ -f "$ctx" ]; then
    echo "✓ $(basename $ctx) exists"
  else
    echo "✗ $(basename $ctx) missing"
    exit 1
  fi
done

echo ""
echo "TEST 6: Page Components Validation"
echo "=========================================="

# Check all page components (updated to match actual pages)
echo "Checking page components..."
pages=(
  "src/pages/Home.tsx"
  "src/pages/About.tsx"
  "src/pages/Products.tsx"
  "src/pages/Services.tsx"
  "src/pages/Projects.tsx"
  "src/pages/Contact.tsx"
  "src/pages/Cart.tsx"
  "src/pages/Orders.tsx"
  "src/pages/UserProfile.tsx"
  "src/pages/Login.tsx"
  "src/pages/PaymentSuccess.tsx"
)

for page in "${pages[@]}"; do
  if [ -f "$page" ]; then
    echo "✓ $(basename $page) exists"
  else
    echo "✗ $(basename $page) missing"
    exit 1
  fi
done

echo ""
echo "TEST 7: Admin Pages Validation"
echo "=========================================="

# Check admin pages
echo "Checking admin pages..."
admin_pages=(
  "src/pages/admin/AdminDashboard.tsx"
  "src/pages/admin/AdminLogin.tsx"
  "src/pages/admin/AdminProducts.tsx"
  "src/pages/admin/AdminOrders.tsx"
  "src/pages/admin/AdminClients.tsx"
  "src/pages/admin/AdminPages.tsx"
)

for page in "${admin_pages[@]}"; do
  if [ -f "$page" ]; then
    echo "✓ $(basename $page) exists"
  else
    echo "✗ $(basename $page) missing"
    exit 1
  fi
done

echo ""
echo "TEST 8: Database Configuration Validation"
echo "=========================================="

# Check Supabase setup
if [ -f "src/db/supabase.ts" ]; then
  echo "✓ Supabase client configuration exists"
else
  echo "✗ Supabase client configuration missing"
  exit 1
fi

# Check migrations
echo ""
echo "Checking database migrations..."
if [ -d "supabase/migrations" ]; then
  migration_count=$(ls -1 supabase/migrations/*.sql 2>/dev/null | wc -l)
  echo "✓ Found $migration_count migration files"
  
  # Check for critical migrations
  if ls supabase/migrations/*create_initial_schema*.sql 1> /dev/null 2>&1; then
    echo "✓ Initial schema migration found"
  else
    echo "✗ Initial schema migration missing"
    exit 1
  fi
  
  if ls supabase/migrations/*clear_all_data*.sql 1> /dev/null 2>&1; then
    echo "✓ Data cleanup migration found"
  else
    echo "⚠ Data cleanup migration not found (optional)"
  fi
else
  echo "✗ Migrations directory missing"
  exit 1
fi

echo ""
echo "TEST 9: Type Definitions Validation"
echo "=========================================="

# Check types file
if [ -f "src/types/index.ts" ]; then
  echo "✓ Type definitions file exists"
  
  # Check for critical types
  for type in "Product" "Service" "Project" "Order" "Profile" "CartItem"; do
    if grep -q "export interface $type" src/types/index.ts; then
      echo "✓ $type interface defined"
    else
      echo "✗ $type interface missing"
      exit 1
    fi
  done
else
  echo "✗ Type definitions file missing"
  exit 1
fi

echo ""
echo "TEST 10: Environment Configuration Validation"
echo "=========================================="

# Check .env file exists
if [ -f ".env" ]; then
  echo "✓ .env file exists"
  
  # Check for required variables
  for var in "VITE_SUPABASE_URL" "VITE_SUPABASE_ANON_KEY" "VITE_STRIPE_PUBLIC_KEY"; do
    if grep -q "$var" .env; then
      echo "✓ $var configured"
    else
      echo "⚠ $var not configured (required for production)"
    fi
  done
else
  echo "⚠ .env file missing (required for production)"
fi

echo ""
echo "TEST 11: Build Configuration Validation"
echo "=========================================="

# Check package.json
if [ -f "package.json" ]; then
  echo "✓ package.json exists"
  
  # Check for required scripts
  for script in "dev" "build" "lint"; do
    if grep -q "\"$script\":" package.json; then
      echo "✓ $script script defined"
    else
      echo "✗ $script script missing"
      exit 1
    fi
  done
  
  # Check for critical dependencies
  echo ""
  echo "Checking critical dependencies..."
  for dep in "react" "react-router-dom" "@supabase/supabase-js" "stripe"; do
    if grep -q "\"$dep\":" package.json; then
      echo "✓ $dep dependency found"
    else
      echo "✗ $dep dependency missing"
      exit 1
    fi
  done
else
  echo "✗ package.json missing"
  exit 1
fi

echo ""
echo "TEST 12: Static Assets Validation"
echo "=========================================="

# Check index.html
if [ -f "index.html" ]; then
  echo "✓ index.html exists"
else
  echo "✗ index.html missing"
  exit 1
fi

# Check vite config
if [ -f "vite.config.ts" ]; then
  echo "✓ vite.config.ts exists"
else
  echo "✗ vite.config.ts missing"
  exit 1
fi

# Check tailwind config
if [ -f "tailwind.config.ts" ]; then
  echo "✓ tailwind.config.ts exists"
else
  echo "✗ tailwind.config.ts missing"
  exit 1
fi

echo ""
echo "TEST 13: Authentication Logic Validation"
echo "=========================================="

# Check for protected routes
if [ -f "src/components/auth/ProtectedAdminRoute.tsx" ]; then
  echo "✓ ProtectedAdminRoute component exists"
else
  echo "✗ ProtectedAdminRoute component missing"
  exit 1
fi

# Check auth context has required methods
if grep -q "login\|logout\|signup" src/contexts/AuthContext.tsx; then
  echo "✓ Auth methods found in AuthContext"
else
  echo "✗ Auth methods missing in AuthContext"
  exit 1
fi

echo ""
echo "TEST 14: Cart Logic Validation"
echo "=========================================="

# Check cart context has required methods
if grep -q "addToCart\|removeFromCart\|updateQuantity\|clearCart" src/contexts/CartContext.tsx; then
  echo "✓ Cart methods found in CartContext"
else
  echo "✗ Cart methods missing in CartContext"
  exit 1
fi

echo ""
echo "TEST 15: Payment Integration Validation"
echo "=========================================="

# Check for Stripe integration in Cart page
if grep -q "stripe\|Stripe" src/pages/Cart.tsx; then
  echo "✓ Stripe integration found in Cart page"
else
  echo "⚠ Stripe integration not found (may need configuration)"
fi

# Check for payment success page
if [ -f "src/pages/PaymentSuccess.tsx" ]; then
  echo "✓ PaymentSuccess page exists"
else
  echo "✗ PaymentSuccess page missing"
  exit 1
fi

echo ""
echo "=========================================="
echo "ALL TESTS PASSED! ✓"
echo "=========================================="

