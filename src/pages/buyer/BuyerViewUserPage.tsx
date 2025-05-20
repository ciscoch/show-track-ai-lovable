
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import BuyerLayout from "@/components/buyer/BuyerLayout";
import { useAppContext } from "@/contexts/AppContext";
import AnimalListCard from "@/components/buyer/AnimalListCard";
import UpdateTimeline from "@/components/buyer/UpdateTimeline";
import GalleryPreview from "@/components/buyer/GalleryPreview";

const BuyerViewUserPage = () => {
  const { userId, inviteCode } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { animals, journals, userSubscription } = useAppContext();
  
  // Get active tab from navigation state if available
  const initialTab = location.state?.activeTab || "updates";
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const [userData, setUserData] = useState({
    id: userId || "user1",
    name: "John Smith",
    email: "john@example.com",
    location: "Texas",
    bio: "Raising show animals for over 10 years",
    lastActive: "2025-05-15"
  });
  
  // Ensure userId is defined, use a default if not
  const safeUserId = userId || "user1";

  // Check if buyer is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("buyerLoggedIn") === "true";
    if (!isLoggedIn && !inviteCode) {
      navigate("/buyer/login");
    }
    
    // If this is an invite code access, we would handle that here
    if (inviteCode) {
      // In a real app, we would validate the invite code and get the user data
      console.log("Accessing via invite code:", inviteCode);
    }
    
    // Fetch user data based on userId
    // In a real app, this would be an API call
    if (userId === "user2") {
      setUserData({
        id: userId,
        name: "Sarah Miller",
        email: "sarah@example.com",
        location: "Oklahoma",
        bio: "Dedicated to raising quality show animals",
        lastActive: "2025-05-15"
      });
    }
  }, [navigate, inviteCode, userId]);
  
  // Get a filtered list of journals for this user
  const userJournals = journals && journals.length > 0 
    ? journals.slice(0, 3)
    : [];

  return (
    <BuyerLayout title={userData.name}>
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>Connection details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-center mb-4">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {userData.name.charAt(0)}
                    </span>
                  </div>
                </div>
                
                <div className="text-center mb-4">
                  <h3 className="font-bold text-xl">{userData.name}</h3>
                  <p className="text-muted-foreground">{userData.email}</p>
                </div>
                
                <div className="space-y-2 pt-2 border-t">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{userData.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last active:</span>
                    <span className="font-medium">{userData.lastActive}</span>
                  </div>
                </div>
                
                <p className="text-sm">{userData.bio}</p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/buyer/dashboard")}
                >
                  Back to Dashboard
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Animals</CardTitle>
                <CardDescription>
                  View all animals owned by this user
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <AnimalListCard
                  id="1"
                  name="Blue Ribbon"
                  species="Cattle"
                  breed="Angus"
                  onClick={() => navigate("/buyer/animal/1")}
                />
                <AnimalListCard
                  id="2"
                  name="Champion"
                  species="Goat"
                  breed="Boer"
                  onClick={() => navigate("/buyer/animal/2")}
                />
                <AnimalListCard
                  id="3"
                  name="Star"
                  species="Pig"
                  breed="Hampshire"
                  onClick={() => navigate("/buyer/animal/3")}
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="updates">Recent Updates</TabsTrigger>
                <TabsTrigger value="journal">Journal Entries</TabsTrigger>
                <TabsTrigger value="gallery">Photo Gallery</TabsTrigger>
              </TabsList>
              
              <TabsContent value="updates" className="py-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Updates</CardTitle>
                    <CardDescription>
                      Latest activity from {userData.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UpdateTimeline userId={safeUserId} />
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="journal" className="py-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Journal Entries</CardTitle>
                    <CardDescription>
                      Recent journal entries shared by {userData.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {userJournals && userJournals.length > 0 ? (
                      userJournals.map((entry) => (
                        <div key={entry.id} className="py-4 border-b last:border-b-0">
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{entry.title}</h3>
                            <span className="text-sm text-muted-foreground">{entry.date}</span>
                          </div>
                          <p className="text-sm my-2 line-clamp-3">{entry.content}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {entry.tags && entry.tags.map((tag) => (
                              <span 
                                key={tag} 
                                className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No journal entries to display
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="gallery" className="py-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Photo Gallery</CardTitle>
                    <CardDescription>
                      Photos shared by {userData.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <GalleryPreview userId={safeUserId} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </BuyerLayout>
  );
};

export default BuyerViewUserPage;
