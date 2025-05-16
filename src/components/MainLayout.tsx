
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { Badge } from "@/components/ui/badge";
import LoginButton from "@/components/LoginButton";

import { 
  ArrowLeftIcon, 
  BookIcon, 
  CalendarIcon, 
  ChartBarIcon, 
  GalleryVerticalIcon, 
  HomeIcon, 
  SettingsIcon, 
  WeightIcon,
  UsersIcon
} from "lucide-react";
import Navigation from "@/components/Navigation";

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  hideNavigation?: boolean;
}

const MainLayout = ({ 
  children, 
  title, 
  showBackButton = true, 
  hideNavigation = false
}: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppContext();
  
  const navigationItems = [
    { path: "/", label: "Home", icon: HomeIcon },
    { path: "/weights", label: "Weights", icon: WeightIcon },
    { path: "/journal", label: "Journal", icon: BookIcon },
    { path: "/gallery", label: "Gallery", icon: GalleryVerticalIcon },
    { path: "/expenses", label: "Expenses", icon: ChartBarIcon },
    { path: "/schedule", label: "Schedule", icon: CalendarIcon },
    { path: "/friends", label: "Friends", icon: UsersIcon },
    { path: "/settings", label: "Settings", icon: SettingsIcon }
  ];
  
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
              <ArrowLeftIcon className="h-4 w-4" />
              <span className="sr-only md:not-sr-only">Back</span>
            </Button>
          )}
          
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Badge className={`py-1 px-3 text-xs ${
                user.subscriptionLevel === 'elite' 
                  ? 'bg-primary' 
                  : user.subscriptionLevel === 'pro' 
                    ? 'bg-accent' 
                    : 'bg-gray-600'
              }`}>
                {user.subscriptionLevel.charAt(0).toUpperCase() + user.subscriptionLevel.slice(1)} Plan
              </Badge>
              
              <Button variant="outline" onClick={() => navigate('/subscription')}>
                Manage Subscription
              </Button>
            </>
          ) : (
            <LoginButton 
              user={user} 
              className="shadow-md hover:shadow-lg transition-all" 
            />
          )}
        </div>
      </div>
      
      {!hideNavigation && (
        <Navigation navigationItems={navigationItems} user={user} />
      )}
      
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
