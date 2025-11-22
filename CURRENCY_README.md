# 💱 Currency System Documentation

## Welcome to the Reusable Currency System!

This is a **modular, configuration-based multi-currency system** for React applications. It's designed to be:

- ✅ **Easy to use** - Simple API for common tasks
- ✅ **Easy to extend** - Add currencies in minutes
- ✅ **Type-safe** - Full TypeScript support
- ✅ **Well-documented** - Comprehensive guides
- ✅ **Production-ready** - Tested and optimized

---

## 📚 Documentation Index

### For Users

- **[User Guide](CURRENCY_USER_GUIDE.md)** - How to use the currency switcher
- **[Quick Start](CURRENCY_QUICK_START.md)** - 30-second guide for end users

### For Developers

- **[Quick Reference](CURRENCY_QUICK_REFERENCE.md)** - Quick reference card
- **[Reusable Guide](CURRENCY_REUSABLE_GUIDE.md)** - Complete developer guide
- **[Code Examples](CURRENCY_EXAMPLES.md)** - 20 real-world examples
- **[Refactor Summary](CURRENCY_REFACTOR_SUMMARY.md)** - What changed and why

### Technical Documentation

- **[Feature Documentation](CURRENCY_FEATURE.md)** - Technical details
- **[Implementation Summary](CURRENCY_IMPLEMENTATION_SUMMARY.md)** - Implementation details

---

## 🚀 Quick Start for Developers

### 1. Use in a Component

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";

function ProductCard({ product }) {
  const { formatPrice } = useCurrency();
  
  return (
    <div>
      <h3>{product.name}</h3>
      <p>{formatPrice(product.price)}</p>
    </div>
  );
}
```

### 2. Add a New Currency

```typescript
// src/config/currencies.ts

// Step 1: Add to type
export type CurrencyCode = "USD" | "INR" | "EUR";

// Step 2: Add configuration
CURRENCIES.EUR = {
  code: "EUR",
  name: "Euro",
  symbol: "€",
  locale: "de-DE",
  decimalPlaces: 2,
  symbolPosition: "before",
};

// Step 3: Add exchange rate
EXCHANGE_RATES.EUR = 0.92;

// Step 4: Enable currency
ACTIVE_CURRENCIES.push("EUR");
```

### 3. Use Utility Functions

```typescript
import { convertPrice, formatPrice } from "@/lib/currency";

// Convert price
const priceInINR = convertPrice(100, "INR");  // 8300

// Format price
const formatted = formatPrice(100, "USD");  // "$100.00"
```

---

## 📁 File Structure

```
src/
├── config/
│   └── currencies.ts              # Currency configuration
├── lib/
│   └── currency.ts                # Utility functions
├── contexts/
│   └── CurrencyContext.tsx        # React Context
└── components/
    └── common/
        └── CurrencySwitcher.tsx   # UI component
```

---

## 🎯 Common Tasks

### Display a Price

```typescript
const { formatPrice } = useCurrency();
<span>{formatPrice(99.99)}</span>
```

### Get Current Currency

```typescript
const { currency } = useCurrency();
console.log(currency);  // "USD" or "INR"
```

### Change Currency

```typescript
const { setCurrency } = useCurrency();
setCurrency("INR");
```

### Get Currency Symbol

```typescript
const { getCurrencySymbol } = useCurrency();
console.log(getCurrencySymbol());  // "$" or "₹"
```

### Convert Price

```typescript
const { convertPrice } = useCurrency();
const converted = convertPrice(100);  // Converts to current currency
```

---

## 🔧 Configuration

### Active Currencies

Control which currencies are available:

```typescript
// src/config/currencies.ts
export const ACTIVE_CURRENCIES: CurrencyCode[] = ["USD", "INR"];
```

### Exchange Rates

Update exchange rates:

```typescript
// src/config/currencies.ts
export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  INR: 83,    // 1 USD = 83 INR
  EUR: 0.92,  // 1 USD = 0.92 EUR
};
```

### Default Currency

Set the default currency for new users:

```typescript
// src/config/currencies.ts
export const DEFAULT_CURRENCY: CurrencyCode = "USD";
```

---

## 📖 API Reference

### React Hook: `useCurrency()`

```typescript
const {
  currency,              // Current currency code
  setCurrency,           // Change currency
  currencyConfig,        // Current currency configuration
  availableCurrencies,   // List of available currencies
  convertPrice,          // Convert price to current currency
  formatPrice,           // Format price in current currency
  getCurrencySymbol,     // Get current currency symbol
  getCurrencyName,       // Get current currency name
  getExchangeRate,       // Get current exchange rate
} = useCurrency();
```

### Utility Functions

```typescript
// Conversion
convertPrice(price, targetCurrency)
convertBetweenCurrencies(price, fromCurrency, toCurrency)
convertAndFormat(price, targetCurrency, options)

// Formatting
formatPrice(price, currency, options)
formatPriceRange(minPrice, maxPrice, currency)

// Information
getCurrencySymbol(currency)
getCurrencyName(currency)
getExchangeRate(currency)

// Validation
isValidPrice(price)
roundPrice(price, currency)
```

---

## 🎨 UI Components

### Currency Switcher

```typescript
import CurrencySwitcher from "@/components/common/CurrencySwitcher";

