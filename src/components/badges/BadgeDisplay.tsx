
import React from "react";
import { Badge } from "@/types/models";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge as UiBadge } from "@/components/ui/badge";
import { Trophy, Award, Bell, Dumbbell, Camera, Medal } from "lucide-react";
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
    case "dumbbell":
      return <Dumbbell className="h-4 w-4" />;
    case "camera":
      return <Camera className="h-4 w-4" />;
    case "medal":
      return <Medal className="h-4 w-4" />;
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
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12",
  };
  
  const badgeIconSize = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const yearBuckleSize = {
    sm: "h-5 w-5",
    md: "h-6 w-6", 
    lg: "h-7 w-7",
  };

  const yearTextSize = {
    sm: "text-[10px]",
    md: "text-xs",
    lg: "text-sm",
  };
  
  // Get buckle color based on badge type
  const buckleColor = {
    bronze: "bg-amber-600 border-amber-700 text-white",
    silver: "bg-gray-400 border-gray-500 text-white",
    gold: "bg-yellow-500 border-yellow-600 text-white",
    platinum: "bg-indigo-600 border-indigo-700 text-white",
  }[badge.type];

  return (
    <div 
      className="relative group" 
      title={`${badge.name} ${badge.year ? `(${badge.year})` : ''}`}
    >
      <div 
        className={cn(
          "rounded-full flex items-center justify-center", 
          sizeClasses[size]
        )}
      >
        {/* Base circle with border */}
        <div className={cn(
          "absolute inset-0 rounded-full border-2",
          {
            "border-amber-600": badge.type === "bronze",
            "border-gray-400": badge.type === "silver",
            "border-yellow-500": badge.type === "gold",
            "border-indigo-600": badge.type === "platinum",
          }
        )}></div>
        
        {/* Badge icon */}
        <div className="absolute inset-0 rounded-full bg-primary/10 flex items-center justify-center z-10">
          {React.cloneElement(getBadgeIcon(badge.icon), { className: badgeIconSize[size] })}
        </div>
        
        {/* Rodeo buckle with year */}
        {badge.year && (
          <div className={cn(
            "absolute -bottom-2 -right-2 flex items-center justify-center",
            "rounded-full shadow-md transform transition-transform group-hover:scale-110",
            "border-2 z-20",
            buckleColor,
            yearBuckleSize[size]
          )}>
            <span className={cn("font-bold", yearTextSize[size])}>
              {String(badge.year).slice(-2)}
            </span>
            {/* Decorative elements for rodeo buckle */}
            <div className="absolute inset-0 rounded-full border border-white/30"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BadgeDisplay;
