#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         PRODUCTION DEPLOYMENT DIAGNOSTIC TOOL                ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

echo "🔍 Running Production Readiness Checks..."
echo ""

CHECKS_PASSED=0
CHECKS_FAILED=0
WARNINGS=0

report_check() {
  if [ $1 -eq 0 ]; then
    echo "✅ $2"
    ((CHECKS_PASSED++))
  else
    echo "❌ $2"
    ((CHECKS_FAILED++))
  fi
}

report_warning() {
  echo "⚠️  $1"
  ((WARNINGS++))
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. ENVIRONMENT CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check .env file exists
if [ -f ".env" ]; then
  report_check 0 ".env file exists"
  
  # Check required variables
  if grep -q "VITE_SUPABASE_URL" .env; then
    report_check 0 "VITE_SUPABASE_URL is set"
  else
    report_check 1 "VITE_SUPABASE_URL is missing"
  fi
  
  if grep -q "VITE_SUPABASE_ANON_KEY" .env; then
    report_check 0 "VITE_SUPABASE_ANON_KEY is set"
  else
    report_check 1 "VITE_SUPABASE_ANON_KEY is missing"
  fi
  
  if grep -q "VITE_APP_ID" .env; then
    report_check 0 "VITE_APP_ID is set"
  else
    report_check 1 "VITE_APP_ID is missing"
  fi
else
  report_check 1 ".env file not found"
  report_warning "Create .env file with required variables"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "2. DEPLOYMENT CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check deployment config files
if [ -f "vercel.json" ]; then
  report_check 0 "vercel.json exists (Vercel deployment ready)"
else
  report_warning "vercel.json not found (create if deploying to Vercel)"
fi

if [ -f "netlify.toml" ]; then
  report_check 0 "netlify.toml exists (Netlify deployment ready)"
else
  report_warning "netlify.toml not found (create if deploying to Netlify)"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "3. CODE QUALITY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Run lint check
echo "Running TypeScript compilation..."
npm run lint > /dev/null 2>&1
if [ $? -eq 0 ]; then
  report_check 0 "TypeScript compilation successful"
else
  report_check 1 "TypeScript compilation failed"
  report_warning "Fix TypeScript errors before deploying"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "4. FILE STRUCTURE"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Check critical files
[ -f "index.html" ] && report_check 0 "index.html exists" || report_check 1 "index.html missing"
[ -f "package.json" ] && report_check 0 "package.json exists" || report_check 1 "package.json missing"
[ -f "vite.config.ts" ] && report_check 0 "vite.config.ts exists" || report_check 1 "vite.config.ts missing"
[ -f "src/main.tsx" ] && report_check 0 "src/main.tsx exists" || report_check 1 "src/main.tsx missing"
[ -f "src/App.tsx" ] && report_check 0 "src/App.tsx exists" || report_check 1 "src/App.tsx missing"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "5. DATABASE CONFIGURATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

[ -f "src/db/supabase.ts" ] && report_check 0 "Supabase client configured" || report_check 1 "Supabase client missing"
[ -f "src/db/api.ts" ] && report_check 0 "API layer exists" || report_check 1 "API layer missing"

migration_count=$(ls -1 supabase/migrations/*.sql 2>/dev/null | wc -l)
if [ $migration_count -gt 0 ]; then
  report_check 0 "Database migrations exist ($migration_count files)"
else
  report_check 1 "No database migrations found"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "6. DOCUMENTATION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

[ -f "PRODUCTION_TROUBLESHOOTING.md" ] && report_check 0 "Troubleshooting guide exists" || report_warning "Troubleshooting guide missing"
[ -f "DEPLOYMENT_CHECKLIST.md" ] && report_check 0 "Deployment checklist exists" || report_warning "Deployment checklist missing"
[ -f "README.md" ] && report_check 0 "README exists" || report_warning "README missing"

echo ""
echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                    DIAGNOSTIC SUMMARY                        ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""
echo "✅ Checks Passed: $CHECKS_PASSED"
echo "❌ Checks Failed: $CHECKS_FAILED"
echo "⚠️  Warnings: $WARNINGS"
echo ""

if [ $CHECKS_FAILED -eq 0 ]; then
  echo "🎉 APPLICATION IS READY FOR PRODUCTION DEPLOYMENT!"
  echo ""
  echo "📋 Next Steps:"
  echo "   1. Review DEPLOYMENT_CHECKLIST.md"
  echo "   2. Set environment variables in hosting platform"
  echo "   3. Configure Supabase redirect URLs"
  echo "   4. Create admin user"
  echo "   5. Deploy to production"
  echo "   6. Test all functionality"
  echo ""
  echo "📖 Resources:"
  echo "   • DEPLOYMENT_CHECKLIST.md - Complete deployment guide"
  echo "   • PRODUCTION_TROUBLESHOOTING.md - Fix common issues"
  echo "   • DEPLOYMENT_GUIDE.md - Detailed instructions"
  echo ""
else
  echo "⚠️  ISSUES FOUND - FIX BEFORE DEPLOYING"
  echo ""
  echo "Please fix the failed checks above before deploying to production."
  echo ""
  echo "📖 For help, see:"
  echo "   • PRODUCTION_TROUBLESHOOTING.md"
  echo "   • DEPLOYMENT_CHECKLIST.md"
  echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

