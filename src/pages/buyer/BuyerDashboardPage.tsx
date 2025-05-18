
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { User, Users, Bell, Search, LogOut } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BuyerLayout from "@/components/buyer/BuyerLayout";
import UserActivityFeed from "@/components/buyer/UserActivityFeed";
import ConnectUserDialog from "@/components/buyer/ConnectUserDialog";
import { useAppContext } from "@/contexts/AppContext";

const BuyerDashboardPage = () => {
  const navigate = useNavigate();
  const { animals, journals, userSubscription } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  // Demo data for connected users
  const [connectedUsers, setConnectedUsers] = useState([
    { 
      id: "user1", 
      name: "John Smith", 
      email: "john@example.com", 
      animalCount: 3,
      lastUpdate: "2025-05-12",
      updatesCount: 5,
      image: "/placeholder.svg"
    },
    { 
      id: "user2", 
      name: "Sarah Miller", 
      email: "sarah@example.com", 
      animalCount: 2,
      lastUpdate: "2025-05-15",
      updatesCount: 2,
      image: "/placeholder.svg"
    }
  ]);
  
  // Demo data for recent updates
  const recentUpdates = [
    {
      id: "update1",
      userId: "user1",
      userName: "John Smith",
      updateType: "weight" as const,
      animalName: "Blue Ribbon",
      animalId: "1",
      date: "2025-05-15",
      details: "Blue Ribbon gained 2.5 lbs since last week. Current weight: 1250 lbs."
    },
    {
      id: "update2",
      userId: "user2",
      userName: "Sarah Miller",
      updateType: "journal" as const,
      animalName: "Champion",
      animalId: "2",
      date: "2025-05-15",
      details: "Added new journal entry about feeding routine. The new feed mixture is working well."
    },
    {
      id: "update3",
      userId: "user1",
      userName: "John Smith",
      updateType: "photo" as const,
      animalName: "Blue Ribbon",
      animalId: "1",
      date: "2025-05-14",
      details: "Added 3 new photos showing muscle development and posture improvements."
    },
    {
      id: "update4",
      userId: "user2",
      userName: "Sarah Miller",
      updateType: "weight" as const,
      animalName: "Star",
      animalId: "3",
      date: "2025-05-13",
      details: "Star gained 1.8 lbs this week. Current weight: 225 lbs."
    },
    {
      id: "update5",
      userId: "user1",
      userName: "John Smith",
      updateType: "expense" as const,
      animalName: "Blue Ribbon",
      animalId: "1",
      date: "2025-05-12",
      details: "Added new expense for premium feed: $85.50"
    }
  ];

  // Check if buyer is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("buyerLoggedIn") === "true";
    if (!isLoggedIn) {
      navigate("/buyer/login");
    }
  }, [navigate]);

  // Filter users based on search term
  const filteredUsers = connectedUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConnectUser = (code: string) => {
    // In a real app, this would connect to a user via their code
    const newUser = {
      id: `user${connectedUsers.length + 1}`,
      name: `New User ${connectedUsers.length + 1}`,
      email: `user${connectedUsers.length + 1}@example.com`,
      animalCount: Math.floor(Math.random() * 5) + 1,
      lastUpdate: new Date().toISOString().split('T')[0],
      updatesCount: Math.floor(Math.random() * 10),
      image: "/placeholder.svg"
    };
    
    setConnectedUsers([...connectedUsers, newUser]);
    setIsConnectDialogOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("buyerLoggedIn");
    localStorage.removeItem("buyerEmail");
    navigate("/buyer/login");
  };

  return (
    <BuyerLayout title="Buyer Dashboard">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold mr-2">Buyer Dashboard</h1>
            <Badge variant="outline" className="text-sm font-normal px-2 py-0">
              {localStorage.getItem("buyerEmail")}
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setIsConnectDialogOpen(true)}
              className="flex items-center gap-1"
            >
              <Users className="h-4 w-4" />
              Connect User
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-1"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="mb-4">
            <TabsTrigger value="updates">Recent Updates</TabsTrigger>
            <TabsTrigger value="users">Connected Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="updates">
            <UserActivityFeed updates={recentUpdates} />
          </TabsContent>
          
          <TabsContent value="users">
            {filteredUsers.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredUsers.map(user => (
                  <Card key={user.id} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        {user.name}
                      </CardTitle>
                      <CardDescription>{user.email}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex justify-between text-sm">
                        <div>
                          <span className="text-muted-foreground">Animals:</span> {user.animalCount}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Last update:</span> {user.lastUpdate}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full"
                        onClick={() => navigate(`/buyer/user/${user.id}`)}
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border rounded-lg border-dashed">
                <p className="text-muted-foreground mb-2">No users found.</p>
                <Button onClick={() => setIsConnectDialogOpen(true)}>Connect a User</Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <ConnectUserDialog
        open={isConnectDialogOpen}
        onOpenChange={setIsConnectDialogOpen}
        onConnect={handleConnectUser}
      />
    </BuyerLayout>
  );
};

export default BuyerDashboardPage;
