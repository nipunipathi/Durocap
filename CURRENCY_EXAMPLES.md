# 💡 Currency System - Code Examples

## Table of Contents
1. [Basic Usage](#basic-usage)
2. [Product Display](#product-display)
3. [Shopping Cart](#shopping-cart)
4. [Price Comparison](#price-comparison)
5. [Admin Dashboard](#admin-dashboard)
6. [Custom Components](#custom-components)
7. [Advanced Features](#advanced-features)

---

## Basic Usage

### Example 1: Simple Price Display

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";

function SimplePrice() {
  const { formatPrice } = useCurrency();
  
  return (
    <div>
      <p>Price: {formatPrice(99.99)}</p>
    </div>
  );
}

// Output in USD: Price: $99.99
// Output in INR: Price: ₹8,299.17
```

### Example 2: Currency Switcher in Header

```typescript
import CurrencySwitcher from "@/components/common/CurrencySwitcher";

function Header() {
  return (
    <header>
      <nav>
        <Logo />
        <Menu />
        <CurrencySwitcher />  {/* Automatically adapts to 2 or 3+ currencies */}
        <CartIcon />
      </nav>
    </header>
  );
}
```

### Example 3: Display Current Currency

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";

function CurrencyInfo() {
  const { currency, getCurrencyName, getCurrencySymbol, getExchangeRate } = useCurrency();
  
  return (
    <div>
      <p>Current Currency: {getCurrencyName()}</p>
      <p>Symbol: {getCurrencySymbol()}</p>
      <p>Code: {currency}</p>
      <p>Exchange Rate: 1 USD = {getExchangeRate()} {currency}</p>
    </div>
  );
}

// Output:
// Current Currency: Indian Rupee
// Symbol: ₹
// Code: INR
// Exchange Rate: 1 USD = 83 INR
```

---

## Product Display

### Example 4: Product Card with Price

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  price: number;  // Stored in USD
  image: string;
}

function ProductCard({ product }: { product: Product }) {
  const { formatPrice } = useCurrency();
  
  return (
    <Card>
      <img src={product.image} alt={product.name} />
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{formatPrice(product.price)}</p>
        <Button>Add to Cart</Button>
      </CardContent>
    </Card>
  );
}

// Usage:
<ProductCard product={{ id: "1", name: "Roofing Tiles", price: 89.99, image: "..." }} />

// Output in USD: $89.99
// Output in INR: ₹7,469.17
```

### Example 5: Product List with Filtering

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";
import { useState } from "react";

function ProductList({ products }: { products: Product[] }) {
  const { formatPrice, currency } = useCurrency();
  const [maxPrice, setMaxPrice] = useState(200);
  
  // Filter products based on price in current currency
  const filteredProducts = products.filter(p => {
    const convertedPrice = convertPrice(p.price, currency);
    return convertedPrice <= maxPrice;
  });
  
  return (
    <div>
      <label>
        Max Price: {formatPrice(maxPrice)}
        <input
          type="range"
          min="0"
          max="500"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
        />
      </label>
      
      <div className="grid grid-cols-3 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

### Example 6: Product with Discount

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";
import { Badge } from "@/components/ui/badge";

interface ProductWithDiscount {
  name: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercent: number;
}

function DiscountedProduct({ product }: { product: ProductWithDiscount }) {
  const { formatPrice } = useCurrency();
  
  return (
    <div className="relative">
      <Badge className="absolute top-2 right-2 bg-red-500">
        {product.discountPercent}% OFF
      </Badge>
      
      <h3>{product.name}</h3>
      
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground line-through">
          {formatPrice(product.originalPrice)}
        </span>
        <span className="text-2xl font-bold text-primary">
          {formatPrice(product.discountedPrice)}
        </span>
      </div>
      
      <p className="text-sm text-green-600">
        You save: {formatPrice(product.originalPrice - product.discountedPrice)}
      </p>
    </div>
  );
}

// Usage:
<DiscountedProduct
  product={{
    name: "Roofing Hammer",
    originalPrice: 49.99,
    discountedPrice: 34.99,
    discountPercent: 30,
  }}
/>

// Output in USD:
// $49.99 (strikethrough)
// $34.99 (bold)
// You save: $15.00

// Output in INR:
// ₹4,149.17 (strikethrough)
// ₹2,904.17 (bold)
// You save: ₹1,245.00
```

---

## Shopping Cart

### Example 7: Cart Item with Quantity

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

function CartItemRow({ item }: { item: CartItem }) {
  const { formatPrice } = useCurrency();
  
  const itemTotal = item.price * item.quantity;
  
  return (
    <div className="flex justify-between items-center">
      <div>
        <h4>{item.name}</h4>
        <p className="text-sm text-muted-foreground">
          {formatPrice(item.price)} × {item.quantity}
        </p>
      </div>
      <p className="font-bold">{formatPrice(itemTotal)}</p>
    </div>
  );
}
```

### Example 8: Cart Summary

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";

interface CartSummaryProps {
  items: CartItem[];
  shippingCost: number;
  taxRate: number;
}

function CartSummary({ items, shippingCost, taxRate }: CartSummaryProps) {
  const { formatPrice } = useCurrency();
  
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * taxRate;
  const total = subtotal + shippingCost + tax;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      
      <div className="flex justify-between">
        <span>Shipping:</span>
        <span>{formatPrice(shippingCost)}</span>
      </div>
      
      <div className="flex justify-between">
        <span>Tax ({taxRate * 100}%):</span>
        <span>{formatPrice(tax)}</span>
      </div>
      
      <div className="flex justify-between text-xl font-bold border-t pt-2">
        <span>Total:</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}

// Usage:
<CartSummary
  items={cartItems}
  shippingCost={10}
  taxRate={0.08}
/>

// Output in USD:
// Subtotal: $150.00
// Shipping: $10.00
// Tax (8%): $12.00
// Total: $172.00

// Output in INR:
// Subtotal: ₹12,450.00
// Shipping: ₹830.00
// Tax (8%): ₹996.00
// Total: ₹14,276.00
```

---

## Price Comparison

### Example 9: Compare Prices in Multiple Currencies

```typescript
import { formatPrice } from "@/lib/currency";
import { ACTIVE_CURRENCIES } from "@/config/currencies";

function PriceComparison({ price }: { price: number }) {
  return (
    <div>
      <h3>Price in Different Currencies:</h3>
      <ul>
        {ACTIVE_CURRENCIES.map(currency => (
          <li key={currency}>
            {currency}: {formatPrice(price, currency)}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Usage:
<PriceComparison price={100} />

// Output:
// Price in Different Currencies:
// • USD: $100.00
// • INR: ₹8,300.00
// • EUR: €92.00
```

### Example 10: Price History Chart

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

interface PriceHistory {
  date: string;
  price: number;
}

function PriceHistoryChart({ history }: { history: PriceHistory[] }) {
  const { formatPrice, convertPrice } = useCurrency();
  
  // Convert all prices to current currency
  const convertedHistory = history.map(item => ({
    date: item.date,
    price: convertPrice(item.price),
  }));
  
  return (
    <LineChart width={600} height={300} data={convertedHistory}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip formatter={(value) => formatPrice(value as number)} />
      <Line type="monotone" dataKey="price" stroke="#8884d8" />
    </LineChart>
  );
}
```

---

## Admin Dashboard

### Example 11: Admin Product Form

```typescript
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function AdminProductForm() {
  const [price, setPrice] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Always store prices in USD (base currency)
    const priceInUSD = parseFloat(price);
    
    // Save to database
    saveProduct({ price: priceInUSD });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Label>Price (USD)</Label>
      <Input
        type="number"
        step="0.01"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="99.99"
      />
      <p className="text-sm text-muted-foreground">
        Always enter prices in USD. They will be converted automatically for customers.
      </p>
      <Button type="submit">Save Product</Button>
    </form>
  );
}
```

### Example 12: Admin Revenue Dashboard

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RevenueStats {
  today: number;
  thisWeek: number;
  thisMonth: number;
  total: number;
}

function RevenueDashboard({ stats }: { stats: RevenueStats }) {
  const { formatPrice } = useCurrency();
  
  return (
    <div className="grid grid-cols-4 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Today</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatPrice(stats.today)}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>This Week</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatPrice(stats.thisWeek)}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>This Month</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatPrice(stats.thisMonth)}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatPrice(stats.total)}</p>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## Custom Components

### Example 13: Custom Currency Selector

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function CustomCurrencySelector() {
  const { currency, setCurrency, availableCurrencies } = useCurrency();
  
  return (
    <Select value={currency} onValueChange={setCurrency}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        {availableCurrencies.map((curr) => (
          <SelectItem key={curr.code} value={curr.code}>
            {curr.symbol} {curr.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

### Example 14: Price Input with Currency Display

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";
import { Input } from "@/components/ui/input";
import { useState } from "react";

function PriceInput() {
  const { getCurrencySymbol, formatPrice } = useCurrency();
  const [value, setValue] = useState("");
  
  const displayValue = value ? formatPrice(parseFloat(value)) : "";
  
  return (
    <div>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2">
          {getCurrencySymbol()}
        </span>
        <Input
          type="number"
          step="0.01"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="pl-8"
          placeholder="0.00"
        />
      </div>
      {displayValue && (
        <p className="text-sm text-muted-foreground mt-1">
          Formatted: {displayValue}
        </p>
      )}
    </div>
  );
}
```

### Example 15: Currency Badge

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";
import { Badge } from "@/components/ui/badge";

function CurrencyBadge() {
  const { currency, getCurrencySymbol } = useCurrency();
  
  return (
    <Badge variant="outline">
      {getCurrencySymbol()} {currency}
    </Badge>
  );
}
```

---

## Advanced Features

### Example 16: Auto-Detect User Currency

```typescript
import { useEffect } from "react";
import { useCurrency } from "@/contexts/CurrencyContext";
import type { CurrencyCode } from "@/config/currencies";

function CurrencyAutoDetect() {
  const { setCurrency } = useCurrency();
  
  useEffect(() => {
    // Check if user has saved preference
    const saved = localStorage.getItem("preferred_currency");
    if (saved) return;
    
    // Detect from browser locale
    const locale = navigator.language;
    const currencyMap: Record<string, CurrencyCode> = {
      "en-US": "USD",
      "en-IN": "INR",
      "en-GB": "GBP",
      "de-DE": "EUR",
    };
    
    const detectedCurrency = currencyMap[locale] || "USD";
    setCurrency(detectedCurrency);
  }, [setCurrency]);
  
  return null;
}

// Usage in App.tsx:
<CurrencyProvider>
  <CurrencyAutoDetect />
  <App />
</CurrencyProvider>
```

### Example 17: Live Exchange Rates

```typescript
import { useEffect, useState } from "react";
import { fetchExchangeRates } from "@/config/currencies";
import type { CurrencyCode } from "@/config/currencies";

function LiveExchangeRates() {
  const [rates, setRates] = useState<Record<CurrencyCode, number> | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadRates = async () => {
      try {
        const newRates = await fetchExchangeRates();
        setRates(newRates);
      } catch (error) {
        console.error("Failed to load exchange rates:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadRates();
    
    // Refresh every hour
    const interval = setInterval(loadRates, 3600000);
    return () => clearInterval(interval);
  }, []);
  
  if (loading) return <div>Loading exchange rates...</div>;
  
  return (
    <div>
      <h3>Current Exchange Rates (vs USD)</h3>
      <ul>
        {rates && Object.entries(rates).map(([code, rate]) => (
          <li key={code}>
            1 USD = {rate} {code}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

### Example 18: Price Alert System

```typescript
import { useCurrency } from "@/contexts/CurrencyContext";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface PriceAlert {
  productId: string;
  targetPrice: number;
}

function PriceAlertSystem({ alerts }: { alerts: PriceAlert[] }) {
  const { convertPrice, formatPrice } = useCurrency();
  
  useEffect(() => {
    alerts.forEach(alert => {
      // Fetch current price
      fetchProductPrice(alert.productId).then(currentPrice => {
        const convertedTarget = convertPrice(alert.targetPrice);
        const convertedCurrent = convertPrice(currentPrice);
        
        if (convertedCurrent <= convertedTarget) {
          toast.success(
            `Price Alert! Product is now ${formatPrice(currentPrice)}`,
            {
              description: `Target price: ${formatPrice(alert.targetPrice)}`,
            }
          );
        }
      });
    });
  }, [alerts, convertPrice, formatPrice]);
  
  return null;
}
```

### Example 19: Multi-Currency Invoice

```typescript
import { formatPrice } from "@/lib/currency";
import type { CurrencyCode } from "@/config/currencies";

interface InvoiceItem {
  name: string;
  price: number;
  quantity: number;
}

interface Invoice {
  items: InvoiceItem[];
  currency: CurrencyCode;
}

function InvoiceDocument({ invoice }: { invoice: Invoice }) {
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  
  return (
    <div className="p-8 bg-white">
      <h1>Invoice</h1>
      
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td>{formatPrice(item.price, invoice.currency)}</td>
              <td>{item.quantity}</td>
              <td>{formatPrice(item.price * item.quantity, invoice.currency)}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={3}>Subtotal:</td>
            <td>{formatPrice(subtotal, invoice.currency)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
```

### Example 20: Currency Conversion Calculator

```typescript
import { useState } from "react";
import { convertBetweenCurrencies, formatPrice } from "@/lib/currency";
import { getActiveCurrencies } from "@/config/currencies";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CurrencyCode } from "@/config/currencies";

function CurrencyConverter() {
  const [amount, setAmount] = useState("100");
  const [fromCurrency, setFromCurrency] = useState<CurrencyCode>("USD");
  const [toCurrency, setToCurrency] = useState<CurrencyCode>("INR");
  
  const currencies = getActiveCurrencies();
  const convertedAmount = convertBetweenCurrencies(
    parseFloat(amount) || 0,
    fromCurrency,
    toCurrency
  );
  
  return (
    <div className="space-y-4">
      <h2>Currency Converter</h2>
      
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label>Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        
        <div className="flex-1">
          <label>From</label>
          <Select value={fromCurrency} onValueChange={(v) => setFromCurrency(v as CurrencyCode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map(curr => (
                <SelectItem key={curr.code} value={curr.code}>
                  {curr.code} - {curr.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex-1">
          <label>To</label>
          <Select value={toCurrency} onValueChange={(v) => setToCurrency(v as CurrencyCode)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map(curr => (
                <SelectItem key={curr.code} value={curr.code}>
                  {curr.code} - {curr.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="p-4 bg-muted rounded-lg">
        <p className="text-2xl font-bold">
          {formatPrice(parseFloat(amount) || 0, fromCurrency)} = {formatPrice(convertedAmount, toCurrency)}
        </p>
      </div>
    </div>
  );
}
```

---

## Summary

These examples demonstrate:

✅ **Basic price display and formatting**  
✅ **Product cards with currency conversion**  
✅ **Shopping cart with totals**  
✅ **Price comparisons across currencies**  
✅ **Admin dashboard with USD-based pricing**  
✅ **Custom currency selectors**  
✅ **Auto-detection of user currency**  
✅ **Live exchange rate integration**  
✅ **Advanced features like price alerts**  
✅ **Multi-currency invoices and calculators**  

All examples are **production-ready** and follow **best practices** for the reusable currency system.

---

**Last Updated**: 2025-11-21  
**Version**: 2.0.0  
**Status**: ✅ Ready to Use
