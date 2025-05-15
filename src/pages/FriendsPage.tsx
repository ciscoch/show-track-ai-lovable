
import { useState } from "react";
import MainLayout from "@/components/MainLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FriendsList from "@/components/friends/FriendsList";
import AddFriendTab from "@/components/friends/AddFriendTab";
import QRCodeTab from "@/components/friends/QRCodeTab";

const FriendsPage = () => {
  return (
    <MainLayout title="Friends">
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">My Friends</TabsTrigger>
          <TabsTrigger value="add">Add Friend</TabsTrigger>
          <TabsTrigger value="qrcode">QR Code</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <FriendsList />
        </TabsContent>
        
        <TabsContent value="add" className="mt-6">
          <AddFriendTab />
        </TabsContent>
        
        <TabsContent value="qrcode" className="mt-6">
          <QRCodeTab />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default FriendsPage;
