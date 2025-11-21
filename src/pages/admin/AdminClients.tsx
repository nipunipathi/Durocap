import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, ShoppingBag, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { api } from "@/db/api";
import { toast } from "sonner";
import BackButton from "@/components/common/BackButton";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useNavigate } from "react-router-dom";

interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate?: string;
}

export default function AdminClients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { adminLogout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = clients.filter(
        (client) =>
          client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClients(filtered);
    } else {
      setFilteredClients(clients);
    }
  }, [searchTerm, clients]);

  const fetchClients = async () => {
    try {
      const orders = await api.orders.getAll();
      
      // Group orders by customer email to create client profiles
      const clientMap = new Map<string, Client>();
      
      orders.forEach((order: any) => {
        const email = order.customer_email || "guest@example.com";
        const existing = clientMap.get(email);
        
        if (existing) {
          existing.totalOrders += 1;
          existing.totalSpent += order.total_amount / 100;
          if (!existing.lastOrderDate || new Date(order.created_at) > new Date(existing.lastOrderDate)) {
            existing.lastOrderDate = order.created_at;
          }
        } else {
          clientMap.set(email, {
            id: email,
            name: order.customer_name || "Guest Customer",
            email: email,
            phone: order.customer_phone,
            address: order.shipping_address,
            totalOrders: 1,
            totalSpent: order.total_amount / 100,
            lastOrderDate: order.created_at,
          });
        }
      });
      
      const clientsArray = Array.from(clientMap.values()).sort(
        (a, b) => b.totalSpent - a.totalSpent
      );
      
      setClients(clientsArray);
      setFilteredClients(clientsArray);
    } catch (error) {
      console.error("Error fetching clients:", error);
      toast.error("Failed to load clients");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    adminLogout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getClientTier = (totalSpent: number) => {
    if (totalSpent >= 1000) return { label: "VIP", color: "bg-yellow-500" };
    if (totalSpent >= 500) return { label: "Gold", color: "bg-orange-500" };
    if (totalSpent >= 200) return { label: "Silver", color: "bg-gray-400" };
    return { label: "Bronze", color: "bg-amber-700" };
  };

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Manage Clients</h1>
            <p className="text-muted-foreground mt-2">View and manage customer information</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{clients.length}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered customers</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${clients.reduce((sum, client) => sum + client.totalSpent, 0).toFixed(2)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">From all clients</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${clients.length > 0
                  ? (
                      clients.reduce((sum, client) => sum + client.totalSpent, 0) /
                      clients.reduce((sum, client) => sum + client.totalOrders, 0)
                    ).toFixed(2)
                  : "0.00"}
              </div>
              <p className="text-xs text-muted-foreground mt-1">Per order</p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search clients by name, email, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Clients List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading clients...</p>
          </div>
        ) : filteredClients.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                {searchTerm ? "No clients found matching your search" : "No clients found"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredClients.map((client) => {
              const tier = getClientTier(client.totalSpent);
              return (
                <Card key={client.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="font-bold text-xl">{client.name}</h3>
                          <Badge className={`${tier.color} text-white`}>
                            {tier.label}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <Mail className="w-4 h-4" />
                            <span>{client.email}</span>
                          </div>

                          {client.phone && (
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <Phone className="w-4 h-4" />
                              <span>{client.phone}</span>
                            </div>
                          )}

                          {client.address && (
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              <span className="line-clamp-1">{client.address}</span>
                            </div>
                          )}

                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <ShoppingBag className="w-4 h-4" />
                            <span>{client.totalOrders} orders</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-6">
                          <div>
                            <p className="text-xs text-muted-foreground">Total Spent</p>
                            <p className="text-lg font-bold text-primary">
                              ${client.totalSpent.toFixed(2)}
                            </p>
                          </div>
                          {client.lastOrderDate && (
                            <div>
                              <p className="text-xs text-muted-foreground">Last Order</p>
                              <p className="text-sm font-medium">
                                {new Date(client.lastOrderDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
