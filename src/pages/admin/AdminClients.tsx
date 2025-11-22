import { useEffect, useState } from "react";
import { Mail, User as UserIcon, Calendar, Shield, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { api } from "@/db/api";
import { toast } from "sonner";
import BackButton from "@/components/common/BackButton";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useNavigate } from "react-router-dom";
import type { Profile } from "@/types";

interface UserProfile extends Profile {
  orderCount?: number;
  totalSpent?: number;
}

export default function AdminClients() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { adminLogout } = useAdminAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(
        (user) =>
          user.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  const fetchUsers = async () => {
    try {
      // Fetch all user profiles from the database
      const profiles = await api.profiles.getAll();
      
      // Fetch all orders to calculate order statistics
      const orders = await api.orders.getAll();
      
      // Create a map to store order statistics per user
      const orderStatsMap = new Map<string, { count: number; total: number }>();
      
      orders.forEach((order: any) => {
        if (order.user_id) {
          const existing = orderStatsMap.get(order.user_id);
          if (existing) {
            existing.count += 1;
            existing.total += order.total_amount / 100;
          } else {
            orderStatsMap.set(order.user_id, {
              count: 1,
              total: order.total_amount / 100,
            });
          }
        }
      });
      
      // Combine profile data with order statistics
      const usersWithStats = profiles.map((profile: Profile) => {
        const stats = orderStatsMap.get(profile.id);
        return {
          ...profile,
          orderCount: stats?.count || 0,
          totalSpent: stats?.total || 0,
        };
      });
      
      // Sort by creation date (newest first)
      const sortedUsers = usersWithStats.sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      
      setUsers(sortedUsers);
      setFilteredUsers(sortedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load user profiles");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    adminLogout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const getRoleBadgeColor = (role: string) => {
    return role === "admin" ? "bg-red-500" : "bg-blue-500";
  };

  const totalUsers = users.length;
  const adminUsers = users.filter(u => u.role === "admin").length;
  const regularUsers = users.filter(u => u.role === "user").length;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BackButton />
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">User Profiles</h1>
            <p className="text-muted-foreground mt-2">View all registered users and their profiles</p>
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
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">Registered accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Admin Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{adminUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">Administrator accounts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Regular Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{regularUsers}</div>
              <p className="text-xs text-muted-foreground mt-1">Standard accounts</p>
            </CardContent>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>

        {/* Users List */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading user profiles...</p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">
                {searchTerm ? "No users found matching your search" : "No registered users found"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <UserIcon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-bold text-xl">
                              {user.full_name || "No Name"}
                            </h3>
                            <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                              {user.role.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            User ID: {user.id.substring(0, 8)}...
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          <span>{user.email || "No email"}</span>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Joined {new Date(user.created_at).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Shield className="w-4 h-4" />
                          <span>{user.orderCount || 0} orders placed</span>
                        </div>

                        {user.totalSpent !== undefined && user.totalSpent > 0 && (
                          <div className="flex items-center space-x-2 text-sm">
                            <span className="text-muted-foreground">Total Spent:</span>
                            <span className="font-bold text-primary">
                              ${user.totalSpent.toFixed(2)}
                            </span>
                          </div>
                        )}
                      </div>
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
