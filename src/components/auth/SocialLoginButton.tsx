
import { Button } from "@/components/ui/button";
import { Apple, Github, Google } from "lucide-react";

interface SocialLoginButtonProps {
  provider: "google" | "apple";
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
          <Google className="mr-2 h-4 w-4" />
          Google
        </>
      )}
      {provider === "apple" && (
        <>
          <Apple className="mr-2 h-4 w-4" />
          Apple
        </>
      )}
    </Button>
  );
};

export default SocialLoginButton;
