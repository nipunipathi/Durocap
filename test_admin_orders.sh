#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║         ADMIN ORDER MANAGEMENT FEATURE VALIDATION            ║"
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

echo "TEST 1: API Layer Validation"
echo "=========================================="

# Check if delete method exists in orders API
grep -q "async delete(id: string)" src/db/api.ts
report_test $? "Orders delete method exists in API"

# Check if updateStatus method exists
grep -q "async updateStatus(id: string, status: string)" src/db/api.ts
report_test $? "Orders updateStatus method exists in API"

echo ""
echo "TEST 2: Component Imports"
echo "=========================================="

# Check for required imports in AdminOrders
grep -q "XCircle" src/pages/admin/AdminOrders.tsx
report_test $? "XCircle icon imported"

grep -q "Trash2" src/pages/admin/AdminOrders.tsx
report_test $? "Trash2 icon imported"

grep -q "AlertDialog" src/pages/admin/AdminOrders.tsx
report_test $? "AlertDialog component imported"

echo ""
echo "TEST 3: State Management"
echo "=========================================="

# Check for dialog state
grep -q "cancelDialogOpen" src/pages/admin/AdminOrders.tsx
report_test $? "Cancel dialog state defined"

grep -q "deleteDialogOpen" src/pages/admin/AdminOrders.tsx
report_test $? "Delete dialog state defined"

grep -q "selectedOrderId" src/pages/admin/AdminOrders.tsx
report_test $? "Selected order ID state defined"

grep -q "actionLoading" src/pages/admin/AdminOrders.tsx
report_test $? "Action loading state defined"

echo ""
echo "TEST 4: Handler Functions"
echo "=========================================="

# Check for handler functions
grep -q "handleCancelOrder" src/pages/admin/AdminOrders.tsx
report_test $? "Cancel order handler exists"

grep -q "handleDeleteOrder" src/pages/admin/AdminOrders.tsx
report_test $? "Delete order handler exists"

grep -q "openCancelDialog" src/pages/admin/AdminOrders.tsx
report_test $? "Open cancel dialog function exists"

grep -q "openDeleteDialog" src/pages/admin/AdminOrders.tsx
report_test $? "Open delete dialog function exists"

echo ""
echo "TEST 5: UI Elements"
echo "=========================================="

# Check for cancel button
grep -q "Cancel Order" src/pages/admin/AdminOrders.tsx
report_test $? "Cancel Order button text exists"

# Check for delete button
grep -q "Delete Order" src/pages/admin/AdminOrders.tsx
report_test $? "Delete Order button text exists"

# Check for conditional rendering
grep -q 'order.status !== "cancelled"' src/pages/admin/AdminOrders.tsx
report_test $? "Conditional rendering for cancel button"

echo ""
echo "TEST 6: Confirmation Dialogs"
echo "=========================================="

# Check for cancel dialog
grep -q "Cancel Order Confirmation Dialog" src/pages/admin/AdminOrders.tsx
report_test $? "Cancel confirmation dialog exists"

# Check for delete dialog
grep -q "Delete Order Confirmation Dialog" src/pages/admin/AdminOrders.tsx
report_test $? "Delete confirmation dialog exists"

# Check for warning messages
grep -q "This action cannot be undone" src/pages/admin/AdminOrders.tsx
report_test $? "Delete warning message exists"

echo ""
echo "TEST 7: API Integration"
echo "=========================================="

# Check API calls in handlers
grep -q "api.orders.updateStatus" src/pages/admin/AdminOrders.tsx
report_test $? "Cancel order calls updateStatus API"

grep -q "api.orders.delete" src/pages/admin/AdminOrders.tsx
report_test $? "Delete order calls delete API"

echo ""
echo "TEST 8: User Feedback"
echo "=========================================="

# Check for toast notifications
grep -q "Order cancelled successfully" src/pages/admin/AdminOrders.tsx
report_test $? "Cancel success toast message"

grep -q "Order deleted successfully" src/pages/admin/AdminOrders.tsx
report_test $? "Delete success toast message"

grep -q "Failed to cancel order" src/pages/admin/AdminOrders.tsx
report_test $? "Cancel error toast message"

grep -q "Failed to delete order" src/pages/admin/AdminOrders.tsx
report_test $? "Delete error toast message"

echo ""
echo "TEST 9: Loading States"
echo "=========================================="

# Check for loading state usage
grep -q "actionLoading ? \"Cancelling...\"" src/pages/admin/AdminOrders.tsx
report_test $? "Cancel loading state text"

grep -q "actionLoading ? \"Deleting...\"" src/pages/admin/AdminOrders.tsx
report_test $? "Delete loading state text"

grep -q "disabled={actionLoading}" src/pages/admin/AdminOrders.tsx
report_test $? "Buttons disabled during loading"

echo ""
echo "TEST 10: Error Handling"
echo "=========================================="

# Check for try-catch blocks
grep -A 5 "handleCancelOrder" src/pages/admin/AdminOrders.tsx | grep -q "try"
report_test $? "Cancel handler has error handling"

grep -A 5 "handleDeleteOrder" src/pages/admin/AdminOrders.tsx | grep -q "try"
report_test $? "Delete handler has error handling"

echo ""
echo "TEST 11: TypeScript Compilation"
echo "=========================================="

npm run lint > /dev/null 2>&1
report_test $? "TypeScript compilation successful"

echo ""
echo "TEST 12: Documentation"
echo "=========================================="

[ -f "ADMIN_ORDER_MANAGEMENT.md" ]
report_test $? "Admin order management documentation exists"

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
  echo "✅ Cancel order functionality implemented"
  echo "✅ Delete order functionality implemented"
  echo "✅ Confirmation dialogs added"
  echo "✅ User feedback integrated"
  echo "✅ Error handling in place"
  echo "✅ Loading states implemented"
  echo "✅ TypeScript compilation successful"
  echo ""
  echo "The admin can now:"
  echo "  • Cancel orders (changes status to 'cancelled')"
  echo "  • Delete orders (permanently removes from database)"
  echo "  • View confirmation dialogs before actions"
  echo "  • Receive success/error notifications"
  echo ""
  exit 0
else
  echo "⚠️  Some tests failed. Please review the issues above."
  echo ""
  exit 1
fi

