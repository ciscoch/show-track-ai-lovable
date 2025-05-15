
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

const NotificationsTab = () => {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSetting[]>([
    {
      id: "weight-reminders",
      title: "Weight Tracking Reminders",
      description: "Receive reminders to track your animal's weight",
      enabled: true,
    },
    {
      id: "feeding-schedule",
      title: "Feeding Schedule Alerts",
      description: "Get notifications for upcoming feeding times",
      enabled: true,
    },
    {
      id: "show-deadlines",
      title: "Show Registration Deadlines",
      description: "Be notified when show registration deadlines approach",
      enabled: false,
    },
    {
      id: "app-updates",
      title: "App Updates",
      description: "Receive notifications about new features and updates",
      enabled: true,
    },
    // Add the new badge notification setting
    {
      id: "friend-badges",
      title: "Friend Badge Notifications",
      description: "Be notified when friends earn new badges",
      enabled: true,
    },
  ]);

  const toggleNotification = (id: string) => {
    setNotificationSettings((prev) =>
      prev.map((setting) => {
        if (setting.id === id) {
          const updated = { ...setting, enabled: !setting.enabled };
          
          // Show toast when notification setting changes
          toast({
            title: updated.enabled ? "Notification enabled" : "Notification disabled",
            description: updated.title
          });
          
          return updated;
        }
        return setting;
      })
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Notification Preferences</h3>
        <p className="text-sm text-muted-foreground">
          Configure how and when you receive notifications
        </p>
      </div>

      <div className="space-y-4">
        {notificationSettings.map((setting) => (
          <Card key={setting.id}>
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <h4 className="text-sm font-medium">{setting.title}</h4>
                <p className="text-sm text-muted-foreground">{setting.description}</p>
              </div>
              <Switch
                checked={setting.enabled}
                onCheckedChange={() => toggleNotification(setting.id)}
                aria-label={`Toggle ${setting.title}`}
              />
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Email Frequency</CardTitle>
          <CardDescription>Control how often you receive email notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="daily-digest" className="text-sm font-medium">Daily Digest</label>
              <Switch id="daily-digest" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="weekly-summary" className="text-sm font-medium">Weekly Summary</label>
              <Switch id="weekly-summary" />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="immediate-alerts" className="text-sm font-medium">Immediate Important Alerts</label>
              <Switch id="immediate-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="badge-alerts" className="text-sm font-medium">Badge Achievement Alerts</label>
              <Switch id="badge-alerts" defaultChecked />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsTab;
