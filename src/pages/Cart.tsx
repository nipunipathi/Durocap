import { useState, useEffect } from "react";
import BackButton from "@/components/common/BackButton";
import { useNavigate } from "react-router-dom";
import { Trash2, Plus, Minus, QrCode, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cartUtils } from "@/lib/cart";
import type { CartItem } from "@/types";
import { api } from "@/db/api";
import { toast } from "sonner";
import { useAuth } from "@/components/auth/useAuth";

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, session } = useAuth();

  useEffect(() => {
    setCart(cartUtils.getCart());
  }, []);

  const updateQuantity = (productId: string, newQuantity: number) => {
    const updatedCart = cartUtils.updateQuantity(productId, newQuantity);
    setCart(updatedCart);
  };

  const removeItem = (productId: string) => {
    const updatedCart = cartUtils.removeFromCart(productId);
    setCart(updatedCart);
    toast.success("Item removed from cart");
  };

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setLoading(true);
    try {
      const items = cart.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image_url: item.image_url || undefined,
        product_id: item.id,
      }));

      const token = session?.access_token;
      const response = await api.payment.createCheckout(items, token);

      if (response.data?.url) {
        window.open(response.data.url, "_blank");
      } else {
        throw new Error("No checkout URL received");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.message || "Failed to create checkout session");
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <BackButton />
          <div className="text-center mt-8">
            <h1 className="text-4xl font-bold mb-4">Shopping Cart</h1>
            <p className="text-muted-foreground mb-8">Your cart is empty</p>
            <Button onClick={() => navigate("/products")}>Browse Products</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        <h1 className="text-4xl font-bold mb-8 mt-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image_url || "https://via.placeholder.com/100"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-muted-foreground text-sm">{item.category}</p>
                      <p className="text-primary font-bold mt-1">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Tabs defaultValue="online" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="online" className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Online Payment
                    </TabsTrigger>
                    <TabsTrigger value="qr" className="flex items-center gap-2">
                      <QrCode className="w-4 h-4" />
                      QR Payment
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="online" className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Pay securely with credit card, debit card, or other payment methods via Stripe.
                    </p>
                    <Button
                      onClick={handleCheckout}
                      disabled={loading}
                      className="w-full"
                      size="lg"
                    >
                      {loading ? "Processing..." : "Proceed to Checkout"}
                    </Button>
                  </TabsContent>

                  <TabsContent value="qr" className="space-y-4">
                    <div className="bg-muted/30 rounded-lg p-4 text-center">
                      <div className="bg-white p-4 rounded-lg inline-block mb-3">
                        <img
                          src="https://miaoda-site-img.s3cdn.medo.dev/images/payment-qr-placeholder.png"
                          alt="Payment QR Code"
                          className="w-48 h-48 mx-auto"
                          onError={(e) => {
                            e.currentTarget.src = "https://via.placeholder.com/192x192?text=QR+Code";
                          }}
                        />
                      </div>
                      <p className="text-sm font-semibold mb-2">Scan to Pay</p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Scan this QR code with your UPI app or payment app to complete the payment
                      </p>
                      <div className="bg-background border rounded-lg p-3 text-left space-y-2">
                        <p className="text-xs font-semibold">After Payment:</p>
                        <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                          <li>Take a screenshot of payment confirmation</li>
                          <li>Contact us at <a href="tel:08593852223" className="text-primary hover:underline">085938 52223</a></li>
                          <li>Share your order details and payment proof</li>
                        </ol>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        toast.success("Please complete payment via QR code and contact us with payment proof");
                      }}
                      variant="secondary"
                      className="w-full"
                      size="lg"
                    >
                      I've Made the Payment
                    </Button>
                  </TabsContent>
                </Tabs>

                {!user && (
                  <p className="text-sm text-muted-foreground text-center">
                    You can checkout as a guest or{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className="text-primary hover:underline"
                    >
                      sign in
                    </button>
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
