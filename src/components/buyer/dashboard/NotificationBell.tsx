import { useState } from "react";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Update {
  id: string;
  userName: string;
  details: string;
  read?: boolean;
}

interface NotificationBellProps {
  updates: Update[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
}

const NotificationBell = ({ updates, onMarkRead, onMarkAllRead }: NotificationBellProps) => {
  const [open, setOpen] = useState(false);
  const unreadCount = updates.filter(u => !u.read).length;

  return (
    <DropdownMenu open={open} onOpenChange={(v) => { setOpen(v); if (v) onMarkAllRead(); }}>
      <DropdownMenuTrigger asChild>
        <button className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive text-white text-[10px] flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72">
        {updates.length === 0 ? (
          <div className="p-2 text-sm text-muted-foreground">No recent activity</div>
        ) : (
          updates.map((update) => (
            <DropdownMenuItem
              key={update.id}
              onSelect={() => onMarkRead(update.id)}
              className={cn("flex flex-col space-y-0.5", !update.read && "bg-muted")}
            >
              <span className="text-sm font-medium">{update.userName}</span>
              <span className="text-xs text-muted-foreground line-clamp-2">{update.details}</span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
