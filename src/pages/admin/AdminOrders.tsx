import { useEffect, useState } from "react";
import { format } from "date-fns";
import { LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/db/api";
import type { Order } from "@/types";
import { toast } from "sonner";
import BackButton from "@/components/common/BackButton";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useNavigate } from "react-router-dom";

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { adminLogout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleLogout = () => {
    adminLogout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const fetchOrders = async () => {
    try {
      const data = await api.orders.getAll();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      const data = await api.orders.getAll();
      setOrders(data);
      toast.success("Orders refreshed successfully");
    } catch (error) {
      console.error("Error refreshing orders:", error);
      toast.error("Failed to refresh orders");
    } finally {
      setRefreshing(false);
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

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Manage Orders</h1>
            <p className="text-muted-foreground mt-2">View and track customer orders</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">No orders found</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Order #{order.id.slice(0, 8)}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {format(new Date(order.created_at), "PPP")}
                      </p>
                    </div>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
