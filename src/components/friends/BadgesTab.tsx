
import { useState } from "react";
import { Badge as BadgeType } from "@/types/models";
import BadgeDisplay from "@/components/badges/BadgeDisplay";
import BuckleShowcase from "@/components/badges/BuckleShowcase";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

// Mock data - in a real app, this would come from an API
const mockBadges: BadgeType[] = [
  {
    id: "1",
    name: "Early Adopter",
    description: "One of the first users to join Stock Show Manager",
    icon: "award",
    earnedAt: "2025-01-15",
    category: "special",
    type: "gold",
    year: 2025
  },
  // Weight Tracking Badges
  {
    id: "2",
    name: "Weight Tracking Streak - 7 Days",
    description: "Logged animal weights for 7 consecutive days",
    icon: "trophy",
    earnedAt: "2025-02-10",
    category: "streak",
    type: "bronze",
    year: 2025
  },
  {
    id: "6",
    name: "Weight Tracking Streak - 14 Days",
    description: "Logged animal weights for 14 consecutive days",
    icon: "trophy",
    earnedAt: "2025-02-17",
    category: "streak",
    type: "silver",
    year: 2025
  },
  {
    id: "7",
    name: "Weight Tracking Streak - 30 Days",
    description: "Logged animal weights for 30 consecutive days",
    icon: "trophy",
    earnedAt: null,
    category: "streak",
    type: "gold",
    year: 2025
  },
  // Feed Logging Badges
  {
    id: "3",
    name: "Feed Logging Streak - 7 Days",
    description: "Recorded feeding schedules for 7 consecutive days",
    icon: "trophy",
    earnedAt: "2025-02-25",
    category: "streak",
    type: "bronze",
    year: 2025
  },
  {
    id: "8",
    name: "Feed Logging Streak - 14 Days",
    description: "Recorded feeding schedules for 14 consecutive days",
    icon: "trophy",
    earnedAt: "2025-03-05",
    category: "streak",
    type: "silver",
    year: 2025
  },
  {
    id: "9",
    name: "Feed Logging Streak - 30 Days",
    description: "Recorded feeding schedules for 30 consecutive days",
    icon: "trophy",
    earnedAt: null,
    category: "streak",
    type: "gold",
    year: 2025
  },
  {
    id: "4",
    name: "Master Tracker",
    description: "Logged expenses at least once per week for 30 consecutive days",
    icon: "trophy",
    earnedAt: "2025-03-31",
    category: "streak",
    type: "gold",
    year: 2025
  },
  {
    id: "5",
    name: "Show Champion",
    description: "Won first place at a livestock show",
    icon: "award",
    earnedAt: null,
    category: "achievement",
    type: "platinum",
    year: 2025
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
    <div className="space-y-8">
      {/* Buckle Showcase Carousel */}
      <div className="mt-2 mb-6">
        <BuckleShowcase 
          badges={badges} 
          title={friendName ? `${friendName}'s Buckle Collection` : "My Buckle Collection"} 
        />
      </div>
      
      <Separator />
      
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
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {badges.map((badge) => (
          <div key={badge.id} className="flex flex-col items-center gap-2">
            <BadgeDisplay badge={badge} size="md" />
            <span className="text-xs font-medium text-center">{badge.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgesTab;

