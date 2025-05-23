
import React, { useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useSidebar } from "./sidebar-context";

interface SidebarMobileProps {
  children: React.ReactNode;
  customWidth?: string;
  side?: "right" | "left";
  className?: string;
}

export function SidebarMobile({
  children,
  side = "left",
  className,
}: SidebarMobileProps) {
  const { open, setOpen } = useSidebar();
  const isDesktop = useMediaQuery({ minWidth: 768 });

  useEffect(() => {
    if (isDesktop && open) {
      setOpen(false);
    }
  }, [isDesktop, open, setOpen]);

  return !isDesktop ? (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side={side}
        className={cn("p-0", className)}
        hideX
      >
        <div className="relative h-full w-full">
          <div className="flex h-full w-full overflow-y-auto p-4">
            {children}
          </div>
          <div className="absolute right-3 top-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(false)}
              className="rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  ) : null;
}
