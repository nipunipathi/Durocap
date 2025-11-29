import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { api } from "@/db/api";
import type { Order, RevenueStats } from "@/types";
import { toast } from "sonner";
import { format } from "date-fns";
import { DollarSign, ShoppingCart, Clock, TrendingUp, CheckCircle, XCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function AdminRevenue() {
  const [stats, setStats] = useState<RevenueStats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [pendingOrders, setPendingOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [notes, setNotes] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsResult, allOrders] = await Promise.all([
        api.orders.getRevenueStats(),
        api.orders.getAll(),
      ]);

      if (statsResult.success) {
        setStats(statsResult.data);
      }

      setOrders(allOrders);
      setPendingOrders(
        allOrders.filter((o) => o.payment_confirmation_status === "pending_confirmation")
      );
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      toast.error("Failed to load revenue data");
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmPayment = async () => {
    if (!selectedOrder) return;

    setProcessing(true);
    try {
      const result = await api.orders.confirmPayment(selectedOrder.id, notes);
      if (result.success) {
        toast.success("Payment confirmed successfully!");
        setConfirmDialogOpen(false);
        setNotes("");
        setSelectedOrder(null);
        await fetchData();
      } else {
        toast.error(result.message || "Failed to confirm payment");
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
      toast.error("Failed to confirm payment");
    } finally {
      setProcessing(false);
    }
  };

  const handleRejectPayment = async () => {
    if (!selectedOrder) return;

    setProcessing(true);
    try {
      const result = await api.orders.rejectPayment(selectedOrder.id, notes);
      if (result.success) {
        toast.success("Payment rejected");
        setRejectDialogOpen(false);
        setNotes("");
        setSelectedOrder(null);
        await fetchData();
      } else {
        toast.error(result.message || "Failed to reject payment");
      }
    } catch (error) {
      console.error("Error rejecting payment:", error);
      toast.error("Failed to reject payment");
    } finally {
      setProcessing(false);
    }
  };

  const openConfirmDialog = (order: Order) => {
    setSelectedOrder(order);
    setConfirmDialogOpen(true);
  };

  const openRejectDialog = (order: Order) => {
    setSelectedOrder(order);
    setRejectDialogOpen(true);
  };

  const getMonthlyRevenue = () => {
    const confirmedOrders = orders.filter((o) => o.payment_confirmation_status === "confirmed");
    const monthlyData: { [key: string]: number } = {};

    confirmedOrders.forEach((order) => {
      if (order.payment_confirmed_at) {
        const month = format(new Date(order.payment_confirmed_at), "MMM yyyy");
        monthlyData[month] = (monthlyData[month] || 0) + order.total_amount / 100;
      }
    });

    return Object.entries(monthlyData)
      .map(([month, revenue]) => ({ month, revenue }))
      .slice(-6);
  };

  const getOrderStatusData = () => {
    const statusCounts: { [key: string]: number } = {};
    orders.forEach((order) => {
      const status = order.payment_confirmation_status;
      statusCounts[status] = (statusCounts[status] || 0) + 1;
    });

    return [
      { name: "Confirmed", value: statusCounts.confirmed || 0, color: "#10b981" },
      { name: "Pending", value: statusCounts.pending_confirmation || 0, color: "#f59e0b" },
      { name: "Not Submitted", value: statusCounts.not_submitted || 0, color: "#6b7280" },
      { name: "Failed", value: statusCounts.payment_failed || 0, color: "#ef4444" },
    ];
  };

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Revenue Dashboard</h1>
        <div className="text-center py-12">Loading revenue data...</div>
      </div>
    );
  }

  return (
    <div className="p-4 xl:p-8">
      <h1 className="text-3xl font-bold mb-8">Revenue Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.total_revenue.toFixed(2) || "0.00"}</div>
            <p className="text-xs text-muted-foreground">From confirmed payments</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Confirmed Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.confirmed_orders || 0}</div>
            <p className="text-xs text-muted-foreground">Successfully confirmed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Confirmations</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.pending_orders || 0}</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats?.average_order_value.toFixed(2) || "0.00"}</div>
            <p className="text-xs text-muted-foreground">Per confirmed order</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getMonthlyRevenue()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={getOrderStatusData()}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {getOrderStatusData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Pending Confirmations */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Pending Payment Confirmations</CardTitle>
        </CardHeader>
        <CardContent>
          {pendingOrders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No pending payment confirmations
            </div>
          ) : (
            <div className="space-y-4">
              {pendingOrders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">Order #{order.id.slice(0, 8)}</h3>
                      <Badge className="bg-muted text-muted-foreground">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Customer: {order.customer_name || "Unknown"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Email: {order.customer_email || "N/A"}
                    </p>
                    <p className="text-sm font-medium mt-2">
                      Amount: ${(order.total_amount / 100).toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Submitted: {order.payment_submitted_at ? format(new Date(order.payment_submitted_at), "PPP") : "N/A"}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={() => openConfirmDialog(order)}
                      className="flex-1 xl:flex-none"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Confirm
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => openRejectDialog(order)}
                      className="flex-1 xl:flex-none"
                    >
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirm Dialog */}
      <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payment</DialogTitle>
            <DialogDescription>
              Are you sure you want to confirm this payment? This will add the order to total revenue.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-2 py-4">
              <p className="text-sm">
                <span className="font-medium">Order ID:</span> #{selectedOrder.id.slice(0, 8)}
              </p>
              <p className="text-sm">
                <span className="font-medium">Customer:</span> {selectedOrder.customer_name || "Unknown"}
              </p>
              <p className="text-sm">
                <span className="font-medium">Amount:</span> ${(selectedOrder.total_amount / 100).toFixed(2)}
              </p>
              <div className="pt-2">
                <label className="text-sm font-medium">Notes (optional)</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any notes about this confirmation..."
                  className="mt-2"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmDialogOpen(false)} disabled={processing}>
              Cancel
            </Button>
            <Button onClick={handleConfirmPayment} disabled={processing}>
              {processing ? "Confirming..." : "Confirm Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Payment</DialogTitle>
            <DialogDescription>
              Are you sure you want to reject this payment? The customer will be notified.
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-2 py-4">
              <p className="text-sm">
                <span className="font-medium">Order ID:</span> #{selectedOrder.id.slice(0, 8)}
              </p>
              <p className="text-sm">
                <span className="font-medium">Customer:</span> {selectedOrder.customer_name || "Unknown"}
              </p>
              <p className="text-sm">
                <span className="font-medium">Amount:</span> ${(selectedOrder.total_amount / 100).toFixed(2)}
              </p>
              <div className="pt-2">
                <label className="text-sm font-medium">Reason for rejection (optional)</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Explain why this payment is being rejected..."
                  className="mt-2"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setRejectDialogOpen(false)} disabled={processing}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectPayment} disabled={processing}>
              {processing ? "Rejecting..." : "Reject Payment"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
