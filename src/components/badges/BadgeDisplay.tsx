
import { Badge } from "@/types/models";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge as UiBadge } from "@/components/ui/badge";
import { Trophy, Award, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

interface BadgeDisplayProps {
  badge: Badge;
  size?: "sm" | "md" | "lg";
  showDetails?: boolean;
}

const getBadgeIcon = (icon: string) => {
  switch (icon) {
    case "trophy":
      return <Trophy className="h-4 w-4" />;
    case "award":
      return <Award className="h-4 w-4" />;
    case "bell":
      return <Bell className="h-4 w-4" />;
    default:
      return <Award className="h-4 w-4" />;
  }
};

const getBadgeColor = (type: Badge["type"]) => {
  switch (type) {
    case "bronze":
      return "bg-amber-600 hover:bg-amber-700";
    case "silver":
      return "bg-gray-400 hover:bg-gray-500";
    case "gold":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "platinum":
      return "bg-indigo-600 hover:bg-indigo-700";
    default:
      return "bg-primary hover:bg-primary/90";
  }
};

const BadgeDisplay = ({ badge, size = "md", showDetails = false }: BadgeDisplayProps) => {
  if (showDetails) {
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
              {getBadgeIcon(badge.icon)}
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
  }

  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  };

  return (
    <div className="relative" title={`${badge.name} ${badge.year ? `(${badge.year})` : ''}`}>
      <div className={cn("rounded-full p-2 bg-primary/10 flex items-center justify-center", 
        sizeClasses[size],
        "border-2", {
          "border-amber-600": badge.type === "bronze",
          "border-gray-400": badge.type === "silver",
          "border-yellow-500": badge.type === "gold",
          "border-indigo-600": badge.type === "platinum",
        })}>
        {getBadgeIcon(badge.icon)}
      </div>
      {badge.year && (
        <div className="absolute -bottom-1 -right-1 text-xs bg-background rounded-full w-4 h-4 flex items-center justify-center border border-gray-200 font-bold">
          {String(badge.year).slice(-2)}
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;
