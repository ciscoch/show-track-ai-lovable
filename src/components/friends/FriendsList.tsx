
import { useState } from "react";
import { Friend, Badge } from "@/types/models";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { mockBadges } from "@/data/mockBadges";
import FriendCard from "./FriendCard";
import FriendBadgesDialog from "./FriendBadgesDialog";
import BadgeNotificationsList from "./BadgeNotificationsList";
import EmptyFriendsList from "./EmptyFriendsList";

// Mock data - in a real app, this would come from an API
const mockFriends: Friend[] = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    avatarUrl: null,
    addedAt: "2025-01-15",
  },
  {
    id: "2",
    name: "Taylor Smith",
    email: "taylor@example.com",
    avatarUrl: null,
    addedAt: "2025-03-02",
  }
];

// Mock badges for each friend - using the same mockBadges data for all friends
const mockFriendBadges: Record<string, Badge[]> = {
  "1": mockBadges.filter((_, index) => index % 3 === 0), // Subset of badges
  "2": mockBadges.filter((_, index) => index % 2 === 0), // Different subset
};

const FriendsList = () => {
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [selectedFriendBadges, setSelectedFriendBadges] = useState<Badge[]>([]);
  const [showBadges, setShowBadges] = useState(false);
  const [notifications, setNotifications] = useState<{badge: Badge, friend: Friend}[]>([]);
  
  const removeFriend = (id: string) => {
    setFriends(friends.filter(friend => friend.id !== id));
  };
  
  const viewFriendBadges = (friend: Friend) => {
    setSelectedFriend(friend);
    // Set the badges for the selected friend
    setSelectedFriendBadges(mockFriendBadges[friend.id] || []);
    setShowBadges(true);
  };
  
  const dismissNotification = (index: number) => {
    setNotifications(notifications.filter((_, i) => i !== index));
  };
  
  // Simulate receiving a badge notification
  const simulateNewBadge = () => {
    if (friends.length === 0) return;
    
    const randomFriend = friends[Math.floor(Math.random() * friends.length)];
    const friendBadges = mockFriendBadges[randomFriend.id] || [];
    
    if (friendBadges.length > 0) {
      const randomBadge = {...friendBadges[Math.floor(Math.random() * friendBadges.length)]};
      randomBadge.earnedAt = new Date().toISOString(); // Set to now
      
      setNotifications([...notifications, { badge: randomBadge, friend: randomFriend }]);
      
      toast({
        title: `${randomFriend.name} earned a badge!`,
        description: `${randomBadge.name} - ${randomBadge.description}`,
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Friends</h2>
        
        {/* Button to simulate new badge notifications (for demo purposes) */}
        <Button 
          variant="outline" 
          onClick={simulateNewBadge}
        >
          Simulate Friend Badge
        </Button>
      </div>
      
      {/* Badge notifications */}
      {notifications.length > 0 && (
        <BadgeNotificationsList 
          notifications={notifications} 
          onDismiss={dismissNotification} 
        />
      )}
      
      {friends.length === 0 ? (
        <EmptyFriendsList />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {friends.map(friend => (
            <FriendCard 
              key={friend.id}
              friend={friend}
              badges={mockFriendBadges[friend.id] || []}
              onRemove={removeFriend}
              onViewBadges={viewFriendBadges}
            />
          ))}
        </div>
      )}
      
      {/* Dialog for viewing friend badges */}
      <FriendBadgesDialog
        friend={selectedFriend}
        open={showBadges}
        onOpenChange={setShowBadges}
      />
    </div>
  );
};

export default FriendsList;
