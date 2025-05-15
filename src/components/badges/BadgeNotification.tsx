
import { useState } from "react";
import { Badge, Friend } from "@/types/models";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
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
  return (
    <Card className="mb-4 animate-fade-in">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
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
          <div>
            <p className="font-medium">{badge.name}</p>
            <p className="text-sm text-muted-foreground">{badge.description}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onDismiss}>
          Dismiss
        </Button>
        <Button variant="outline" size="sm">
          Congratulate
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BadgeNotification;
