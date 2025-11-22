# 🔄 Reusable Currency System - Developer Guide

## Overview

The currency system has been refactored into a **modular, configuration-based architecture** that is:
- ✅ **Easily extensible** - Add new currencies in minutes
- ✅ **Highly reusable** - Use in any React project
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Well-documented** - Comprehensive JSDoc comments
- ✅ **Flexible** - Support for 2+ currencies with automatic UI adaptation

---

## Architecture

### File Structure

```
src/
├── config/
│   └── currencies.ts          # Currency configuration and exchange rates
├── lib/
│   └── currency.ts            # Reusable utility functions
├── contexts/
│   └── CurrencyContext.tsx    # React Context for state management
└── components/
    └── common/
        └── CurrencySwitcher.tsx  # UI component for currency selection
```

### Separation of Concerns

1. **Configuration** (`config/currencies.ts`)
   - Currency definitions
   - Exchange rates
   - Active currencies list
   - Base and default currency settings

2. **Business Logic** (`lib/currency.ts`)
   - Conversion functions
   - Formatting functions
   - Validation functions
   - Utility functions

3. **State Management** (`contexts/CurrencyContext.tsx`)
   - Global currency state
   - localStorage persistence
   - React hooks integration

4. **UI Components** (`components/common/CurrencySwitcher.tsx`)
   - Currency selection interface
   - Automatic toggle/dropdown switching
   - Responsive design

---

## Quick Start

### 1. Add a New Currency

**Step 1**: Update the currency type in `src/config/currencies.ts`:

```typescript
export type CurrencyCode = "USD" | "INR" | "EUR" | "GBP" | "AUD" | "CAD" | "JPY";
//                                                                          ^^^^^ Add here
```

**Step 2**: Add currency configuration:

```typescript
export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  // ... existing currencies
  JPY: {
    code: "JPY",
    name: "Japanese Yen",
    symbol: "¥",
    locale: "ja-JP",
    decimalPlaces: 0,  // Yen doesn't use decimal places
    symbolPosition: "before",
  },
};
```

**Step 3**: Add exchange rate:

```typescript
export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  // ... existing rates
  JPY: 149.50,  // 1 USD = 149.50 JPY
};
```

**Step 4**: Enable the currency:

```typescript
export const ACTIVE_CURRENCIES: CurrencyCode[] = ["USD", "INR", "JPY"];
//                                                              ^^^^^ Add here
```

**That's it!** The currency is now available throughout the application.

---

## Configuration Guide

### Currency Configuration Object

```typescript
interface CurrencyConfig {
  code: CurrencyCode;           // ISO currency code (e.g., "USD")
  name: string;                 // Full name (e.g., "US Dollar")
  symbol: string;               // Currency symbol (e.g., "$")
  locale: string;               // Locale for formatting (e.g., "en-US")
  decimalPlaces: number;        // Number of decimal places (usually 2)
  symbolPosition: "before" | "after";  // Symbol position
}
```

### Exchange Rates

All exchange rates are **relative to USD** (base currency):

```typescript
export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  USD: 1,      // Base currency
  INR: 83,     // 1 USD = 83 INR
  EUR: 0.92,   // 1 USD = 0.92 EUR
  GBP: 0.79,   // 1 USD = 0.79 GBP
};
```

### Active Currencies

Control which currencies are available to users:

```typescript
// Show only USD and INR
export const ACTIVE_CURRENCIES: CurrencyCode[] = ["USD", "INR"];

// Show all currencies
export const ACTIVE_CURRENCIES: CurrencyCode[] = ["USD", "INR", "EUR", "GBP", "AUD", "CAD"];
```

---

## Utility Functions

### Price Conversion

```typescript
import { convertPrice, convertBetweenCurrencies } from "@/lib/currency";

// Convert from base currency (USD) to target currency
const priceInINR = convertPrice(100, "INR");  // 8300

// Convert between any two currencies
const priceInEUR = convertBetweenCurrencies(100, "INR", "EUR");
// 100 INR → 1.20 USD → 1.11 EUR
```

### Price Formatting

```typescript
import { formatPrice, convertAndFormat } from "@/lib/currency";

// Format a price in a specific currency
formatPrice(1234.56, "USD");  // "$1,234.56"
formatPrice(1234.56, "INR");  // "₹1,234.56"

// Format with options
formatPrice(1234.56, "USD", { showCode: true });     // "$1,234.56 USD"
formatPrice(1234.56, "USD", { useLocale: true });    // "$1,234.56" (locale-aware)
formatPrice(1500000, "USD", { compact: true });      // "$1.50M"

// Convert and format in one step
convertAndFormat(100, "INR");  // "₹8,300.00"
```

