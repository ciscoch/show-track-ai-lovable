
import { Card, CardContent } from "@/components/ui/card";

const EmptyFriendsList = () => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="text-center py-8">
          <p className="text-muted-foreground">No friends added yet. Add friends using the "Add Friend" tab.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default EmptyFriendsList;
