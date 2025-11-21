import type { ReactNode } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import PaymentSuccess from "./pages/PaymentSuccess";
import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminPages from "./pages/admin/AdminPages";

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
    name: "Admin Dashboard",
    path: "/admin",
    element: <AdminDashboard />,
    visible: false,
  },
  {
    name: "Admin Products",
    path: "/admin/products",
    element: <AdminProducts />,
    visible: false,
  },
  {
    name: "Admin Orders",
    path: "/admin/orders",
    element: <AdminOrders />,
    visible: false,
  },
  {
    name: "Admin Pages",
    path: "/admin/pages",
    element: <AdminPages />,
    visible: false,
  },
];

export default routes;