### Price Validation

```typescript
import { isValidPrice, roundPrice } from "@/lib/currency";

// Validate price
isValidPrice(100);    // true
isValidPrice(-10);    // false
isValidPrice(NaN);    // false

// Round to currency's decimal places
roundPrice(123.456, "USD");  // 123.46
roundPrice(123.456, "JPY");  // 123 (no decimals for JPY)
```

### Currency Information

```typescript
import { getCurrencySymbol, getCurrencyName, getExchangeRate } from "@/lib/currency";

getCurrencySymbol("USD");    // "$"
getCurrencyName("USD");      // "US Dollar"
getExchangeRate("INR");      // 83
```

### Price Ranges

```typescript
import { formatPriceRange, calculatePriceDifference } from "@/lib/currency";

// Format price range
formatPriceRange(100, 200, "USD");  // "$100.00 - $200.00"

// Calculate percentage difference
calculatePriceDifference(100, 120);  // 20 (20% increase)
```

---

## React Integration

### Using the Currency Context

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";

function ProductCard({ product }) {
  const { formatPrice, currency, setCurrency } = useCurrency();
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{formatPrice(product.price)}</p>
      <p>Current currency: {currency}</p>
    </div>
  );
}
```

### Available Context Values

```typescript
interface CurrencyContextType {
  // Current currency
  currency: CurrencyCode;
  
  // Change currency
  setCurrency: (currency: CurrencyCode) => void;
  
  // Current currency configuration
  currencyConfig: CurrencyConfig;
  
  // List of available currencies
  availableCurrencies: CurrencyConfig[];
  
  // Convert price from USD to current currency
  convertPrice: (price: number) => number;
  
  // Format price in current currency
  formatPrice: (price: number, options?: FormatOptions) => string;
  
  // Get current currency symbol
  getCurrencySymbol: () => string;
  
  // Get current currency name
  getCurrencyName: () => string;
  
  // Get current exchange rate
  getExchangeRate: () => number;
}
```

---

## UI Components

### Currency Switcher

The `CurrencySwitcher` component automatically adapts based on the number of active currencies:

**2 Currencies**: Shows a toggle button
```
[💵 USD] ← Click to switch to INR
```

**3+ Currencies**: Shows a dropdown menu
```
[💵 USD ▼]
  ├─ US Dollar ($)
  ├─ Indian Rupee (₹)
  ├─ Euro (€)
  └─ British Pound (£)
```

### Custom Currency Selector

Create your own currency selector:

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";

function CustomCurrencySelector() {
  const { currency, setCurrency, availableCurrencies } = useCurrency();
  
  return (
    <select value={currency} onChange={(e) => setCurrency(e.target.value as CurrencyCode)}>
      {availableCurrencies.map((curr) => (
        <option key={curr.code} value={curr.code}>
          {curr.symbol} {curr.name}
        </option>
      ))}
    </select>
  );
}
```

---

## Advanced Features

### Live Exchange Rates

To fetch live exchange rates from an API:

**Step 1**: Uncomment the API code in `src/config/currencies.ts`:

```typescript
export async function fetchExchangeRates(): Promise<Record<CurrencyCode, number>> {
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    
    return {
      USD: 1,
      INR: data.rates.INR || EXCHANGE_RATES.INR,
      EUR: data.rates.EUR || EXCHANGE_RATES.EUR,
      // ... other currencies
    };
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return EXCHANGE_RATES;  // Fallback to static rates
  }
}
```

**Step 2**: Call the function in your app initialization:

```typescript
import { fetchExchangeRates } from "@/config/currencies";

useEffect(() => {
  // Fetch rates on app load
  fetchExchangeRates().then((rates) => {
    // Update rates in context or state
    console.log("Updated exchange rates:", rates);
  });
  
  // Optionally, refresh rates periodically
  const interval = setInterval(() => {
    fetchExchangeRates();
  }, 3600000);  // Every hour
  
  return () => clearInterval(interval);
}, []);
```

### Auto-Detect User Currency

Detect user's currency based on location:

