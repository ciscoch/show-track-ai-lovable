
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { cn } from "@/lib/utils";
import { useSidebar } from "./sidebar-context";
import { SidebarToggle } from "./sidebar-toggle";

interface SidebarDesktopProps {
  children: React.ReactNode;
  className?: string;
  defaultCollapsed?: boolean;
}

export function SidebarDesktop({
  children,
  className,
  defaultCollapsed = false,
}: SidebarDesktopProps) {
  const { open, setOpen, customWidth } = useSidebar();
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (isDesktop && !open) {
      setOpen(true);
    }
  }, [isDesktop, open, setOpen]);

  return open && isDesktop ? (
    <div 
      className={cn(
        "relative h-full w-full overflow-hidden border-r transition-all duration-300", 
        collapsed ? "w-20" : customWidth ?? "w-64", 
        className
      )}
    >
      <div 
        className={cn(
          "h-full w-full overflow-y-auto transition-all duration-300",
          collapsed ? "w-20" : customWidth ?? "w-64"
        )}
      >
        <div
          style={{
            width: collapsed ? 80 : customWidth ? parseInt(customWidth) : 256,
            opacity: 1,
          }}
          className="h-full transition-all duration-300"
        >
          <div className="relative h-full">
            <div
              className={cn(
                "h-full w-full",
                !collapsed && "p-4"
              )}
            >
              {children}
            </div>
            <div className="absolute right-2 top-3">
              <SidebarToggle collapsed={collapsed} setCollapsed={setCollapsed} />
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}
