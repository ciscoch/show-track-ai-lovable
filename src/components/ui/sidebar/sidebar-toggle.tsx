
import React, { forwardRef, type HTMLAttributes } from "react";
import { Button } from "@/components/ui/button";
import { ChevronIcon } from "./chevron-icon";

interface SidebarToggleProps extends HTMLAttributes<HTMLButtonElement> {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const SidebarToggle = forwardRef<HTMLButtonElement, SidebarToggleProps>(
  ({ collapsed, setCollapsed, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="rounded-full"
        {...props}
      >
        <ChevronIcon collapsed={collapsed} />
      </Button>
    );
  }
);

SidebarToggle.displayName = "SidebarToggle";
