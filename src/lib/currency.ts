/**
 * Currency Utility Functions
 * 
 * Reusable functions for currency conversion and formatting
 */

import {
  type CurrencyCode,
  type CurrencyConfig,
  CURRENCIES,
  EXCHANGE_RATES,
  BASE_CURRENCY,
  getCurrencyConfig,
  getExchangeRate as getExchangeRateFromConfig,
} from "@/config/currencies";

/**
 * Convert price from base currency to target currency
 * 
 * @param price - Price in base currency (USD)
 * @param targetCurrency - Target currency code
 * @returns Converted price
 * 
 * @example
 * convertPrice(100, "INR") // Returns 8300 (100 * 83)
 * convertPrice(100, "EUR") // Returns 92 (100 * 0.92)
 */
export function convertPrice(price: number, targetCurrency: CurrencyCode): number {
  if (targetCurrency === BASE_CURRENCY) {
    return price;
  }
  
  const rate = getExchangeRateFromConfig(targetCurrency);
  return price * rate;
}

/**
 * Convert price from one currency to another
 * 
 * @param price - Price in source currency
 * @param fromCurrency - Source currency code
 * @param toCurrency - Target currency code
 * @returns Converted price
 * 
 * @example
 * convertBetweenCurrencies(100, "EUR", "INR")
 * // First converts EUR to USD: 100 / 0.92 = 108.7
 * // Then converts USD to INR: 108.7 * 83 = 9022.1
 */
export function convertBetweenCurrencies(
  price: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode
): number {
  if (fromCurrency === toCurrency) {
    return price;
  }
  
  // Convert to base currency first
  const priceInBase = fromCurrency === BASE_CURRENCY
    ? price
    : price / getExchangeRateFromConfig(fromCurrency);
  
  // Convert to target currency
  return convertPrice(priceInBase, toCurrency);
}

/**
 * Format price with currency symbol and proper decimal places
 * 
 * @param price - Price to format
 * @param currency - Currency code
 * @param options - Formatting options
 * @returns Formatted price string
 * 
 * @example
 * formatPrice(1234.56, "USD") // Returns "$1,234.56"
 * formatPrice(1234.56, "INR") // Returns "₹1,234.56"
 * formatPrice(1234.56, "EUR", { showCode: true }) // Returns "€1,234.56 EUR"
 */
export function formatPrice(
  price: number,
  currency: CurrencyCode,
  options: {
    showCode?: boolean;
    useLocale?: boolean;
    compact?: boolean;
  } = {}
): string {
  const config = getCurrencyConfig(currency);
  const { showCode = false, useLocale = false, compact = false } = options;
  
  // Format number with proper decimal places
  let formattedNumber: string;
  
  if (useLocale) {
    // Use locale-specific formatting
    formattedNumber = price.toLocaleString(config.locale, {
      minimumFractionDigits: config.decimalPlaces,
      maximumFractionDigits: config.decimalPlaces,
    });
  } else if (compact && price >= 1000) {
    // Compact format for large numbers
    formattedNumber = formatCompactNumber(price, config.decimalPlaces);
  } else {
    // Standard format
    formattedNumber = price.toFixed(config.decimalPlaces);
  }
  
  // Add currency symbol
  const priceWithSymbol = config.symbolPosition === "before"
    ? `${config.symbol}${formattedNumber}`
    : `${formattedNumber}${config.symbol}`;
  
  // Add currency code if requested
  return showCode ? `${priceWithSymbol} ${config.code}` : priceWithSymbol;
}

/**
 * Format number in compact notation (K, M, B)
 * 
 * @param num - Number to format
 * @param decimals - Number of decimal places
 * @returns Formatted string
 * 
 * @example
 * formatCompactNumber(1500, 2) // Returns "1.50K"
 * formatCompactNumber(1500000, 2) // Returns "1.50M"
 */
function formatCompactNumber(num: number, decimals: number): string {
  if (num >= 1_000_000_000) {
    return (num / 1_000_000_000).toFixed(decimals) + "B";
  }
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(decimals) + "M";
  }
  if (num >= 1_000) {
    return (num / 1_000).toFixed(decimals) + "K";
  }
  return num.toFixed(decimals);
}

/**
 * Convert and format price in one step
 * 
 * @param price - Price in base currency
 * @param targetCurrency - Target currency code
 * @param options - Formatting options
 * @returns Formatted price string
 * 
 * @example
 * convertAndFormat(100, "INR") // Returns "₹8,300.00"
 * convertAndFormat(100, "EUR", { showCode: true }) // Returns "€92.00 EUR"
 */
