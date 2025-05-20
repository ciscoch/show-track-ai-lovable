
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserActivityFeed from "@/components/buyer/UserActivityFeed";
import UsersList from "@/components/buyer/dashboard/UsersList";

interface Update {
  id: string;
  userId: string;
  userName: string;
  updateType: "weight" | "journal" | "photo" | "expense";
  animalName: string;
  animalId: string;
  date: string;
  details: string;
  read?: boolean;
}

interface ConnectedUser {
  id: string;
  name: string;
  email: string;
  animalCount: number;
  lastUpdate: string;
  updatesCount: number;
  image: string;
}

interface DashboardTabsProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  recentUpdates: Update[];
  onMarkRead: (id: string) => void;
  filteredUsers: ConnectedUser[];
  onConnectUser: () => void;
}

const DashboardTabs = ({ 
  activeTab, 
  setActiveTab, 
  recentUpdates,
  onMarkRead,
  filteredUsers,
  onConnectUser
}: DashboardTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
      <TabsList className="mb-4">
        <TabsTrigger value="updates">Recent Updates</TabsTrigger>
        <TabsTrigger value="users">Connected Users</TabsTrigger>
      </TabsList>
      
      <TabsContent value="updates">
        <UserActivityFeed updates={recentUpdates} onRead={onMarkRead} />
      </TabsContent>
      
      <TabsContent value="users">
        <UsersList users={filteredUsers} onConnectUser={onConnectUser} />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