```typescript
async function detectUserCurrency(): Promise<CurrencyCode> {
  try {
    // Option 1: Use IP geolocation API
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    const currencyCode = data.currency as CurrencyCode;
    
    // Validate currency is active
    if (isCurrencyActive(currencyCode)) {
      return currencyCode;
    }
  } catch (error) {
    console.error('Failed to detect currency:', error);
  }
  
  // Option 2: Use browser locale
  const locale = navigator.language;
  const currencyMap: Record<string, CurrencyCode> = {
    'en-US': 'USD',
    'en-IN': 'INR',
    'en-GB': 'GBP',
    'de-DE': 'EUR',
    // ... add more mappings
  };
  
  return currencyMap[locale] || DEFAULT_CURRENCY;
}

// Use in CurrencyProvider initialization
const [currency, setCurrency] = useState<CurrencyCode>(() => {
  const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode;
  if (saved && isCurrencyActive(saved)) {
    return saved;
  }
  
  // Auto-detect on first visit
  detectUserCurrency().then(setCurrency);
  return DEFAULT_CURRENCY;
});
```

### Multi-Currency Pricing

Store prices in multiple currencies:

```typescript
interface Product {
  id: string;
  name: string;
  prices: Record<CurrencyCode, number>;  // Store multiple prices
}

// Display price in user's currency
function ProductPrice({ product }: { product: Product }) {
  const { currency } = useCurrency();
  const price = product.prices[currency] || product.prices.USD;
  
  return <span>{formatPrice(price, currency)}</span>;
}
```

---

## Testing

### Unit Tests

```typescript
import { convertPrice, formatPrice, isValidPrice } from "@/lib/currency";

describe("Currency Utilities", () => {
  test("converts USD to INR", () => {
    expect(convertPrice(100, "INR")).toBe(8300);
  });
  
  test("formats price with symbol", () => {
    expect(formatPrice(100, "USD")).toBe("$100.00");
    expect(formatPrice(8300, "INR")).toBe("₹8,300.00");
  });
  
  test("validates prices", () => {
    expect(isValidPrice(100)).toBe(true);
    expect(isValidPrice(-10)).toBe(false);
    expect(isValidPrice(NaN)).toBe(false);
  });
});
```

### Integration Tests

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import ProductCard from "@/components/cards/ProductCard";

test("currency switcher changes prices", () => {
  render(
    <CurrencyProvider>
      <CurrencySwitcher />
      <ProductCard product={{ name: "Test", price: 100 }} />
    </CurrencyProvider>
  );
  
  // Initial price in USD
  expect(screen.getByText("$100.00")).toBeInTheDocument();
  
  // Switch to INR
  fireEvent.click(screen.getByText("USD"));
  
  // Price should update
  expect(screen.getByText("₹8,300.00")).toBeInTheDocument();
});
```

---

## Migration Guide

### From Old System to New System

**Old Code**:
```typescript
const { currency, formatPrice } = useCurrency();
```

**New Code** (same API, more features):
```typescript
const { currency, formatPrice, currencyConfig, availableCurrencies } = useCurrency();
```

**No breaking changes!** The new system is backward compatible.

### Adding to Existing Project

1. **Copy files**:
   - `src/config/currencies.ts`
   - `src/lib/currency.ts`
   - `src/contexts/CurrencyContext.tsx`
   - `src/components/common/CurrencySwitcher.tsx`

2. **Install dependencies** (if not already installed):
   ```bash
   npm install lucide-react
   ```

3. **Wrap your app** with `CurrencyProvider`:
   ```typescript
   import { CurrencyProvider } from "@/contexts/CurrencyContext";
   
   function App() {
     return (
       <CurrencyProvider>
         {/* Your app */}
       </CurrencyProvider>
     );
   }
   ```

4. **Use the hook** in your components:
   ```typescript
   import { useCurrency } from "@/contexts/CurrencyContext";
   
   function MyComponent() {
     const { formatPrice } = useCurrency();
     return <div>{formatPrice(100)}</div>;
   }
   ```

---

## Best Practices

### 1. Always Store Prices in Base Currency

```typescript
// ✅ Good: Store in USD (base currency)
const product = {
  name: "Product",
  price: 100,  // USD
};

// ❌ Bad: Store in user's currency
const product = {
  name: "Product",
  price: 8300,  // INR - hard to convert later
};
```

### 2. Convert Only for Display

```typescript
// ✅ Good: Convert when displaying
function ProductCard({ product }) {
  const { formatPrice } = useCurrency();
  return <div>{formatPrice(product.price)}</div>;
}

// ❌ Bad: Convert and store
function ProductCard({ product }) {
  const { convertPrice } = useCurrency();
  const convertedPrice = convertPrice(product.price);
  product.price = convertedPrice;  // Don't mutate!
  return <div>{convertedPrice}</div>;
}
```

### 3. Use Type-Safe Currency Codes

```typescript
// ✅ Good: Use CurrencyCode type
import type { CurrencyCode } from "@/config/currencies";

