
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { User } from "lucide-react";
import { Friend, Badge } from "@/types/models";
import BadgesTab from "./BadgesTab";
import BadgeDisplay from "../badges/BadgeDisplay";
import BadgeNotification from "../badges/BadgeNotification";
import { toast } from "@/hooks/use-toast";

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

// Mock badges for each friend
const mockFriendBadges: Record<string, Badge[]> = {
  "1": [
    {
      id: "101",
      name: "Show Champion",
      description: "Won first place at a livestock show",
      icon: "trophy",
      earnedAt: "2025-02-20",
      category: "achievement",
      type: "gold"
    },
    {
      id: "102",
      name: "Feed Logging Streak - 30 Days",
      description: "Recorded feeding schedules for 30 consecutive days",
      icon: "trophy",
      earnedAt: "2025-01-30",
      category: "streak",
      type: "gold"
    }
  ],
  "2": [
    {
      id: "201",
      name: "Early Adopter",
      description: "One of the first users to join Stock Show Manager",
      icon: "award",
      earnedAt: "2025-01-10",
      category: "special",
      type: "gold"
    }
  ]
};

const FriendsList = () => {
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [showBadges, setShowBadges] = useState(false);
  const [notifications, setNotifications] = useState<{badge: Badge, friend: Friend}[]>([]);
  
  const removeFriend = (id: string) => {
    setFriends(friends.filter(friend => friend.id !== id));
  };
  
  const viewFriendBadges = (friend: Friend) => {
    setSelectedFriend(friend);
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
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-medium">Recent Badge Notifications</h3>
          
          {notifications.map((notification, index) => (
            <BadgeNotification
              key={index}
              badge={notification.badge}
              friendName={notification.friend.name}
              friendAvatar={notification.friend.avatarUrl || undefined}
              onDismiss={() => dismissNotification(index)}
            />
          ))}
        </div>
      )}
      
      {friends.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No friends added yet. Add friends using the "Add Friend" tab.</p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {friends.map(friend => {
            const friendBadges = mockFriendBadges[friend.id] || [];
            return (
              <Card key={friend.id}>
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
                      {friendBadges.length > 0 && (
                        <div className="flex gap-1 mt-2">
                          {friendBadges.slice(0, 3).map(badge => (
                            <BadgeDisplay key={badge.id} badge={badge} size="sm" />
                          ))}
                          {friendBadges.length > 3 && (
                            <div className="text-xs bg-muted rounded-full px-2 flex items-center">
                              +{friendBadges.length - 3}
                            </div>
                          )}
                        </div>
                      )}
                      
                      <div className="flex gap-2 mt-3">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => viewFriendBadges(friend)}
                        >
                          View Badges
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => removeFriend(friend.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      
      {/* Dialog for viewing friend badges */}
      <Dialog open={showBadges} onOpenChange={setShowBadges}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedFriend?.name}'s Badges</DialogTitle>
          </DialogHeader>
          {selectedFriend && (
            <BadgesTab 
              friendId={selectedFriend.id} 
              friendName={selectedFriend.name}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FriendsList;
