
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Bell, Home, User, LogOut } from "lucide-react";
import { getItem, removeItem } from "@/platform/storage";

interface BuyerLayoutProps {
  children: React.ReactNode;
  title?: string;
  notificationBell?: React.ReactNode;
}

const BuyerLayout = ({ children, title, notificationBell }: BuyerLayoutProps) => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    removeItem("buyerLoggedIn");
    removeItem("buyerEmail");
    navigate("/buyer/login");
  };
  
  // Check if buyer is logged in
  const isLoggedIn = getItem("buyerLoggedIn") === "true";
  const buyerEmail = getItem("buyerEmail") || "Buyer";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            className="font-bold text-lg"
            onClick={() => navigate("/buyer/dashboard")}
          >
            Stock Show Buyer Portal
          </Button>
          
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/buyer/dashboard")}
              aria-label="Home"
            >
              <Home className="h-5 w-5" />
            </Button>
            
            {notificationBell ? (
              notificationBell
            ) : (
              <Button variant="ghost" size="icon" aria-label="Notifications">
                <Bell className="h-5 w-5" />
              </Button>
            )}
            
            <span className="hidden md:inline-block text-sm text-muted-foreground">
              {buyerEmail}
            </span>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden md:inline-block">Logout</span>
            </Button>
          </div>
        </div>
      </header>
      
      {title && (
        <div className="bg-muted/50">
          <div className="container mx-auto px-4 py-3">
            <h1 className="text-2xl font-bold">{title}</h1>
          </div>
        </div>
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      <footer className="border-t bg-white">
        <div className="container mx-auto px-4 py-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Stock Show Manager - Buyer Portal
        </div>
      </footer>
    </div>
  );
};

export default BuyerLayout;
