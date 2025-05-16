
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";

interface NavigationProps {
  navigationItems: {
    path: string;
    label: string;
    icon: React.ElementType;
  }[];
  user: any | null;
}

const Navigation = ({ navigationItems, user }: NavigationProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="mb-8 border-b overflow-x-auto">
      <div className="flex space-x-1 min-w-max items-center">
        {navigationItems.map(item => {
          const Icon = item.icon;
          return (
            <div
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-2 px-4 py-2 transition-colors hover:text-primary cursor-pointer ${
                location.pathname === item.path 
                  ? "border-b-2 border-primary text-primary font-medium" 
                  : "text-muted-foreground"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </div>
          );
        })}

        {!user && (
          <div
            onClick={handleLoginClick}
            className="flex items-center gap-2 px-4 py-2 transition-colors hover:text-primary ml-auto cursor-pointer text-primary font-medium"
          >
            <LogInIcon className="h-4 w-4" />
            <span>Login</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
