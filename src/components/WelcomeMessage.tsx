
import { User } from "@/types/models";

type WelcomeMessageProps = {
  user: User | null;
};

const WelcomeMessage = ({ user }: WelcomeMessageProps) => {
  if (!user) return null;
  
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold text-muted-foreground">
        Welcome, {user.firstName} {user.lastName}
      </h2>
    </div>
  );
};

export default WelcomeMessage;
