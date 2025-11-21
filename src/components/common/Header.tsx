import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, ShoppingCart } from "lucide-react";
import { cartUtils } from "@/lib/cart";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Update cart count on mount and when location changes
    const cart = cartUtils.getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    setCartItemCount(totalItems);
  }, [location]);

  const navigation = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ];

  return (
    <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="https://miaoda-conversation-file.s3cdn.medo.dev/user-7fwukq22idq8/conv-7p9lig9vkiyo/20251121/file-7paq17shhn28.png" 
                alt="DuroCap Roofing Solutions" 
                className="h-12 w-auto"
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
              <Link
                to="/profile"
                className="p-3 rounded-lg hover:bg-primary-light/80 hover:shadow-md hover:scale-105 transition-all"
                title="My Profile"
              >
                <User className="w-5 h-5" />
              </Link>
              
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
            <Link
              to="/profile"
              className="p-2 rounded-lg hover:bg-primary-light/80 transition-all"
              title="My Profile"
            >
              <User className="w-6 h-6" />
            </Link>
            
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
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
