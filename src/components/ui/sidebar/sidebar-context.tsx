
import React, { createContext, useContext, useState } from "react";

interface SidebarContextProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  customWidth?: string;
}

const SidebarContext = createContext<SidebarContextProps>({
  open: false,
  setOpen: () => {},
  customWidth: undefined,
});

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
  customWidth?: string;
}

export function SidebarProvider({
  children,
  defaultOpen = false,
  customWidth,
}: SidebarProviderProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <SidebarContext.Provider value={{ open, setOpen, customWidth }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
