
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { LucideIcon } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  hideNavigation?: boolean;
  user?: any;
  navigationItems?: {
    path: string;
    label: string;
    icon: LucideIcon;
  }[];
}

const MainLayout = ({
  children,
  title,
  showBackButton = true,
  hideNavigation = false,
  user,
  navigationItems = []
}: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userSubscription } = useAppContext();

  const handleLoginClick = () => navigate("/login");

  const isBuyer = user?.role === "buyer";

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          {showBackButton && (
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="flex items-center gap-1"
            >
              ← <span className="sr-only md:not-sr-only">Back</span>
            </Button>
          )}

          <h1 className="text-3xl font-bold">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {userSubscription && !isBuyer && (
                <Badge className={`py-1 px-3 text-xs ${
                  userSubscription.level === 'elite' 
                    ? 'bg-primary' 
                    : userSubscription.level === 'pro' 
                      ? 'bg-accent' 
                      : 'bg-gray-600'
                }`}>
                  {userSubscription.level.charAt(0).toUpperCase() + userSubscription.level.slice(1)} Plan
                </Badge>
              )}

              {!isBuyer && (
                <Button variant="outline" onClick={() => navigate("/subscription")}>
                  Manage Subscription
                </Button>
              )}
            </>
          ) : (
            <Button
              variant="default"
              className="shadow-md hover:shadow-lg transition-all"
              onClick={handleLoginClick}
            >
              Login
            </Button>
          )}
        </div>
      </div>

      {!hideNavigation && navigationItems.length > 0 && (
        <Navigation navigationItems={navigationItems} user={user} />
      )}

      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
