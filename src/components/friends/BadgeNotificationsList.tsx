
import { Badge, Friend } from "@/types/models";
import BadgeNotification from "../badges/BadgeNotification";

interface BadgeNotificationsListProps {
  notifications: { badge: Badge; friend: Friend }[];
  onDismiss: (index: number) => void;
}

const BadgeNotificationsList = ({ notifications, onDismiss }: BadgeNotificationsListProps) => {
  return (
    <div className="space-y-4 mb-6">
      <h3 className="text-lg font-medium">Recent Badge Notifications</h3>
      
      {notifications.map((notification, index) => (
        <BadgeNotification
          key={index}
          badge={notification.badge}
          friendName={notification.friend.name}
          friendAvatar={notification.friend.avatarUrl || undefined}
          onDismiss={() => onDismiss(index)}
        />
      ))}
    </div>
  );
};

export default BadgeNotificationsList;
