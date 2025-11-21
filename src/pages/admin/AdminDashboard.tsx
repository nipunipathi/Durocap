import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BarChart3, Package, ShoppingBag, FileText, LayoutDashboard, LogOut, Users, RefreshCw, Mail, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { api } from "@/db/api";
import BackButton from "@/components/common/BackButton";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { toast } from "sonner";

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { adminLogout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const handleLogout = () => {
    adminLogout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const loadData = async () => {
    try {
      const [ordersData, productsData, servicesData, inquiriesData] = await Promise.all([
        api.orders.getAll(),
        api.products.getAll(),
        api.services.getAll(),
        api.contactInquiries.getAll(),
      ]);
      setOrders(ordersData);
      setProducts(productsData);
      setServices(servicesData);
      setInquiries(inquiriesData);
    } catch (error) {
      console.error("Error loading data:", error);
      toast.error("Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadData();
      toast.success("Dashboard refreshed successfully");
    } catch (error) {
      toast.error("Failed to refresh dashboard");
    } finally {
      setRefreshing(false);
    }
  };

  // Calculate sales data for charts
  const salesData = orders.reduce((acc: any[], order) => {
    const date = new Date(order.created_at).toLocaleDateString();
    const existing = acc.find(item => item.date === date);
    if (existing) {
      existing.sales += order.total_amount;
      existing.orders += 1;
    } else {
      acc.push({ date, sales: order.total_amount, orders: 1 });
    }
    return acc;
  }, []);

  // Calculate monthly revenue
  const monthlyData = orders.reduce((acc: any[], order) => {
    const month = new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const existing = acc.find(item => item.month === month);
    if (existing) {
      existing.revenue += order.total_amount;
      existing.orders += 1;
    } else {
      acc.push({ month, revenue: order.total_amount, orders: 1 });
    }
    return acc;
  }, []);

  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const totalServices = services.length;
  const newInquiries = inquiries.filter(inq => inq.status === 'new').length;
  const recentOrders = orders.slice(0, 5);
  const recentInquiries = inquiries.slice(0, 5);

  if (loading) {
    return (
      <div className="min-h-screen bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">Manage your roofing solutions business</p>
          </div>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={refreshing}
              size="lg"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" onClick={handleLogout} size="lg">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <BarChart3 className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">From {totalOrders} orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground mt-1">All time orders</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">New Inquiries</CardTitle>
              <Mail className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{newInquiries}</div>
              <p className="text-xs text-muted-foreground mt-1">Pending responses</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
              <Package className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground mt-1">Active products</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Services</CardTitle>
              <FileText className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalServices}</div>
              <p className="text-xs text-muted-foreground mt-1">Active services</p>
            </CardContent>
          </Card>
        </div>

        {/* Sales Visualization */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="daily" className="w-full">
              <TabsList>
                <TabsTrigger value="daily">Daily Sales</TabsTrigger>
                <TabsTrigger value="monthly">Monthly Revenue</TabsTrigger>
              </TabsList>

              <TabsContent value="daily" className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} name="Sales ($)" />
                    <Line type="monotone" dataKey="orders" stroke="hsl(var(--secondary))" strokeWidth={2} name="Orders" />
                  </LineChart>
                </ResponsiveContainer>
              </TabsContent>

              <TabsContent value="monthly" className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Revenue ($)" />
                    <Bar dataKey="orders" fill="hsl(var(--secondary))" name="Orders" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Recent Orders and Inquiries */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Orders</CardTitle>
              <Link to="/admin/orders">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentOrders.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No orders yet</p>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium">{order.customer_name || 'Guest'}</p>
                          <Badge variant={
                            order.status === 'completed' ? 'default' :
                            order.status === 'pending' ? 'secondary' :
                            order.status === 'cancelled' ? 'destructive' : 'outline'
                          }>
                            {order.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{order.customer_email}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {new Date(order.created_at).toLocaleString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${order.total_amount.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">
                          {Array.isArray(order.items) ? order.items.length : 0} items
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Inquiries */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Inquiries</CardTitle>
              <Link to="/admin/clients">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              {recentInquiries.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No inquiries yet</p>
              ) : (
                <div className="space-y-4">
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium">{inquiry.name}</p>
                            <Badge variant={inquiry.status === 'new' ? 'default' : 'secondary'}>
                              {inquiry.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                          {inquiry.phone && (
                            <p className="text-sm text-muted-foreground">{inquiry.phone}</p>
                          )}
                        </div>
                      </div>
                      {inquiry.subject && (
                        <p className="text-sm font-medium mb-1">{inquiry.subject}</p>
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {inquiry.message}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {new Date(inquiry.created_at).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Management Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <Link to="/admin/products">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Manage Products
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Add, edit, or remove products from your catalog</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/orders">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Manage Orders
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">View and manage customer orders</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/clients">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Manage Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">View and manage customer information</p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/admin/pages">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LayoutDashboard className="w-5 h-5 mr-2" />
                  Edit Pages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Edit content for all website pages</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
}
