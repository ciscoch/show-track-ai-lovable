
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";
import { toast } from "@/hooks/use-toast";

interface LogoutButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const LogoutButton = ({
  variant = "ghost",
  size = "sm",
  className = ""
}: LogoutButtonProps) => {
  const navigate = useNavigate();
  const { setUser } = useAppContext();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
    
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account"
    });
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={`flex items-center gap-2 ${className}`}
    >
      <LogOut className="h-4 w-4" />
      <span>Logout</span>
    </Button>
  );
};

export default LogoutButton;
