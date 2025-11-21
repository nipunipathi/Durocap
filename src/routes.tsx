import type { ReactNode } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import UserProfile from "./pages/UserProfile";
import Orders from "./pages/Orders";
import PaymentSuccess from "./pages/PaymentSuccess";
import Login from "./pages/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminClients from "./pages/admin/AdminClients";
import AdminPages from "./pages/admin/AdminPages";
import ProtectedAdminRoute from "./components/auth/ProtectedAdminRoute";

interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "About Us",
    path: "/about",
    element: <About />,
  },
  {
    name: "Products",
    path: "/products",
    element: <Products />,
  },
  {
    name: "Services",
    path: "/services",
    element: <Services />,
  },
  {
    name: "Projects",
    path: "/projects",
    element: <Projects />,
  },
  {
    name: "Contact",
    path: "/contact",
    element: <Contact />,
  },
  {
    name: "Cart",
    path: "/cart",
    element: <Cart />,
    visible: false,
  },
  {
    name: "User Profile",
    path: "/profile",
    element: <UserProfile />,
    visible: false,
  },
  {
    name: "Orders",
    path: "/orders",
    element: <Orders />,
    visible: false,
  },
  {
    name: "Payment Success",
    path: "/payment-success",
    element: <PaymentSuccess />,
    visible: false,
  },
  {
    name: "Login",
    path: "/login",
    element: <Login />,
    visible: false,
  },
  {
    name: "Admin Login",
    path: "/admin/login",
    element: <AdminLogin />,
    visible: false,
  },
  {
    name: "Admin Dashboard",
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        <AdminDashboard />
      </ProtectedAdminRoute>
    ),
    visible: false,
  },
  {
    name: "Admin Products",
    path: "/admin/products",
    element: (
      <ProtectedAdminRoute>
        <AdminProducts />
      </ProtectedAdminRoute>
    ),
    visible: false,
  },
  {
    name: "Admin Orders",
    path: "/admin/orders",
    element: (
      <ProtectedAdminRoute>
        <AdminOrders />
      </ProtectedAdminRoute>
    ),
    visible: false,
  },
  {
    name: "Admin Clients",
    path: "/admin/clients",
    element: (
      <ProtectedAdminRoute>
        <AdminClients />
      </ProtectedAdminRoute>
    ),
    visible: false,
  },
  {
    name: "Admin Pages",
    path: "/admin/pages",
    element: (
      <ProtectedAdminRoute>
        <AdminPages />
      </ProtectedAdminRoute>
    ),
    visible: false,
  },
];

export default routes;