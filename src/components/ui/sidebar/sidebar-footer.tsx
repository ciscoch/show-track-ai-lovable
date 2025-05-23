
import React from "react";
import { cn } from "@/lib/utils";

interface SidebarFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function SidebarFooter({ children, className }: SidebarFooterProps) {
  return (
    <div className={cn("mt-auto w-full", className)}>
      {children}
    </div>
  );
}
