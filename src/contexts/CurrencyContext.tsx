import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {
  type CurrencyCode,
  type CurrencyConfig,
  DEFAULT_CURRENCY,
  getActiveCurrencies,
  getCurrencyConfig,
  isCurrencyActive,
} from "@/config/currencies";
import {
  convertPrice as convertPriceUtil,
  formatPrice as formatPriceUtil,
  getCurrencySymbol,
  getCurrencyName,
  getExchangeRate,
} from "@/lib/currency";

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (currency: CurrencyCode) => void;
  currencyConfig: CurrencyConfig;
  availableCurrencies: CurrencyConfig[];
  convertPrice: (price: number) => number;
  formatPrice: (price: number, options?: { showCode?: boolean; useLocale?: boolean }) => string;
  getCurrencySymbol: () => string;
  getCurrencyName: () => string;
  getExchangeRate: () => number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

const STORAGE_KEY = "preferred_currency";

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<CurrencyCode>(() => {
    // Load saved currency preference from localStorage
    const saved = localStorage.getItem(STORAGE_KEY) as CurrencyCode;
    
    // Validate saved currency is active
    if (saved && isCurrencyActive(saved)) {
      return saved;
    }
    
    return DEFAULT_CURRENCY;
  });

  useEffect(() => {
    // Save currency preference to localStorage
    localStorage.setItem(STORAGE_KEY, currency);
  }, [currency]);

  const setCurrency = (newCurrency: CurrencyCode) => {
    if (!isCurrencyActive(newCurrency)) {
      console.warn(`Currency ${newCurrency} is not active`);
      return;
    }
    setCurrencyState(newCurrency);
  };

  const currencyConfig = getCurrencyConfig(currency);
  const availableCurrencies = getActiveCurrencies();

  const convertPrice = (price: number): number => {
    return convertPriceUtil(price, currency);
  };

  const formatPrice = (
    price: number,
    options?: { showCode?: boolean; useLocale?: boolean }
  ): string => {
    const convertedPrice = convertPrice(price);
    return formatPriceUtil(convertedPrice, currency, options);
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        currencyConfig,
        availableCurrencies,
        convertPrice,
        formatPrice,
        getCurrencySymbol: () => getCurrencySymbol(currency),
        getCurrencyName: () => getCurrencyName(currency),
        getExchangeRate: () => getExchangeRate(currency),
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error("useCurrency must be used within a CurrencyProvider");
  }
  return context;
}
