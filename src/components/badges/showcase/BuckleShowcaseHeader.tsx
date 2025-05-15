
import React from "react";
import { Award } from "lucide-react";

interface BuckleShowcaseHeaderProps {
  title: string;
  badgeCount: number;
}

const BuckleShowcaseHeader = ({ title, badgeCount }: BuckleShowcaseHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="flex items-center text-sm text-muted-foreground">
        <Award className="h-4 w-4 mr-1" />
        <span>{badgeCount} buckles earned</span>
      </div>
    </div>
  );
};

export default BuckleShowcaseHeader;
