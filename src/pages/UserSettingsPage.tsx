
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileTab from "@/components/settings/ProfileTab";
import PasswordTab from "@/components/settings/PasswordTab";
import SubscriptionTab from "@/components/settings/SubscriptionTab";
import NotificationsTab from "@/components/settings/NotificationsTab";

const UserSettingsPage = () => {
  const { user, userSubscription } = useAppContext();
  
  return (
    <MainLayout title="User Settings">
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <ProfileTab user={user} />
        </TabsContent>
        
        <TabsContent value="password" className="mt-6">
          <PasswordTab />
        </TabsContent>
        
        <TabsContent value="subscription" className="mt-6">
          <SubscriptionTab user={user} userSubscription={userSubscription} />
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <NotificationsTab />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default UserSettingsPage;
