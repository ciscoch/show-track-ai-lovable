
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProfileTab from "@/components/settings/ProfileTab";
import PasswordTab from "@/components/settings/PasswordTab";
import SubscriptionTab from "@/components/settings/SubscriptionTab";
import NotificationsTab from "@/components/settings/NotificationsTab";
import { User } from "@/types/models";

const UserSettingsPage = () => {
  const { user, userSubscription } = useAppContext();
  
  const transformedUser: User = user ? {
    ...user,
    email: user.email || "",
    firstName: user.user_metadata?.first_name || "",
    lastName: user.user_metadata?.last_name || "",
    subscriptionLevel: "pro" as "free" | "pro" | "elite",
    createdAt: user.created_at || new Date().toISOString()
  } : {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    subscriptionLevel: "free" as "free" | "pro" | "elite",
    createdAt: new Date().toISOString()
  };

  const subscriptionWithFeatures = {
    ...userSubscription,
    level: userSubscription.level === "basic" ? "free" : userSubscription.level,
    features: []
  };
  
  return (
    <MainLayout title="User Settings" user={transformedUser}>
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
          <TabsTrigger value="subscription">Subscription</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="mt-6">
          <ProfileTab user={transformedUser} />
        </TabsContent>
        
        <TabsContent value="password" className="mt-6">
          <PasswordTab />
        </TabsContent>
        
        <TabsContent value="subscription" className="mt-6">
          <SubscriptionTab user={transformedUser} userSubscription={subscriptionWithFeatures} />
        </TabsContent>
        
        <TabsContent value="notifications" className="mt-6">
          <NotificationsTab />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default UserSettingsPage;
