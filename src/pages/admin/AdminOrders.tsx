import { useEffect, useState } from "react";
import { format } from "date-fns";
import { LogOut, RefreshCw, XCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
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

  const handleCancelOrder = async () => {
    if (!selectedOrderId) return;
    
    setActionLoading(true);
    try {
      await api.orders.updateStatus(selectedOrderId, "cancelled");
      setOrders(orders.map(order => 
        order.id === selectedOrderId 
          ? { ...order, status: "cancelled" as const }
          : order
      ));
      toast.success("Order cancelled successfully");
      setCancelDialogOpen(false);
      setSelectedOrderId(null);
    } catch (error) {
      console.error("Error cancelling order:", error);
      toast.error("Failed to cancel order");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteOrder = async () => {
    if (!selectedOrderId) return;
    
    setActionLoading(true);
    try {
      await api.orders.delete(selectedOrderId);
      setOrders(orders.filter(order => order.id !== selectedOrderId));
      toast.success("Order deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedOrderId(null);
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order");
    } finally {
      setActionLoading(false);
    }
  };

  const openCancelDialog = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCancelDialogOpen(true);
  };

  const openDeleteDialog = (orderId: string) => {
    setSelectedOrderId(orderId);
    setDeleteDialogOpen(true);
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
                    
                    {/* Action Buttons */}
                    <div className="border-t pt-4 flex gap-3 justify-end">
                      {order.status !== "cancelled" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openCancelDialog(order.id)}
                          className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                        >
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel Order
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openDeleteDialog(order.id)}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Order
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Cancel Order Confirmation Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this order? This will change the order status to "cancelled". 
              The order will remain in the system but marked as cancelled.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelOrder}
              disabled={actionLoading}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {actionLoading ? "Cancelling..." : "Yes, Cancel Order"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Order Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Order</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to permanently delete this order? This action cannot be undone. 
              All order data will be removed from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteOrder}
              disabled={actionLoading}
              className="bg-destructive hover:bg-destructive/90"
            >
              {actionLoading ? "Deleting..." : "Yes, Delete Order"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