export function convertAndFormat(
  price: number,
  targetCurrency: CurrencyCode,
  options?: Parameters<typeof formatPrice>[2]
): string {
  const convertedPrice = convertPrice(price, targetCurrency);
  return formatPrice(convertedPrice, targetCurrency, options);
}

/**
 * Parse formatted price string to number
 * 
 * @param priceString - Formatted price string
 * @param currency - Currency code
 * @returns Numeric price value
 * 
 * @example
 * parsePrice("$1,234.56", "USD") // Returns 1234.56
 * parsePrice("₹8,300.00", "INR") // Returns 8300.00
 */
export function parsePrice(priceString: string, currency: CurrencyCode): number {
  const config = getCurrencyConfig(currency);
  
  // Remove currency symbol and code
  let cleanString = priceString
    .replace(config.symbol, "")
    .replace(config.code, "")
    .trim();
  
  // Remove thousand separators and parse
  cleanString = cleanString.replace(/,/g, "");
  
  return parseFloat(cleanString) || 0;
}

/**
 * Get currency symbol for a currency code
 * 
 * @param currency - Currency code
 * @returns Currency symbol
 * 
 * @example
 * getCurrencySymbol("USD") // Returns "$"
 * getCurrencySymbol("INR") // Returns "₹"
 */
export function getCurrencySymbol(currency: CurrencyCode): string {
  return getCurrencyConfig(currency).symbol;
}

/**
 * Get currency name for a currency code
 * 
 * @param currency - Currency code
 * @returns Currency name
 * 
 * @example
 * getCurrencyName("USD") // Returns "US Dollar"
 * getCurrencyName("INR") // Returns "Indian Rupee"
 */
export function getCurrencyName(currency: CurrencyCode): string {
  return getCurrencyConfig(currency).name;
}

/**
 * Calculate percentage difference between two prices
 * 
 * @param price1 - First price
 * @param price2 - Second price
 * @returns Percentage difference
 * 
 * @example
 * calculatePriceDifference(100, 120) // Returns 20 (20% increase)
 * calculatePriceDifference(120, 100) // Returns -16.67 (16.67% decrease)
 */
export function calculatePriceDifference(price1: number, price2: number): number {
  if (price1 === 0) return 0;
  return ((price2 - price1) / price1) * 100;
}

/**
 * Format price range
 * 
 * @param minPrice - Minimum price
 * @param maxPrice - Maximum price
 * @param currency - Currency code
 * @returns Formatted price range string
 * 
 * @example
 * formatPriceRange(100, 200, "USD") // Returns "$100.00 - $200.00"
 * formatPriceRange(8300, 16600, "INR") // Returns "₹8,300.00 - ₹16,600.00"
 */
export function formatPriceRange(
  minPrice: number,
  maxPrice: number,
  currency: CurrencyCode
): string {
  const formattedMin = formatPrice(minPrice, currency);
  const formattedMax = formatPrice(maxPrice, currency);
  return `${formattedMin} - ${formattedMax}`;
}

/**
 * Check if a price is valid
 * 
 * @param price - Price to validate
 * @returns True if price is valid
 * 
 * @example
 * isValidPrice(100) // Returns true
 * isValidPrice(-10) // Returns false
 * isValidPrice(NaN) // Returns false
 */
export function isValidPrice(price: number): boolean {
  return typeof price === "number" && !isNaN(price) && price >= 0;
}

/**
 * Round price to currency's decimal places
 * 
 * @param price - Price to round
 * @param currency - Currency code
 * @returns Rounded price
 * 
 * @example
 * roundPrice(123.456, "USD") // Returns 123.46
 * roundPrice(123.456, "INR") // Returns 123.46
 */
export function roundPrice(price: number, currency: CurrencyCode): number {
  const config = getCurrencyConfig(currency);
  const multiplier = Math.pow(10, config.decimalPlaces);
  return Math.round(price * multiplier) / multiplier;
}

/**
 * Get exchange rate for a currency
 * Re-export from config for convenience
 * 
 * @param currency - Currency code
 * @returns Exchange rate relative to base currency
 * 
 * @example
 * getExchangeRate("INR") // Returns 83
 * getExchangeRate("EUR") // Returns 0.92
 */
export function getExchangeRate(currency: CurrencyCode): number {
  return getExchangeRateFromConfig(currency);
}
