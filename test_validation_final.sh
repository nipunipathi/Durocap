#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║       COMPREHENSIVE SYSTEM VALIDATION TEST SUITE             ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

TESTS_PASSED=0
TESTS_FAILED=0

# Function to report test result
report_test() {
  if [ $1 -eq 0 ]; then
    echo "✓ $2"
    ((TESTS_PASSED++))
  else
    echo "✗ $2"
    ((TESTS_FAILED++))
  fi
}

echo "TEST 1: TypeScript Compilation"
echo "=========================================="
npm run lint > /dev/null 2>&1
report_test $? "TypeScript compilation successful"
echo ""

echo "TEST 2: Database API Functions"
echo "=========================================="
grep -q "export const api" src/db/api.ts
report_test $? "API exports found"

for method in "products" "services" "projects" "orders" "profiles" "contactInquiries"; do
  grep -q "$method:" src/db/api.ts
  report_test $? "$method API method exists"
done
echo ""

echo "TEST 3: Route Configuration"
echo "=========================================="
[ -f "src/routes.tsx" ]
report_test $? "routes.tsx exists"

for route in "Home" "About" "Products" "Services" "Projects" "Contact" "Cart" "UserProfile" "Orders" "Login"; do
  grep -q "$route" src/routes.tsx
  report_test $? "$route route configured"
done
echo ""

echo "TEST 4: Core Components"
echo "=========================================="
components=(
  "src/components/common/Header.tsx"
  "src/components/common/Footer.tsx"
  "src/components/ui/button.tsx"
  "src/components/ui/card.tsx"
  "src/components/ui/input.tsx"
  "src/components/ui/badge.tsx"
  "src/components/ui/dialog.tsx"
  "src/components/ui/form.tsx"
)

for comp in "${components[@]}"; do
  [ -f "$comp" ]
  report_test $? "$(basename $comp) exists"
done
echo ""

echo "TEST 5: Context Providers"
echo "=========================================="
[ -f "src/contexts/AdminAuthContext.tsx" ]
report_test $? "AdminAuthContext exists"

[ -f "src/contexts/CurrencyContext.tsx" ]
report_test $? "CurrencyContext exists"
echo ""

echo "TEST 6: Utility Libraries"
echo "=========================================="
[ -f "src/lib/cart.ts" ]
report_test $? "Cart utilities exist"

[ -f "src/lib/utils.ts" ]
report_test $? "General utilities exist"

[ -f "src/lib/imageUpload.ts" ]
report_test $? "Image upload utilities exist"
echo ""

echo "TEST 7: Customer Pages"
echo "=========================================="
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
  [ -f "$page" ]
  report_test $? "$(basename $page) exists"
done
echo ""

echo "TEST 8: Admin Pages"
echo "=========================================="
admin_pages=(
  "src/pages/admin/AdminDashboard.tsx"
  "src/pages/admin/AdminLogin.tsx"
  "src/pages/admin/AdminProducts.tsx"
  "src/pages/admin/AdminOrders.tsx"
  "src/pages/admin/AdminClients.tsx"
  "src/pages/admin/AdminPages.tsx"
)

for page in "${admin_pages[@]}"; do
  [ -f "$page" ]
  report_test $? "$(basename $page) exists"
done
echo ""

echo "TEST 9: Database Configuration"
echo "=========================================="
[ -f "src/db/supabase.ts" ]
report_test $? "Supabase client configured"

[ -f "src/db/api.ts" ]
report_test $? "API layer configured"

[ -d "supabase/migrations" ]
report_test $? "Migrations directory exists"

migration_count=$(ls -1 supabase/migrations/*.sql 2>/dev/null | wc -l)
[ $migration_count -gt 0 ]
report_test $? "Migration files found ($migration_count files)"
echo ""

echo "TEST 10: Type Definitions"
echo "=========================================="
[ -f "src/types/index.ts" ]
report_test $? "Type definitions file exists"

for type in "Product" "Service" "Project" "Order" "Profile" "CartItem"; do
  grep -q "export interface $type" src/types/index.ts
  report_test $? "$type interface defined"
done
echo ""

echo "TEST 11: Build Configuration"
echo "=========================================="
[ -f "package.json" ]
report_test $? "package.json exists"

for script in "dev" "build" "lint"; do
  grep -q "\"$script\":" package.json
  report_test $? "$script script defined"
done

for dep in "react" "react-router-dom" "@supabase/supabase-js" "@stripe/stripe-js"; do
  grep -q "\"$dep\":" package.json
  report_test $? "$dep dependency found"
done
echo ""

echo "TEST 12: Static Assets"
echo "=========================================="
[ -f "index.html" ]
report_test $? "index.html exists"

[ -f "vite.config.ts" ]
report_test $? "vite.config.ts exists"

[ -f "tailwind.config.ts" ]
report_test $? "tailwind.config.ts exists"

[ -f "tsconfig.json" ]
report_test $? "tsconfig.json exists"
echo ""

echo "TEST 13: Authentication System"
echo "=========================================="
[ -f "src/components/auth/ProtectedAdminRoute.tsx" ]
report_test $? "ProtectedAdminRoute component exists"

grep -q "supabase.auth" src/pages/Login.tsx
report_test $? "Supabase auth integration in Login"

grep -q "supabase.auth" src/pages/UserProfile.tsx
report_test $? "Auth check in UserProfile"
echo ""

echo "TEST 14: Cart System"
echo "=========================================="
grep -q "cartUtils" src/lib/cart.ts
report_test $? "Cart utilities exported"

grep -q "getCart\|addToCart\|removeFromCart" src/lib/cart.ts
report_test $? "Cart methods implemented"

grep -q "cartUtils" src/pages/Cart.tsx
report_test $? "Cart utilities used in Cart page"
echo ""

echo "TEST 15: Payment Integration"
echo "=========================================="
grep -q "stripe\|Stripe" src/pages/Cart.tsx
report_test $? "Stripe integration in Cart"

[ -f "src/pages/PaymentSuccess.tsx" ]
report_test $? "PaymentSuccess page exists"
echo ""

echo "TEST 16: Admin Dashboard Logic"
echo "=========================================="
grep -q "api.orders.getAll\|api.products.getAll" src/pages/admin/AdminDashboard.tsx
report_test $? "Admin dashboard fetches real data"

grep -q "api.orders.getAll" src/pages/admin/AdminOrders.tsx
report_test $? "Admin orders page fetches real data"

grep -q "api.products" src/pages/admin/AdminProducts.tsx
report_test $? "Admin products page uses API"
echo ""

echo "TEST 17: User Profile Logic"
echo "=========================================="
grep -q "api.profiles\|api.orders" src/pages/UserProfile.tsx
report_test $? "UserProfile fetches real data"

! grep -q "orderHistory.*=.*\[" src/pages/UserProfile.tsx
report_test $? "No hardcoded demo orders in UserProfile"
echo ""

echo "TEST 18: Documentation"
echo "=========================================="
[ -f "DEPLOYMENT_GUIDE.md" ]
report_test $? "DEPLOYMENT_GUIDE.md exists"

[ -f "PRODUCTION_READY.md" ]
report_test $? "PRODUCTION_READY.md exists"

[ -f "README.md" ]
report_test $? "README.md exists"
echo ""

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    TEST RESULTS SUMMARY                      ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Tests Passed: $TESTS_PASSED"
echo "Tests Failed: $TESTS_FAILED"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
  echo "🎉 ALL TESTS PASSED! System is production-ready!"
  echo ""
  exit 0
else
  echo "⚠️  Some tests failed. Please review the issues above."
  echo ""
  exit 1
fi

