
import React from "react";
import { cn } from "@/lib/utils";

interface ChevronIconProps {
  collapsed: boolean;
}

export function ChevronIcon({ collapsed }: ChevronIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        "h-4 w-4 transition-transform duration-300",
        collapsed ? "rotate-0" : "rotate-180"
      )}
    >
      <polyline points={collapsed ? "9 18 15 12 9 6" : "15 6 9 12 15 18"} />
    </svg>
  );
}
