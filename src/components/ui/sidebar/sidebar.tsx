
import React, { type HTMLAttributes } from "react";
import { SidebarProvider } from "./sidebar-context";

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  defaultOpen?: boolean;
  customWidth?: string;
  className?: string;
}

export function Sidebar({ 
  children, 
  defaultOpen = false, 
  customWidth, 
  className 
}: SidebarProps) {
  return (
    <SidebarProvider defaultOpen={defaultOpen} customWidth={customWidth}>
      <div className={className}>
        {children}
      </div>
    </SidebarProvider>
  );
}
