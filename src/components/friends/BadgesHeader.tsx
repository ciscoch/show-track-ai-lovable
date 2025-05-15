
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface BadgesHeaderProps {
  title: string;
  friendId?: string;
  friendName?: string;
  notificationsEnabled: boolean;
  onToggleNotifications: () => void;
}

const BadgesHeader = ({ 
  title, 
  friendId, 
  friendName,
  notificationsEnabled, 
  onToggleNotifications 
}: BadgesHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold">{title}</h2>
      
      {friendId && (
        <Button 
          variant={notificationsEnabled ? "default" : "outline"}
          onClick={onToggleNotifications}
        >
          {notificationsEnabled ? "Notifications On" : "Get Notifications"}
        </Button>
      )}
    </div>
  );
};

export default BadgesHeader;
