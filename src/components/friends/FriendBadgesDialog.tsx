
import { Friend } from "@/types/models";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BadgesTab from "./BadgesTab";
import { mockBadges } from "@/data/mockBadges";

interface FriendBadgesDialogProps {
  friend: Friend | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FriendBadgesDialog = ({ friend, open, onOpenChange }: FriendBadgesDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{friend?.name}'s Badges</DialogTitle>
          <DialogDescription>
            View all badges and achievements earned by {friend?.name}
          </DialogDescription>
        </DialogHeader>
        {friend && (
          <BadgesTab 
            friendId={friend.id} 
            friendName={friend.name}
            badges={mockBadges} // Pass the mock badges data directly
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FriendBadgesDialog;
