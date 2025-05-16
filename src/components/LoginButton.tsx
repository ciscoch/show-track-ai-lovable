import { useNavigate } from "react-router-dom";
import { LogInIcon } from "lucide-react";

interface LoginButtonProps {
  user: any | null;
  className?: string;
  hideOnMobileAfterLogin?: boolean;
}

export const LoginButton = ({
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
    <div
      onClick={() => navigate("/login")}
      role="button"
      tabIndex={0}
      aria-label="Login"
      className={\`flex items-center gap-2 px-4 py-2 cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90 rounded-md shadow-md hover:shadow-lg transition-all \${className}\`}
    >
      <LogInIcon className="h-4 w-4" />
      <span>Login</span>
    </div>
  );
};

export default LoginButton;