function setUserCurrency(code: CurrencyCode) {
  // TypeScript ensures code is valid
}

// ❌ Bad: Use string
function setUserCurrency(code: string) {
  // No type safety
}
```

### 4. Validate User Input

```typescript
import { isValidPrice } from "@/lib/currency";

function handlePriceInput(value: string) {
  const price = parseFloat(value);
  
  if (!isValidPrice(price)) {
    toast.error("Invalid price");
    return;
  }
  
  // Process valid price
}
```

### 5. Handle Edge Cases

```typescript
import { formatPrice } from "@/lib/currency";

function ProductPrice({ price }: { price: number | null | undefined }) {
  const { currency } = useCurrency();
  
  // Handle null/undefined
  if (price == null) {
    return <span>Price not available</span>;
  }
  
  // Handle invalid prices
  if (!isValidPrice(price)) {
    return <span>Invalid price</span>;
  }
  
  return <span>{formatPrice(price, currency)}</span>;
}
```

---

## Performance Optimization

### 1. Memoize Expensive Calculations

```typescript
import { useMemo } from "react";
import { convertPrice } from "@/lib/currency";

function ProductList({ products }) {
  const { currency } = useCurrency();
  
  const convertedPrices = useMemo(() => {
    return products.map(p => convertPrice(p.price, currency));
  }, [products, currency]);
  
  // Use convertedPrices
}
```

### 2. Batch Currency Updates

```typescript
// ✅ Good: Update once
function updateMultiplePrices(products: Product[]) {
  const { currency } = useCurrency();
  return products.map(p => ({
    ...p,
    displayPrice: formatPrice(p.price, currency),
  }));
}

// ❌ Bad: Update in loop
function updateMultiplePrices(products: Product[]) {
  return products.map(p => {
    const { formatPrice } = useCurrency();  // Called multiple times!
    return { ...p, displayPrice: formatPrice(p.price) };
  });
}
```

### 3. Lazy Load Exchange Rates

```typescript
// Load rates only when needed
const [rates, setRates] = useState<Record<CurrencyCode, number> | null>(null);

useEffect(() => {
  if (!rates) {
    fetchExchangeRates().then(setRates);
  }
}, [rates]);
```

---

## Troubleshooting

### Issue: Currency not updating

**Solution**: Ensure `CurrencyProvider` wraps your component:
```typescript
// ✅ Correct
<CurrencyProvider>
  <MyComponent />
</CurrencyProvider>

// ❌ Wrong
<MyComponent />  // No provider!
```

### Issue: TypeScript errors with currency codes

**Solution**: Import and use the `CurrencyCode` type:
```typescript
import type { CurrencyCode } from "@/config/currencies";

const currency: CurrencyCode = "USD";  // Type-safe
```

### Issue: Exchange rates not updating

**Solution**: Check if you're using static or live rates:
```typescript
// Static rates (default)
export const EXCHANGE_RATES = { ... };

// Live rates (requires API call)
fetchExchangeRates().then(rates => { ... });
```

### Issue: Currency preference not persisting

**Solution**: Check localStorage is enabled:
```typescript
// Test localStorage
try {
  localStorage.setItem("test", "test");
  localStorage.removeItem("test");
  console.log("localStorage is working");
} catch (e) {
  console.error("localStorage is disabled");
}
```

---

## Summary

### Key Features

✅ **Modular Architecture** - Separated configuration, logic, and UI  
✅ **Type-Safe** - Full TypeScript support with strict types  
✅ **Extensible** - Add currencies in minutes  
✅ **Reusable** - Use in any React project  
✅ **Well-Documented** - Comprehensive JSDoc comments  
✅ **Flexible** - Support 2+ currencies with auto-adapting UI  
✅ **Performant** - Optimized for production use  
✅ **Tested** - Ready for unit and integration tests  

### Quick Reference

| Task | File | Function |
|------|------|----------|
| Add currency | `config/currencies.ts` | Update `CURRENCIES`, `EXCHANGE_RATES`, `ACTIVE_CURRENCIES` |
| Convert price | `lib/currency.ts` | `convertPrice(price, currency)` |
| Format price | `lib/currency.ts` | `formatPrice(price, currency)` |
| Use in component | `contexts/CurrencyContext.tsx` | `useCurrency()` hook |
| Update exchange rate | `config/currencies.ts` | Modify `EXCHANGE_RATES` |
| Enable/disable currency | `config/currencies.ts` | Modify `ACTIVE_CURRENCIES` |

---

**Last Updated**: 2025-11-21  
**Version**: 2.0.0 (Reusable Architecture)  
**Status**: ✅ Production Ready
