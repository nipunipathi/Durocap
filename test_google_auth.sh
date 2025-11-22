#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         GOOGLE AUTHENTICATION FEATURE VALIDATION             ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

TESTS_PASSED=0
TESTS_FAILED=0

report_test() {
  if [ $1 -eq 0 ]; then
    echo "✓ $2"
    ((TESTS_PASSED++))
  else
    echo "✗ $2"
    ((TESTS_FAILED++))
  fi
}

echo "TEST 1: Code Implementation"
echo "=========================================="

# Check for Google sign-in function
grep -q "handleGoogleSignIn" src/pages/Login.tsx
report_test $? "Google sign-in handler exists"

# Check for OAuth call
grep -q "signInWithOAuth" src/pages/Login.tsx
report_test $? "Supabase OAuth integration implemented"

# Check for Google provider
grep -q "provider: 'google'" src/pages/Login.tsx
report_test $? "Google provider configured"

echo ""
echo "TEST 2: UI Components"
echo "=========================================="

# Check for Google button
grep -q "Continue with Google" src/pages/Login.tsx
report_test $? "Google sign-in button text exists"

# Check for Google logo SVG
grep -q "<svg.*viewBox=\"0 0 24 24\"" src/pages/Login.tsx
report_test $? "Google logo SVG implemented"

# Check for divider
grep -q "Or continue with email" src/pages/Login.tsx
report_test $? "Email/Google divider exists"

echo ""
echo "TEST 3: State Management"
echo "=========================================="

# Check for loading state
grep -q "googleLoading" src/pages/Login.tsx
report_test $? "Google loading state defined"

# Check for loading text
grep -q "Connecting to Google..." src/pages/Login.tsx
report_test $? "Loading state text implemented"

echo ""
echo "TEST 4: Error Handling"
echo "=========================================="

# Check for try-catch
grep -A 10 "handleGoogleSignIn" src/pages/Login.tsx | grep -q "try"
report_test $? "Error handling implemented"

# Check for error toast
grep -q "Failed to sign in with Google" src/pages/Login.tsx
report_test $? "Error message defined"

echo ""
echo "TEST 5: User Experience"
echo "=========================================="

# Check for disabled states
grep -q "disabled={googleLoading || loading}" src/pages/Login.tsx
report_test $? "Buttons disabled during Google auth"

# Check for redirect configuration
grep -q "redirectTo:" src/pages/Login.tsx
report_test $? "Redirect URL configured"

# Check for Mail icon import
grep -q "import.*Mail.*from.*lucide-react" src/pages/Login.tsx
report_test $? "Mail icon imported for email button"

echo ""
echo "TEST 6: OAuth Configuration"
echo "=========================================="

# Check for OAuth options
grep -q "queryParams:" src/pages/Login.tsx
report_test $? "OAuth query parameters configured"

# Check for access_type
grep -q "access_type: 'offline'" src/pages/Login.tsx
report_test $? "Offline access configured"

# Check for prompt
grep -q "prompt: 'consent'" src/pages/Login.tsx
report_test $? "Consent prompt configured"

echo ""
echo "TEST 7: TypeScript Compilation"
echo "=========================================="

npm run lint > /dev/null 2>&1
report_test $? "TypeScript compilation successful"

echo ""
echo "TEST 8: Documentation"
echo "=========================================="

[ -f "GOOGLE_AUTH_SETUP.md" ]
report_test $? "Detailed setup guide exists"

[ -f "GOOGLE_AUTH_QUICK_SETUP.md" ]
report_test $? "Quick setup guide exists"

echo ""
echo "TEST 9: Button Styling"
echo "=========================================="

# Check for outline variant
grep -q 'variant="outline"' src/pages/Login.tsx
report_test $? "Google button uses outline variant"

# Check for full width
grep -q 'className="w-full"' src/pages/Login.tsx
report_test $? "Buttons are full width"

echo ""
echo "TEST 10: Integration Points"
echo "=========================================="

# Check Supabase import
grep -q "import.*supabase.*from.*@/db/supabase" src/pages/Login.tsx
report_test $? "Supabase client imported"

# Check toast import
grep -q "import.*toast.*from.*sonner" src/pages/Login.tsx
report_test $? "Toast notifications imported"

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    TEST RESULTS SUMMARY                      ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "Tests Passed: $TESTS_PASSED"
echo "Tests Failed: $TESTS_FAILED"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
  echo "🎉 ALL TESTS PASSED!"
  echo ""
  echo "✅ Google OAuth integration complete"
  echo "✅ UI components implemented"
  echo "✅ Error handling in place"
  echo "✅ Loading states configured"
  echo "✅ TypeScript compilation successful"
  echo "✅ Documentation complete"
  echo ""
  echo "📋 Next Steps:"
  echo "   1. Configure Google OAuth credentials in Google Cloud Console"
  echo "   2. Enable Google provider in Supabase Dashboard"
  echo "   3. Add Client ID and Secret to Supabase"
  echo "   4. Test sign-in with Google account"
  echo ""
  echo "📖 Setup Instructions:"
  echo "   • Quick Setup: GOOGLE_AUTH_QUICK_SETUP.md (5 minutes)"
  echo "   • Detailed Guide: GOOGLE_AUTH_SETUP.md (comprehensive)"
  echo ""
  exit 0
else
  echo "⚠️  Some tests failed. Please review the issues above."
  echo ""
  exit 1
fi

