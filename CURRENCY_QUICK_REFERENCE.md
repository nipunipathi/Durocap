# 💱 Currency System - Quick Reference Card

## 🚀 Add a New Currency (5 Steps)

### 1. Add Currency Code
```typescript
// src/config/currencies.ts
export type CurrencyCode = "USD" | "INR" | "EUR" | "GBP" | "YOUR_CURRENCY";
```

### 2. Add Configuration
```typescript
// src/config/currencies.ts
export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  YOUR_CURRENCY: {
    code: "YOUR_CURRENCY",
    name: "Currency Name",
    symbol: "¤",
    locale: "en-US",
    decimalPlaces: 2,
    symbolPosition: "before",
  },
};
```

### 3. Add Exchange Rate
```typescript
// src/config/currencies.ts
export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  YOUR_CURRENCY: 1.5,  // 1 USD = 1.5 YOUR_CURRENCY
};
```

### 4. Enable Currency
```typescript
// src/config/currencies.ts
export const ACTIVE_CURRENCIES: CurrencyCode[] = ["USD", "INR", "YOUR_CURRENCY"];
```

### 5. Done! 🎉
The currency is now available throughout the app.

---

## 📦 Common Functions

### Convert Price
```typescript
import { convertPrice } from "@/lib/currency";

convertPrice(100, "INR");  // 8300
```

### Format Price
```typescript
import { formatPrice } from "@/lib/currency";

formatPrice(100, "USD");  // "$100.00"
formatPrice(8300, "INR");  // "₹8,300.00"
```

### Convert & Format
```typescript
import { convertAndFormat } from "@/lib/currency";

convertAndFormat(100, "INR");  // "₹8,300.00"
```

### Get Currency Info
```typescript
import { getCurrencySymbol, getCurrencyName } from "@/lib/currency";

getCurrencySymbol("USD");  // "$"
getCurrencyName("USD");    // "US Dollar"
```

---

## ⚛️ React Hook

### Use Currency Context
```typescript
import { useCurrency } from "@/contexts/CurrencyContext";

function MyComponent() {
  const {
    currency,              // Current currency code
    setCurrency,           // Change currency
    formatPrice,           // Format price in current currency
    convertPrice,          // Convert price to current currency
    currencyConfig,        // Current currency configuration
    availableCurrencies,   // List of available currencies
  } = useCurrency();
  
  return <div>{formatPrice(100)}</div>;
}
```

---

## 🎨 UI Components

### Currency Switcher
```typescript
import CurrencySwitcher from "@/components/common/CurrencySwitcher";

<CurrencySwitcher />
```

**Behavior**:
- 2 currencies → Toggle button
- 3+ currencies → Dropdown menu

---

## 🔧 Configuration Files

### Currency Config
**File**: `src/config/currencies.ts`
- Currency definitions
- Exchange rates
- Active currencies

### Utility Functions
**File**: `src/lib/currency.ts`
- Conversion functions
- Formatting functions
- Validation functions

### React Context
**File**: `src/contexts/CurrencyContext.tsx`
- Global state management
- localStorage persistence

### UI Component
**File**: `src/components/common/CurrencySwitcher.tsx`
- Currency selection interface

---

## 📊 Exchange Rates

### Update Static Rates
```typescript
// src/config/currencies.ts
export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  INR: 83,    // ← Change this
  EUR: 0.92,  // ← Change this
};
```

### Use Live Rates
```typescript
// src/config/currencies.ts
// Uncomment fetchExchangeRates() function
// Call it in your app initialization
```

---

## ✅ Best Practices

### 1. Store Prices in USD
```typescript
// ✅ Good
const product = { price: 100 };  // USD

// ❌ Bad
const product = { price: 8300 };  // INR
```

### 2. Convert for Display Only
```typescript
// ✅ Good
const { formatPrice } = useCurrency();
<div>{formatPrice(product.price)}</div>

// ❌ Bad
product.price = convertPrice(product.price);
```

### 3. Use Type-Safe Codes
```typescript
// ✅ Good
import type { CurrencyCode } from "@/config/currencies";
const currency: CurrencyCode = "USD";

// ❌ Bad
const currency: string = "USD";
```

---

## 🐛 Troubleshooting

### Currency not updating?
→ Ensure `CurrencyProvider` wraps your app

### TypeScript errors?
→ Import `CurrencyCode` type from `@/config/currencies`

### Preference not saving?
→ Check localStorage is enabled in browser

### Wrong exchange rate?
→ Update `EXCHANGE_RATES` in `src/config/currencies.ts`

---

## 📚 Full Documentation

- **User Guide**: `CURRENCY_USER_GUIDE.md`
- **Feature Docs**: `CURRENCY_FEATURE.md`
- **Reusable Guide**: `CURRENCY_REUSABLE_GUIDE.md`
- **Implementation**: `CURRENCY_IMPLEMENTATION_SUMMARY.md`

---

## 🎯 Common Use Cases

### Display Product Price
```typescript
function ProductCard({ product }) {
  const { formatPrice } = useCurrency();
  return <div>{formatPrice(product.price)}</div>;
}
```

### Show Price Range
```typescript
import { formatPriceRange } from "@/lib/currency";

formatPriceRange(100, 200, "USD");  // "$100.00 - $200.00"
```

### Validate Price Input
```typescript
import { isValidPrice } from "@/lib/currency";

if (!isValidPrice(price)) {
  toast.error("Invalid price");
}
```

### Calculate Discount
```typescript
const { formatPrice } = useCurrency();
const originalPrice = 100;
const discountedPrice = 80;

<div>
  <span className="line-through">{formatPrice(originalPrice)}</span>
  <span>{formatPrice(discountedPrice)}</span>
</div>
```

---

## 🔄 Migration Checklist

- [ ] Copy `src/config/currencies.ts`
- [ ] Copy `src/lib/currency.ts`
- [ ] Copy `src/contexts/CurrencyContext.tsx`
- [ ] Copy `src/components/common/CurrencySwitcher.tsx`
- [ ] Wrap app with `<CurrencyProvider>`
- [ ] Replace old currency logic with `useCurrency()` hook
- [ ] Test currency switching
- [ ] Verify localStorage persistence

---

**Version**: 2.0.0  
**Last Updated**: 2025-11-21  
**Status**: ✅ Production Ready
