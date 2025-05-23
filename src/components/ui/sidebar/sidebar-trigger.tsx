
import React from "react";
import { SheetTrigger } from "@/components/ui/sheet";
import { useSidebar } from "./sidebar-context";

interface SidebarTriggerProps {
  children: React.ReactNode;
}

export function SidebarTrigger({ children }: SidebarTriggerProps) {
  const { open, setOpen } = useSidebar();

  return (
    <SheetTrigger asChild onClick={() => setOpen(!open)}>
      {children}
    </SheetTrigger>
  );
}
