
import { User } from "@/types/models";
import { Button } from "@/components/ui/button";
import WelcomeMessage from "./WelcomeMessage";

type EmptyAnimalsStateProps = {
  user: User | null;
  onAddAnimal: () => void;
};

const EmptyAnimalsState = ({ user, onAddAnimal }: EmptyAnimalsStateProps) => {
  return (
    <div className="text-center py-12">
      <WelcomeMessage user={user} />
      
      <div className="rounded-full bg-muted w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <span className="text-3xl">🐄</span>
      </div>
      <h2 className="text-2xl font-bold mb-2">No Animals Yet</h2>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Add your first animal to start tracking weights, body composition, and show preparation.
      </p>
      <Button onClick={onAddAnimal}>Add Your First Animal</Button>
    </div>
  );
};

export default EmptyAnimalsState;
