import { DollarSign, IndianRupee } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/contexts/CurrencyContext";

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useCurrency();

  const toggleCurrency = () => {
    setCurrency(currency === "USD" ? "INR" : "USD");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleCurrency}
      className="font-bold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all"
      title={`Switch to ${currency === "USD" ? "INR" : "USD"}`}
    >
      {currency === "USD" ? (
        <>
          <DollarSign className="w-4 h-4 mr-1" />
          USD
        </>
      ) : (
        <>
          <IndianRupee className="w-4 h-4 mr-1" />
          INR
        </>
      )}
    </Button>
  );
}
