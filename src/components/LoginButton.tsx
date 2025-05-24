
import { useNavigate } from "react-router-dom";
import { LogInIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginButtonProps {
  user: any | null;
  className?: string;
  hideOnMobileAfterLogin?: boolean;
}

const LoginButton = ({
  user,
  className = "",
  hideOnMobileAfterLogin = true,
}: LoginButtonProps) => {
  const navigate = useNavigate();

  // Hide button entirely if user is logged in & responsive hide is enabled
  if (user && hideOnMobileAfterLogin) {
    return null;
  }

  return (
    <Button
      onClick={() => navigate("/auth")}
      className={`flex items-center gap-2 ${className}`}
      variant="default"
      size="sm"
    >
      <LogInIcon className="h-4 w-4" />
      <span>Login</span>
    </Button>
  );
};

export default LoginButton;
