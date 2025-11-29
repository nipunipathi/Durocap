import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/db/api";
import type { RazorpayPaymentResponse, Currency } from "@/types";
import { CreditCard, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/useAuth";
import { useNavigate } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string | null;
}

interface RazorpayPaymentFlowProps {
  cartItems: CartItem[];
  totalAmount: number;
  currency: Currency;
  onSuccess?: () => void;
}

export function RazorpayPaymentFlow({
  cartItems,
  totalAmount,
  currency,
  onSuccess,
}: RazorpayPaymentFlowProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

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

      toast.loading("Creating order...");

      const orderItems = cartItems.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image_url || undefined,
        product_id: item.id,
      }));

      const order = await api.orders.create({
        user_id: user?.id || null,
        items: orderItems,
        total_amount: totalAmount,
        currency: currency,
        payment_method: "razorpay",
        customer_email: user?.email || undefined,
        customer_name: user?.user_metadata?.full_name || undefined,
      });

      if (!order) {
        throw new Error("Failed to create order");
      }

      toast.dismiss();
      toast.loading("Initializing payment...");

      const orderResponse = await api.orders.createRazorpayOrder(
        order.id,
        totalAmount,
        currency,
        user?.email,
        user?.user_metadata?.full_name
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
        name: "DuroCap Roofing Solutions",
        description: `Order #${order.id.substring(0, 8)}`,
        order_id: razorpayOrder.id,
        handler: async (response: RazorpayPaymentResponse) => {
          try {
            toast.loading("Verifying payment...");

            const verifyResponse = await api.orders.verifyRazorpayPayment(
              order.id,
              response.razorpay_order_id,
              response.razorpay_payment_id,
              response.razorpay_signature
            );

            toast.dismiss();

            if (verifyResponse.success) {
              toast.success("Payment successful! Your order has been confirmed.");
              
              localStorage.removeItem("cart");
              
              if (onSuccess) {
                onSuccess();
              }
              
              setTimeout(() => {
                navigate("/orders");
              }, 1500);
            } else {
              throw new Error("Payment verification failed");
            }
          } catch (error) {
            toast.dismiss();
            const errorMessage = error instanceof Error ? error.message : "Payment verification failed";
            toast.error(errorMessage);
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: user?.user_metadata?.full_name || "",
          email: user?.email || "",
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
      });
    } catch (error) {
      setIsProcessing(false);
      toast.dismiss();
      const errorMessage = error instanceof Error ? error.message : "Failed to initiate payment";
      toast.error(errorMessage);
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
          Pay {currency === "INR" ? "₹" : "$"}{totalAmount.toFixed(2)} with Razorpay
        </>
      )}
    </Button>
  );
}