<CurrencySwitcher />
```

**Behavior**:
- 2 currencies → Shows toggle button
- 3+ currencies → Shows dropdown menu

---

## 🌟 Features

### Current Features

✅ Support for 6 currencies (USD, INR, EUR, GBP, AUD, CAD)  
✅ Easy to add more currencies  
✅ Automatic UI adaptation (toggle/dropdown)  
✅ localStorage persistence  
✅ Type-safe with TypeScript  
✅ Comprehensive utility functions  
✅ Well-documented with examples  

### Planned Features

🔜 Live exchange rates from API  
🔜 Auto-detect user currency  
🔜 Currency comparison view  
🔜 Multi-currency checkout  

---

## 📊 Supported Currencies

| Code | Name | Symbol | Status |
|------|------|--------|--------|
| USD | US Dollar | $ | ✅ Active |
| INR | Indian Rupee | ₹ | ✅ Active |
| EUR | Euro | € | ⚪ Available |
| GBP | British Pound | £ | ⚪ Available |
| AUD | Australian Dollar | A$ | ⚪ Available |
| CAD | Canadian Dollar | C$ | ⚪ Available |

**Note**: Only USD and INR are active by default. To enable others, update `ACTIVE_CURRENCIES` in `src/config/currencies.ts`.

---

## 🔍 Examples

### Example 1: Product Card

```typescript
function ProductCard({ product }) {
  const { formatPrice } = useCurrency();
  
  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p className="price">{formatPrice(product.price)}</p>
      <button>Add to Cart</button>
    </div>
  );
}
```

### Example 2: Shopping Cart

```typescript
function CartSummary({ items }) {
  const { formatPrice } = useCurrency();
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return (
    <div>
      <h3>Cart Total</h3>
      <p className="total">{formatPrice(total)}</p>
    </div>
  );
}
```

### Example 3: Currency Selector

```typescript
function CurrencySettings() {
  const { currency, setCurrency, availableCurrencies } = useCurrency();
  
  return (
    <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
      {availableCurrencies.map(curr => (
        <option key={curr.code} value={curr.code}>
          {curr.symbol} {curr.name}
        </option>
      ))}
    </select>
  );
}
```

**More examples**: See [CURRENCY_EXAMPLES.md](CURRENCY_EXAMPLES.md) for 20 real-world examples.

---

## 🐛 Troubleshooting

### Currency not updating?

**Solution**: Ensure `CurrencyProvider` wraps your app:

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

### TypeScript errors?

**Solution**: Import the `CurrencyCode` type:

```typescript
import type { CurrencyCode } from "@/config/currencies";
```

### Preference not saving?

**Solution**: Check localStorage is enabled in browser settings.

### Wrong exchange rate?

**Solution**: Update `EXCHANGE_RATES` in `src/config/currencies.ts`.

---

## 📝 Best Practices

### 1. Always Store Prices in USD

```typescript
// ✅ Good
const product = { price: 100 };  // USD

// ❌ Bad
const product = { price: 8300 };  // INR
```

### 2. Convert Only for Display

```typescript
// ✅ Good
const { formatPrice } = useCurrency();
<div>{formatPrice(product.price)}</div>

// ❌ Bad
product.price = convertPrice(product.price);
```

### 3. Use Type-Safe Currency Codes

```typescript
// ✅ Good
import type { CurrencyCode } from "@/config/currencies";
const currency: CurrencyCode = "USD";

// ❌ Bad
const currency: string = "USD";
```

---

## 🤝 Contributing

### Adding a New Currency

1. Update `CurrencyCode` type
2. Add to `CURRENCIES` object
3. Add to `EXCHANGE_RATES` object
4. Add to `ACTIVE_CURRENCIES` array
5. (Optional) Add icon to `CurrencySwitcher`

### Updating Exchange Rates

1. Open `src/config/currencies.ts`
2. Update values in `EXCHANGE_RATES`
3. Save and test

### Reporting Issues

If you find a bug or have a suggestion:
1. Check existing documentation
2. Try troubleshooting steps
3. Create an issue with details

---

## 📄 License

This currency system is part of the Roofing Solutions Hub project.

---

## 🙏 Acknowledgments

- **React** - UI framework
- **TypeScript** - Type safety
- **Lucide React** - Icons
- **shadcn/ui** - UI components

---

## 📞 Support

### Documentation

- **Quick Reference**: [CURRENCY_QUICK_REFERENCE.md](CURRENCY_QUICK_REFERENCE.md)
- **Developer Guide**: [CURRENCY_REUSABLE_GUIDE.md](CURRENCY_REUSABLE_GUIDE.md)
- **Code Examples**: [CURRENCY_EXAMPLES.md](CURRENCY_EXAMPLES.md)

### Need Help?

1. Check the documentation
2. Review code examples
3. Try troubleshooting steps
4. Contact support

---

## 🎉 Get Started

Ready to use the currency system? Start with:

1. **[Quick Reference](CURRENCY_QUICK_REFERENCE.md)** - For quick tasks
2. **[Reusable Guide](CURRENCY_REUSABLE_GUIDE.md)** - For comprehensive understanding
3. **[Code Examples](CURRENCY_EXAMPLES.md)** - For real-world usage

---

**Version**: 2.0.0  
**Last Updated**: 2025-11-21  
**Status**: ✅ Production Ready  
**Maintained**: Yes

---

## Quick Links

| Document | Purpose | Audience |
|----------|---------|----------|
| [User Guide](CURRENCY_USER_GUIDE.md) | How to use currency switcher | End users |
| [Quick Start](CURRENCY_QUICK_START.md) | 30-second guide | End users |
| [Quick Reference](CURRENCY_QUICK_REFERENCE.md) | Quick reference card | Developers |
| [Reusable Guide](CURRENCY_REUSABLE_GUIDE.md) | Complete developer guide | Developers |
| [Code Examples](CURRENCY_EXAMPLES.md) | Real-world examples | Developers |
| [Feature Docs](CURRENCY_FEATURE.md) | Technical details | Developers |
| [Refactor Summary](CURRENCY_REFACTOR_SUMMARY.md) | What changed | Developers |
| [Implementation](CURRENCY_IMPLEMENTATION_SUMMARY.md) | Implementation details | Developers |

---

**Happy coding! 🚀**
