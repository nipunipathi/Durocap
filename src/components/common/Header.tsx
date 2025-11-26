import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, ShoppingCart, LogIn, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cartUtils } from "@/lib/cart";
import { supabase } from "@/db/supabase";
import CurrencySwitcher from "@/components/common/CurrencySwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Update cart count on mount and when location changes
    const cart = cartUtils.getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartItemCount(totalItems);

    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, [location]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
    window.location.href = "/";
  };

  const navigation = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
    { name: "Projects", path: "/projects" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="text-primary-foreground shadow-lg sticky top-0 z-50 bg-[#0c0c0dff] bg-none">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#0c0c0dff] bg-none">
        <div className="flex justify-between h-20 bg-[#0c0c0dff] bg-none">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://miaoda-conversation-file.s3cdn.medo.dev/user-7fwukq22idq8/conv-7p9lig9vkiyo/20251126/file-7tmweuqklfy9.png" 
                alt="DuroCap Roofing Solutions" 
                className="h-10 xl:h-12 w-auto"
              />
            </Link>
          </div>

          <div className="hidden xl:flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-5 py-3 text-base font-bold rounded-lg transition-all ${
                  location.pathname === item.path
                    ? "bg-secondary text-secondary-foreground shadow-lg scale-105"
                    : "hover:bg-primary-light/80 hover:shadow-md hover:scale-105"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <div className="flex items-center space-x-2 ml-4">
              <CurrencySwitcher />
              
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="p-3 rounded-lg hover:bg-primary-light/80 hover:shadow-md hover:scale-105 transition-all"
                    title="My Profile"
                  >
                    <User className="w-5 h-5" />
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="font-bold bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link to="/login">
                  <Button variant="secondary" size="sm" className="font-bold">
                    <LogIn className="w-4 h-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
              
              <Link
                to="/cart"
                className="p-3 rounded-lg hover:bg-primary-light/80 hover:shadow-md hover:scale-105 transition-all relative"
                title="Shopping Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          <div className="xl:hidden flex items-center space-x-2">
            {isLoggedIn ? (
              <Link
                to="/profile"
                className="p-2 rounded-lg hover:bg-primary-light/80 transition-all"
                title="My Profile"
              >
                <User className="w-6 h-6" />
              </Link>
            ) : (
              <Link
                to="/login"
                className="p-2 rounded-lg hover:bg-primary-light/80 transition-all"
                title="Sign In"
              >
                <LogIn className="w-6 h-6" />
              </Link>
            )}
            
            <Link
              to="/cart"
              className="p-2 rounded-lg hover:bg-primary-light/80 transition-all relative"
              title="Shopping Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-primary-light/80 transition-all"
            >
              {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="xl:hidden pb-4 border-t-2 border-secondary/30 mt-2">
            <div className="flex flex-col space-y-2 pt-3">
              <div className="px-5 py-2">
                <CurrencySwitcher />
              </div>
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-5 py-4 text-base font-bold rounded-lg transition-all ${
                    location.pathname === item.path
                      ? "bg-secondary text-secondary-foreground shadow-lg"
                      : "hover:bg-primary-light/80 hover:shadow-md"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {isLoggedIn && (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="px-5 py-4 text-base font-bold rounded-lg transition-all hover:bg-primary-light/80 hover:shadow-md text-left"
                >
                  <LogOut className="w-4 h-4 inline mr-2" />
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
