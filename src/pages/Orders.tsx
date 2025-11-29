import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { api } from "@/db/api";
import type { Order, PaymentMethod } from "@/types";
import { useAuth } from "@/components/auth/useAuth";
import { toast } from "sonner";
import { CheckCircle, Clock, XCircle, CreditCard, QrCode, Wallet } from "lucide-react";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [submittingPayment, setSubmittingPayment] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const data = await api.orders.getByUserId(user.id);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        toast.error("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const handleSubmitPayment = async (orderId: string) => {
    setSubmittingPayment(orderId);
    try {
      const result = await api.orders.submitPaymentConfirmation(orderId);
      if (result.success) {
        toast.success("Payment confirmation submitted! Waiting for admin approval.");
        const updatedOrders = await api.orders.getByUserId(user!.id);
        setOrders(updatedOrders);
      } else {
        toast.error(result.message || "Failed to submit payment confirmation");
      }
    } catch (error) {
      console.error("Error submitting payment:", error);
      toast.error("Failed to submit payment confirmation");
    } finally {
      setSubmittingPayment(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-secondary text-secondary-foreground";
      case "pending":
        return "bg-muted text-muted-foreground";
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPaymentStatusBadge = (paymentStatus: string) => {
    switch (paymentStatus) {
      case "confirmed":
        return (
          <Badge className="bg-secondary text-secondary-foreground">
            <CheckCircle className="w-3 h-3 mr-1" />
            Payment Confirmed
          </Badge>
        );
      case "pending_confirmation":
        return (
          <Badge className="bg-muted text-muted-foreground">
            <Clock className="w-3 h-3 mr-1" />
            Awaiting Confirmation
          </Badge>
        );
      case "payment_failed":
        return (
          <Badge className="bg-destructive text-destructive-foreground">
            <XCircle className="w-3 h-3 mr-1" />
            Payment Failed
          </Badge>
        );
      default:
        return null;
    }
  };

  const getPaymentMethodBadge = (paymentMethod: PaymentMethod) => {
    switch (paymentMethod) {
      case "razorpay":
        return (
          <Badge variant="outline" className="border-[#528FF0] text-[#528FF0]">
            <Wallet className="w-3 h-3 mr-1" />
            Razorpay
          </Badge>
        );
      case "manual":
      case "qr_code":
        return (
          <Badge variant="outline" className="border-primary text-primary">
            <QrCode className="w-3 h-3 mr-1" />
            Manual Payment
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            <CreditCard className="w-3 h-3 mr-1" />
            {paymentMethod || "Stripe"}
          </Badge>
        );
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">My Orders</h1>
          <p className="text-muted-foreground">Please sign in to view your orders</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">My Orders</h1>
          <div className="text-center py-12">Loading orders...</div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-8">My Orders</h1>
          <div className="text-center py-12 text-muted-foreground">
            You haven't placed any orders yet
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">My Orders</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order.id}>
              <CardHeader>
                <div className="flex flex-col xl:flex-row xl:justify-between xl:items-start gap-4">
                  <div>
                    <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {format(new Date(order.created_at), "PPP")}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                    {getPaymentStatusBadge(order.payment_confirmation_status)}
                    {order.payment_method && getPaymentMethodBadge(order.payment_method)}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        ${((item.price / 100) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="border-t pt-4 flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>${(order.total_amount / 100).toFixed(2)}</span>
                  </div>

                  {order.payment_confirmation_status === "not_submitted" && order.status === "pending" && (
                    <div className="border-t pt-4">
                      <Button
                        onClick={() => handleSubmitPayment(order.id)}
                        disabled={submittingPayment === order.id}
                        className="w-full"
                      >
                        {submittingPayment === order.id ? "Submitting..." : "I Have Made Payment"}
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Click this button after completing your payment. Admin will verify and confirm.
                      </p>
                    </div>
                  )}

                  {order.payment_confirmation_status === "pending_confirmation" && (
                    <div className="border-t pt-4">
                      <div className="bg-muted p-4 rounded-lg text-center">
                        <Clock className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="font-medium">Payment Confirmation Pending</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Your payment is being reviewed by our admin team.
                        </p>
                      </div>
                    </div>
                  )}

                  {order.payment_confirmation_status === "confirmed" && (
                    <div className="border-t pt-4">
                      <div className="bg-secondary/10 p-4 rounded-lg text-center">
                        <CheckCircle className="w-8 h-8 mx-auto mb-2 text-secondary" />
                        <p className="font-medium">Payment Confirmed</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Confirmed on {order.payment_confirmed_at ? format(new Date(order.payment_confirmed_at), "PPP") : "N/A"}
                        </p>
                      </div>
                    </div>
                  )}

                  {order.payment_confirmation_status === "payment_failed" && (
                    <div className="border-t pt-4">
                      <div className="bg-destructive/10 p-4 rounded-lg text-center">
                        <XCircle className="w-8 h-8 mx-auto mb-2 text-destructive" />
                        <p className="font-medium">Payment Not Confirmed</p>
                        {order.payment_notes && (
                          <p className="text-sm text-muted-foreground mt-1">
                            Note: {order.payment_notes}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
