
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import LoginButton from "@/components/LoginButton";
import { useAppContext } from "@/contexts/AppContext";
import NavigationMenu from "@/components/NavigationMenu";
import { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NavigationProps {
  navigationItems?: {
    path: string;
    label: string;
    icon: LucideIcon;
  }[];
  user?: any;
}

const Navigation = ({ navigationItems = [], user }: NavigationProps) => {
  const location = useLocation();
  const { userSubscription } = useAppContext();

  // Check if current route is part of the buyer section
  const isBuyerRoute = location.pathname.startsWith("/buyer");

  // For debugging
  console.log("Navigation - Current user subscription:", userSubscription);
  console.log("Navigation - User object:", user);

  return (
    <Card className="rounded-none shadow-sm border-b">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/dashboard" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">
              Stock Show Manager
            </span>
          </Link>
          <NavigationMenu />
        </div>

        <div className="flex flex-1 items-center space-x-2 justify-between md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none block md:hidden">
            <NavigationMenu />
          </div>

          <div className="flex items-center gap-x-2">
            {!isBuyerRoute && userSubscription && (
              <Badge className={`py-1 px-2 ${
                userSubscription.level === 'elite' 
                  ? 'bg-primary' 
                  : userSubscription.level === 'pro' 
                    ? 'bg-accent' 
                    : 'bg-gray-600'
              }`}>
                {userSubscription.level.charAt(0).toUpperCase() + userSubscription.level.slice(1)} Plan
              </Badge>
            )}
            
            <LoginButton user={user} />

            <div className="hidden sm:block mx-2">
              <Link
                to={isBuyerRoute ? "/dashboard" : "/buyer/login"}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {isBuyerRoute ? "Producer View" : "Buyer Portal"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Navigation;
