
import { Button } from "@/components/ui/button";
import { Facebook, Github, Apple } from "lucide-react";

interface SocialLoginButtonProps {
  provider: "google" | "apple" | "github";
}

const SocialLoginButton = ({ provider }: SocialLoginButtonProps) => {
  const handleLogin = () => {
    // In a real app, this would trigger OAuth flow
    console.log(`Login with ${provider}`);
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
          <Facebook className="mr-2 h-4 w-4" /> {/* Using Facebook icon for Google */}
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
