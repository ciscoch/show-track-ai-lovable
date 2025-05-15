
import React from "react";
import { Badge } from "@/types/models";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge as UiBadge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import BadgeIcon from "../icons/BadgeIcon";
import { getBadgeColor } from "../utils/badgeStyles";

interface BadgeDetailsCardProps {
  badge: Badge;
  size?: "sm" | "md" | "lg";
}

const BadgeDetailsCard = ({ badge, size = "md" }: BadgeDetailsCardProps) => {
  return (
    <Card className="hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">{badge.name}</CardTitle>
          <div className="flex items-center gap-1">
            {badge.year && (
              <span className="text-xs text-muted-foreground">{badge.year}</span>
            )}
            <UiBadge className={cn("capitalize", getBadgeColor(badge.type))}>
              {badge.type}
            </UiBadge>
          </div>
        </div>
        <CardDescription>{badge.category}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <div className={cn("p-2 rounded-full bg-primary/10", size === "lg" ? "p-3" : "p-2")}>
            <BadgeIcon icon={badge.icon} />
          </div>
          <div>
            <p className="text-sm">{badge.description}</p>
            {badge.earnedAt && (
              <p className="text-xs text-muted-foreground mt-1">
                Earned on {new Date(badge.earnedAt).toLocaleDateString()}
                {badge.year ? ` (${badge.year})` : ''}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BadgeDetailsCard;
