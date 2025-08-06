import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigationItems = [
    { label: "Home", href: "/" },
    { label: "Business Pitch", href: "/register-business-pitch" },
    { label: "Exhibition", href: "/book-vendor-stand" },
    { label: "Free Pass", href: "/get-free-pass" },
    { label: "Dinner Tickets", href: "/buy-dinner-ticket" },
    { label: "Vote Now", href: "/voting" },
    { label: "Dashboard", href: "/login" },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <div className="bg-gradient-primary p-2 rounded-lg mr-3">
              <span className="text-primary-foreground font-bold text-xl">OYF</span>
            </div>
            <div className="hidden md:block">
              <h1 className="font-bold text-lg text-foreground">Oyo Youth Festival</h1>
              <p className="text-xs text-muted-foreground">Made in Ibadan 2025</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                size="sm"
                onClick={() => navigate(item.href)}
                className="text-foreground hover:text-festival-green"
              >
                {item.label}
              </Button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.href}
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigate(item.href);
                    setIsMenuOpen(false);
                  }}
                  className="justify-start text-foreground hover:text-festival-green"
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;