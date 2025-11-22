/**
 * Currency Configuration
 * 
 * This file defines all supported currencies and their exchange rates.
 * To add a new currency:
 * 1. Add the currency code to the CurrencyCode type
 * 2. Add the currency configuration to the CURRENCIES object
 * 3. Add the exchange rate to the EXCHANGE_RATES object
 */

export type CurrencyCode = "USD" | "INR" | "EUR" | "GBP" | "AUD" | "CAD";

export interface CurrencyConfig {
  code: CurrencyCode;
  name: string;
  symbol: string;
  locale: string;
  decimalPlaces: number;
  symbolPosition: "before" | "after";
}

/**
 * Currency configurations
 * Define display properties for each currency
 */
export const CURRENCIES: Record<CurrencyCode, CurrencyConfig> = {
  USD: {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    locale: "en-US",
    decimalPlaces: 2,
    symbolPosition: "before",
  },
  INR: {
    code: "INR",
    name: "Indian Rupee",
    symbol: "₹",
    locale: "en-IN",
    decimalPlaces: 2,
    symbolPosition: "before",
  },
  EUR: {
    code: "EUR",
    name: "Euro",
    symbol: "€",
    locale: "de-DE",
    decimalPlaces: 2,
    symbolPosition: "before",
  },
  GBP: {
    code: "GBP",
    name: "British Pound",
    symbol: "£",
    locale: "en-GB",
    decimalPlaces: 2,
    symbolPosition: "before",
  },
  AUD: {
    code: "AUD",
    name: "Australian Dollar",
    symbol: "A$",
    locale: "en-AU",
    decimalPlaces: 2,
    symbolPosition: "before",
  },
  CAD: {
    code: "CAD",
    name: "Canadian Dollar",
    symbol: "C$",
    locale: "en-CA",
    decimalPlaces: 2,
    symbolPosition: "before",
  },
};

/**
 * Exchange rates relative to USD (base currency)
 * 1 USD = X units of target currency
 * 
 * To update rates:
 * - Change the values below
 * - Or fetch from an API (see fetchExchangeRates function)
 */
export const EXCHANGE_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  INR: 83,
  EUR: 0.92,
  GBP: 0.79,
  AUD: 1.53,
  CAD: 1.36,
};

/**
 * Base currency for the application
 * All prices in the database are stored in this currency
 */
export const BASE_CURRENCY: CurrencyCode = "USD";

/**
 * Default currency for new users
 * Can be changed based on user location or preference
 */
export const DEFAULT_CURRENCY: CurrencyCode = "USD";

/**
 * Active currencies to display in the currency switcher
 * Only these currencies will be available for selection
 * To enable/disable currencies, add/remove from this array
 */
export const ACTIVE_CURRENCIES: CurrencyCode[] = ["USD", "INR"];

/**
 * Get currency configuration by code
 */
export function getCurrencyConfig(code: CurrencyCode): CurrencyConfig {
  return CURRENCIES[code];
}

/**
 * Get exchange rate for a currency
 */
export function getExchangeRate(code: CurrencyCode): number {
  return EXCHANGE_RATES[code];
}

/**
 * Get all active currencies
 */
export function getActiveCurrencies(): CurrencyConfig[] {
  return ACTIVE_CURRENCIES.map((code) => CURRENCIES[code]);
}

/**
 * Check if a currency is active
 */
export function isCurrencyActive(code: CurrencyCode): boolean {
  return ACTIVE_CURRENCIES.includes(code);
}

/**
 * Fetch live exchange rates from an API
 * Uncomment and configure when ready to use live rates
 * 
 * Example APIs:
 * - https://api.exchangerate-api.com/v4/latest/USD
 * - https://api.fixer.io/latest?base=USD
 * - https://openexchangerates.org/api/latest.json
 */
export async function fetchExchangeRates(): Promise<Record<CurrencyCode, number>> {
  // Uncomment to enable live rates:
  /*
  try {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    
    return {
      USD: 1,
      INR: data.rates.INR || EXCHANGE_RATES.INR,
      EUR: data.rates.EUR || EXCHANGE_RATES.EUR,
      GBP: data.rates.GBP || EXCHANGE_RATES.GBP,
      AUD: data.rates.AUD || EXCHANGE_RATES.AUD,
      CAD: data.rates.CAD || EXCHANGE_RATES.CAD,
    };
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return EXCHANGE_RATES;
  }
  */
  
  // Return static rates for now
  return EXCHANGE_RATES;
}
