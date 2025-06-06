
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { Badge } from "@/types/models";
import { mockBadges } from "@/data/mockBadges";
import BuckleShowcaseSection from "./BuckleShowcaseSection";
import BadgesHeader from "./BadgesHeader";
import BadgeGrid from "./BadgeGrid";

interface BadgesTabProps {
  friendId?: string;
  friendName?: string;
  badges?: Badge[]; // Make badges optional
}

const BadgesTab = ({ friendId, friendName, badges: propBadges }: BadgesTabProps) => {
  // Use provided badges or fallback to mockBadges
  const [badges] = useState(propBadges || mockBadges);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    
    toast({
      title: notificationsEnabled 
        ? "Notifications disabled" 
        : "Notifications enabled",
      description: notificationsEnabled 
        ? `You won't receive notifications when ${friendName || 'friends'} earn badges.` 
        : `You'll be notified when ${friendName || 'friends'} earn new badges.`,
    });
  };
  
  return (
    <div className="space-y-8">
      {/* Buckle Showcase Carousel */}
      <BuckleShowcaseSection 
        badges={badges}
        title={friendName ? `${friendName}'s Buckle Collection` : "My Buckle Collection"} 
      />
      
      <Separator />
      
      <BadgesHeader 
        title={friendName ? `${friendName}'s Badges` : "My Badges"}
        friendId={friendId}
        friendName={friendName}
        notificationsEnabled={notificationsEnabled}
        onToggleNotifications={toggleNotifications}
      />
      
      <BadgeGrid badges={badges} />
    </div>
  );
};

export default BadgesTab;
