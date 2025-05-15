
import React from "react";
import { Trophy, Award, Bell, Dumbbell, Camera, Medal, Star, Book, FileText, FileCheck } from "lucide-react";

interface BadgeIconProps {
  icon: string;
  className?: string;
}

const BadgeIcon = ({ icon, className = "h-4 w-4" }: BadgeIconProps) => {
  switch (icon) {
    case "trophy":
      return <Trophy className={className} />;
    case "award":
      return <Award className={className} />;
    case "bell":
      return <Bell className={className} />;
    case "dumbbell":
      return <Dumbbell className={className} />;
    case "camera":
      return <Camera className={className} />;
    case "medal":
      return <Medal className={className} />;
    case "star":
      return <Star className={className} />;
    case "book":
      return <Book className={className} />;
    case "file-text":
      return <FileText className={className} />;
    case "file-check":
      return <FileCheck className={className} />;
    default:
      return <Award className={className} />;
  }
};

export default BadgeIcon;
