
import { Friend } from "@/types/models";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BadgesTab from "./BadgesTab";

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
        </DialogHeader>
        {friend && (
          <BadgesTab 
            friendId={friend.id} 
            friendName={friend.name}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FriendBadgesDialog;
