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
            
            <Link to="/cart" className="relative p-3 hover:bg-primary-light/80 rounded-lg transition-all hover:scale-105 ml-2">
              <ShoppingCart className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-md">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="lg" className="hover:bg-primary-light/80 hover:scale-105 font-bold ml-2">
                    <User className="w-5 h-5 mr-2" />
                    {profile?.full_name || user.email}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    <Link to="/orders">
                      <Button variant="ghost" className="w-full justify-start font-semibold">
                        My Orders
                      </Button>
                    </Link>
                    {profile?.role === "admin" && (
                      <Link to="/admin">
                        <Button variant="ghost" className="w-full justify-start font-semibold">
                          Admin Dashboard
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-destructive hover:text-destructive font-semibold"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Link to="/login" className="ml-2">
                <Button variant="secondary" size="lg" className="font-bold shadow-md hover:shadow-lg hover:scale-105 transition-all">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          <div className="xl:hidden flex items-center space-x-2">
            <Link to="/cart" className="relative p-2 hover:bg-primary-light/80 rounded-lg transition-all">
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
              <div className="border-t border-primary-light/30 my-2"></div>
              {user ? (
                <>
                  <Link
                    to="/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="px-5 py-4 text-base font-bold rounded-lg hover:bg-primary-light/80 hover:shadow-md transition-all"
                  >
                    My Orders
                  </Link>
                  {profile?.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="px-5 py-4 text-base font-bold rounded-lg hover:bg-primary-light/80 hover:shadow-md transition-all"
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="px-5 py-4 text-base font-bold rounded-lg hover:bg-primary-light/80 hover:shadow-md transition-all text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="px-5 py-4 text-base font-bold rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg transition-all"
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
