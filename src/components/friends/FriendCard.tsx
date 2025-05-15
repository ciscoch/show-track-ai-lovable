
import { Friend, Badge } from "@/types/models";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import BadgeDisplay from "../badges/BadgeDisplay";

interface FriendCardProps {
  friend: Friend;
  badges: Badge[];
  onRemove: (id: string) => void;
  onViewBadges: (friend: Friend) => void;
}

const FriendCard = ({ friend, badges, onRemove, onViewBadges }: FriendCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={friend.avatarUrl || undefined} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-semibold">{friend.name}</h3>
            <p className="text-sm text-muted-foreground">{friend.email}</p>
            
            {/* Display badges */}
            {badges.length > 0 && (
              <div className="flex gap-1 mt-2">
                {badges.slice(0, 3).map(badge => (
                  <BadgeDisplay key={badge.id} badge={badge} size="sm" />
                ))}
                {badges.length > 3 && (
                  <div className="text-xs bg-muted rounded-full px-2 flex items-center">
                    +{badges.length - 3}
                  </div>
                )}
              </div>
            )}
            
            <div className="flex gap-2 mt-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onViewBadges(friend)}
              >
                View Badges
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onRemove(friend.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FriendCard;
