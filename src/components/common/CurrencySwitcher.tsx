import { DollarSign, IndianRupee, Euro, PoundSterling } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCurrency } from "@/contexts/CurrencyContext";
import type { CurrencyCode } from "@/config/currencies";

// Currency icon mapping
const CURRENCY_ICONS: Record<CurrencyCode, React.ComponentType<{ className?: string }>> = {
  USD: DollarSign,
  INR: IndianRupee,
  EUR: Euro,
  GBP: PoundSterling,
  AUD: DollarSign,
  CAD: DollarSign,
};

export default function CurrencySwitcher() {
  const { currency, setCurrency, availableCurrencies, currencyConfig } = useCurrency();

  // If only 2 currencies, use toggle button
  if (availableCurrencies.length === 2) {
    const otherCurrency = availableCurrencies.find((c) => c.code !== currency);
    if (!otherCurrency) return null;

    const CurrentIcon = CURRENCY_ICONS[currency];
    const OtherIcon = CURRENCY_ICONS[otherCurrency.code];

    return (
      <Button
        variant="outline"
        size="sm"
        onClick={() => setCurrency(otherCurrency.code)}
        className="font-bold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all"
        title={`Switch to ${otherCurrency.name}`}
      >
        <CurrentIcon className="w-4 h-4 mr-1" />
        {currency}
      </Button>
    );
  }

  // If more than 2 currencies, use dropdown menu
  const CurrentIcon = CURRENCY_ICONS[currency];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="font-bold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all"
        >
          <CurrentIcon className="w-4 h-4 mr-1" />
          {currency}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {availableCurrencies.map((curr) => {
          const Icon = CURRENCY_ICONS[curr.code];
          return (
            <DropdownMenuItem
              key={curr.code}
              onClick={() => setCurrency(curr.code)}
              className={`cursor-pointer ${
                curr.code === currency ? "bg-accent" : ""
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              <span className="flex-1">{curr.name}</span>
              <span className="text-muted-foreground text-sm">{curr.symbol}</span>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
