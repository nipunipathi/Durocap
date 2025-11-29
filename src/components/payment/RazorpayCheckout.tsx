import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/db/api";
import type { RazorpayPaymentResponse } from "@/types";
import { CreditCard, Loader2 } from "lucide-react";

interface RazorpayCheckoutProps {
  orderId: string;
  amount: number;
  currency: "USD" | "INR";
  customerName?: string;
  customerEmail?: string;
  onSuccess: () => void;
  onError?: (error: string) => void;
}

export function RazorpayCheckout({
  orderId,
  amount,
  currency,
  customerName,
  customerEmail,
  onSuccess,
  onError,
}: RazorpayCheckoutProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    try {
      setIsProcessing(true);

      if (!window.Razorpay) {
        throw new Error("Razorpay SDK not loaded");
      }

      const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID;
      if (!razorpayKeyId || razorpayKeyId === "your_razorpay_key_id_here") {
        toast.error("Razorpay is not configured. Please contact support.");
        setIsProcessing(false);
        return;
      }

      toast.loading("Creating payment order...");

      const orderResponse = await api.orders.createRazorpayOrder(
        orderId,
        amount,
        currency,
        customerEmail,
        customerName
      );

      toast.dismiss();

      if (!orderResponse.success) {
        throw new Error(orderResponse.error || "Failed to create payment order");
      }

      const razorpayOrder = orderResponse.razorpayOrder;

      const options = {
        key: razorpayKeyId,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: "Roofing Solutions Hub",
        description: `Order #${orderId.substring(0, 8)}`,
        order_id: razorpayOrder.id,
        handler: async (response: RazorpayPaymentResponse) => {
          try {
            toast.loading("Verifying payment...");

            const verifyResponse = await api.orders.verifyRazorpayPayment(
              orderId,
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );

            toast.dismiss();

            if (verifyResponse.success) {
              toast.success("Payment successful! Your order has been confirmed.");
              onSuccess();
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            toast.dismiss();
            const errorMessage = error instanceof Error ? error.message : "Payment verification failed";
            toast.error(errorMessage);
            if (onError) onError(errorMessage);
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: customerName || "",
          email: customerEmail || "",
        },
        theme: {
          color: "#2C5F7C",
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
            toast.info("Payment cancelled");
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      razorpay.on("payment.failed", (response: { error: { description: string } }) => {
        setIsProcessing(false);
        const errorMessage = response.error.description || "Payment failed";
        toast.error(errorMessage);
        if (onError) onError(errorMessage);
      });
    } catch (error) {
      setIsProcessing(false);
      const errorMessage = error instanceof Error ? error.message : "Failed to initiate payment";
      toast.error(errorMessage);
      if (onError) onError(errorMessage);
    }
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={isProcessing}
      className="w-full bg-[#528FF0] hover:bg-[#3d7ad6] text-white"
      size="lg"
    >
      {isProcessing ? (
        <>
          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          <CreditCard className="w-5 h-5 mr-2" />
          Pay with Razorpay
        </>
      )}
    </Button>
  );
}
