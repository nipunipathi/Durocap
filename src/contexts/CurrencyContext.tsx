import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Currency = "USD" | "INR";

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (price: number) => number;
  formatPrice: (price: number) => string;
  exchangeRate: number;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Exchange rate: 1 USD = 83 INR (approximate)
const USD_TO_INR_RATE = 83;

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(() => {
    // Load saved currency preference from localStorage
    const saved = localStorage.getItem("preferred_currency");
    return (saved as Currency) || "USD";
  });

  useEffect(() => {
    // Save currency preference to localStorage
    localStorage.setItem("preferred_currency", currency);
  }, [currency]);

  const convertPrice = (price: number): number => {
    if (currency === "INR") {
      return price * USD_TO_INR_RATE;
    }
    return price;
  };

  const formatPrice = (price: number): string => {
    const convertedPrice = convertPrice(price);
    
    if (currency === "INR") {
      return `₹${convertedPrice.toFixed(2)}`;
    }
    return `$${convertedPrice.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        convertPrice,
        formatPrice,
        exchangeRate: USD_TO_INR_RATE,
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
