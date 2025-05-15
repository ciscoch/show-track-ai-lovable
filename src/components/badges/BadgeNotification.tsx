
import { useState } from "react";
import { Badge, Friend } from "@/types/models";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, Share2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import BadgeDisplay from "./BadgeDisplay";

interface BadgeNotificationProps {
  badge: Badge;
  friendName: string;
  friendAvatar?: string;
  onDismiss: () => void;
}

const BadgeNotification = ({ badge, friendName, friendAvatar, onDismiss }: BadgeNotificationProps) => {
  // Get badge color class based on type
  const getBadgeColorClass = (type: Badge["type"]) => {
    switch (type) {
      case "bronze": return "text-amber-600";
      case "silver": return "text-gray-400";
      case "gold": return "text-yellow-500";
      case "platinum": return "text-indigo-600";
      default: return "text-primary";
    }
  };

  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="mb-4 animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Award className={`h-4 w-4 ${getBadgeColorClass(badge.type)}`} />
          <span>{friendName} earned a new badge!</span>
        </CardTitle>
        <CardDescription>
          {new Date(badge.earnedAt || Date.now()).toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={friendAvatar || undefined} />
            <AvatarFallback>{friendName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium">
              {badge.name}
              {badge.year && <span className="text-xs ml-1">({badge.year})</span>}
            </p>
            <p className="text-sm text-muted-foreground">{badge.description}</p>
          </div>
          <div className="flex-shrink-0">
            <BadgeDisplay badge={badge} size="md" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onDismiss}>
          Dismiss
        </Button>
        <Dialog open={showDetails} onOpenChange={setShowDetails}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              Congratulate
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Congratulate {friendName}</DialogTitle>
              <DialogDescription>Send a congratulatory message for earning the {badge.name} badge</DialogDescription>
            </DialogHeader>
            <div className="p-4 flex justify-center">
              <BadgeDisplay badge={badge} size="lg" />
            </div>
            <Button onClick={() => {
              toast({
                title: "Congratulation sent!",
                description: `You congratulated ${friendName} on earning the ${badge.name} badge!`
              });
              setShowDetails(false);
            }}>
              Send Congratulations
            </Button>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default BadgeNotification;
