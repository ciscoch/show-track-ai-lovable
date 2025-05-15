
import { useState } from "react";
import { Badge as BadgeType } from "@/types/models";
import BadgeCollection from "@/components/badges/BadgeCollection";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// Mock data - in a real app, this would come from an API
const mockBadges: BadgeType[] = [
  {
    id: "1",
    name: "Early Adopter",
    description: "One of the first users to join Stock Show Manager",
    icon: "award",
    earnedAt: "2025-01-15",
    category: "special",
    type: "gold"
  },
  {
    id: "2",
    name: "Weight Tracking Streak - 7 Days",
    description: "Logged animal weights for 7 consecutive days",
    icon: "trophy",
    earnedAt: "2025-02-10",
    category: "streak",
    type: "bronze"
  },
  {
    id: "3",
    name: "Feed Logging Streak - 14 Days",
    description: "Recorded feeding schedules for 14 consecutive days",
    icon: "trophy",
    earnedAt: "2025-03-05",
    category: "streak",
    type: "silver"
  },
  {
    id: "4",
    name: "Master Tracker",
    description: "Logged expenses at least once per week for 30 consecutive days",
    icon: "trophy",
    earnedAt: "2025-03-31",
    category: "streak",
    type: "gold"
  },
  {
    id: "5",
    name: "Show Champion",
    description: "Won first place at a livestock show",
    icon: "award",
    earnedAt: null,
    category: "achievement",
    type: "platinum"
  }
];

interface BadgesTabProps {
  friendId?: string;
  friendName?: string;
}

const BadgesTab = ({ friendId, friendName }: BadgesTabProps) => {
  const [badges, setBadges] = useState<BadgeType[]>(mockBadges);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    
    toast({
      title: notificationsEnabled 
        ? "Notifications disabled" 
        : "Notifications enabled",
      description: notificationsEnabled 
        ? `You won't receive notifications when ${friendName} earns badges.` 
        : `You'll be notified when ${friendName} earns new badges.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {friendName ? `${friendName}'s Badges` : "My Badges"}
        </h2>
        
        {friendId && (
          <Button 
            variant={notificationsEnabled ? "default" : "outline"}
            onClick={toggleNotifications}
          >
            {notificationsEnabled ? "Notifications On" : "Get Notifications"}
          </Button>
        )}
      </div>
      
      <BadgeCollection badges={badges} />
    </div>
  );
};

export default BadgesTab;
