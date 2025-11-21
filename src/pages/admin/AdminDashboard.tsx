import { Link } from "react-router-dom";
import { Package, Wrench, FolderKanban, ShoppingCart, Mail, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/components/auth/useAuth";
import { Navigate } from "react-router-dom";

export default function AdminDashboard() {
  const { profile } = useAuth();

  if (profile?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  const adminLinks = [
    { title: "Products", icon: Package, path: "/admin/products", desc: "Manage product listings" },
    { title: "Services", icon: Wrench, path: "/admin/services", desc: "Manage services" },
    { title: "Projects", icon: FolderKanban, path: "/admin/projects", desc: "Manage project portfolio" },
    { title: "Orders", icon: ShoppingCart, path: "/admin/orders", desc: "View and manage orders" },
    { title: "Inquiries", icon: Mail, path: "/admin/inquiries", desc: "Manage contact inquiries" },
    { title: "Users", icon: Users, path: "/admin/users", desc: "Manage user accounts" },
  ];

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {adminLinks.map((link) => (
            <Link key={link.path} to={link.path}>
              <Card className="hover:shadow-hover transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-4">
                    <link.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <CardTitle>{link.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{link.desc}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
