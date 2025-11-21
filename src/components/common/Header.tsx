import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import routes from "../../routes";
import { useAuth } from "@/components/auth/useAuth";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const navigation = routes.filter((route) => route.visible !== false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const cartItemCount = 0;

  return (
    <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center">
                <span className="text-secondary-foreground font-bold text-sm">DC</span>
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-base font-bold">DUROCAP</span>
                <span className="text-xs opacity-80">ROOFING SOLUTIONS</span>
              </div>
            </Link>
          </div>

          <div className="hidden xl:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  location.pathname === item.path
                    ? "bg-primary-light text-primary-foreground"
                    : "hover:bg-primary-light/50"
                }`}
              >
                {item.name}
              </Link>
            ))}
            
            <Link to="/cart" className="relative p-2 hover:bg-primary-light/50 rounded-md transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" className="hover:bg-primary-light/50">
                    <User className="w-5 h-5 mr-2" />
                    {profile?.full_name || user.email}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-48">
                  <div className="space-y-2">
                    <Link to="/orders">
                      <Button variant="ghost" className="w-full justify-start">
                        My Orders
                      </Button>
                    </Link>
                    {profile?.role === "admin" && (
                      <Link to="/admin">
                        <Button variant="ghost" className="w-full justify-start">
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Link to="/login">
                <Button variant="secondary" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          <div className="xl:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-primary-light/50"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="xl:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.path
                      ? "bg-primary-light text-primary-foreground"
                      : "hover:bg-primary-light/50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary-light/50 flex items-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Cart {cartItemCount > 0 && `(${cartItemCount})`}
              </Link>
              {user ? (
                <>
                  <Link
                    to="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary-light/50"
                  >
                    My Orders
                  </Link>
                  {profile?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary-light/50"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="px-3 py-2 text-sm font-medium rounded-md hover:bg-primary-light/50 text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium rounded-md bg-secondary text-secondary-foreground hover:bg-secondary-light"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
