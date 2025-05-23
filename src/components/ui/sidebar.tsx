
"use client"

import React, {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from "react"
import { AnimatePresence, motion } from "framer-motion"
import { X } from "lucide-react"
import { useMediaQuery } from "react-responsive"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

interface SidebarContextProps {
  open: boolean
  setOpen: (open: boolean) => void
  customWidth?: string
}

const SidebarContext = createContext<SidebarContextProps>({
  open: false,
  setOpen: () => { },
})

function SidebarProvider({
  children,
  defaultOpen = false,
  customWidth,
}: {
  children: ReactNode
  defaultOpen?: boolean
  customWidth?: string
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <SidebarContext.Provider value={{ open, setOpen, customWidth }}>
      {children}
    </SidebarContext.Provider>
  )
}

function useSidebar() {
  return useContext(SidebarContext)
}

function SidebarDesktop({
  children,
  className,
  defaultCollapsed = false,
}: {
  children: ReactNode
  className?: string
  defaultCollapsed?: boolean
}) {
  const { open, setOpen, customWidth } = useSidebar()
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  const isDesktop = useMediaQuery({ minWidth: 768 })

  useEffect(() => {
    if (isDesktop && !open) {
      setOpen(true)
    }
  }, [isDesktop])

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
        <AnimatePresence initial={false}>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: collapsed ? 80 : customWidth ? parseInt(customWidth) : 256 }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-full"
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
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  ) : null
}

function SidebarMobile({
  children,
  customWidth,
  side = "left",
  className,
}: {
  children: ReactNode
  customWidth?: string
  side?: "right" | "left"
  className?: string
}) {
  const { open, setOpen } = useSidebar()
  const isDesktop = useMediaQuery({ minWidth: 768 })

  useEffect(() => {
    if (isDesktop && open) {
      setOpen(false)
    }
  }, [isDesktop])

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
  ) : null
}

const SidebarToggle = forwardRef<
  HTMLButtonElement,
  HTMLAttributes<HTMLButtonElement> & { collapsed: boolean; setCollapsed: (collapsed: boolean) => void }
>(({ collapsed, setCollapsed, ...props }, ref) => {
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
  )
})
SidebarToggle.displayName = "SidebarToggle"

function ChevronIcon({ collapsed }: { collapsed: boolean }) {
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
  )
}

function SidebarFooter({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mt-auto w-full", className)}>
      {children}
    </div>
  )
}

function SidebarTrigger({ children }: { children: ReactNode }) {
  const { open, setOpen } = useSidebar()

  return (
    <SheetTrigger asChild onClick={() => setOpen(!open)}>
      {children}
    </SheetTrigger>
  )
}

export interface SidebarProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  defaultOpen?: boolean
  customWidth?: string
  className?: string
}

function Sidebar({ children, defaultOpen = false, customWidth, className }: SidebarProps) {
  return (
    <SidebarProvider defaultOpen={defaultOpen} customWidth={customWidth}>
      <div className={className}>
        {children}
      </div>
    </SidebarProvider>
  )
}

export {
  Sidebar,
  SidebarDesktop,
  SidebarMobile,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
}
