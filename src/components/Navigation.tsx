
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
      <div className="flex justify-between items-center w-full min-w-max">
        <div className="flex space-x-1 items-center">
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
        </div>

        {!user && (
          <div className="ml-4">
            <Button
              onClick={handleLoginClick}
              className="flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
              size="sm"
            >
              <LogInIcon className="h-4 w-4" />
              <span>Login</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;
