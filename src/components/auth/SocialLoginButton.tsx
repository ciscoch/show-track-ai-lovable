
import { Button } from "@/components/ui/button";
import { Github, Apple } from "lucide-react";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { logger } from "@/lib/logger";

interface SocialLoginButtonProps {
  provider: "google" | "apple" | "github";
}

const SocialLoginButton = ({ provider }: SocialLoginButtonProps) => {
  const handleLogin = () => {
    // In a real app, this would trigger OAuth flow
    logger.info(`Login with ${provider}`);
  };

  return (
    <Button
      variant="outline"
      type="button"
      onClick={handleLogin}
      className="w-full"
    >
      {provider === "google" && (
        <>
          <GoogleIcon className="mr-2 h-4 w-4" />
          Google
        </>
      )}
      {provider === "apple" && (
        <>
          <Apple className="mr-2 h-4 w-4" />
          Apple
        </>
      )}
      {provider === "github" && (
        <>
          <Github className="mr-2 h-4 w-4" />
          Github
        </>
      )}
    </Button>
  );
};

export default SocialLoginButton;
