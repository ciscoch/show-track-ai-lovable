
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Friend } from "@/types/models";

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

const FriendsList = () => {
  const [friends, setFriends] = useState<Friend[]>(mockFriends);
  
  const removeFriend = (id: string) => {
    setFriends(friends.filter(friend => friend.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Friends</h2>
      
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
          {friends.map(friend => (
            <Card key={friend.id}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={friend.avatarUrl || undefined} />
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{friend.name}</h3>
                    <p className="text-sm text-muted-foreground">{friend.email}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => removeFriend(friend.id)}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FriendsList;
