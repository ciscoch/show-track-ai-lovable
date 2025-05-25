
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DraggableContainer, DraggableItem } from "@/components/ui/draggable-container";
import QuickAccessSection from "@/components/QuickAccessSection";
import UserActivityFeed from "@/components/buyer/UserActivityFeed";
import AnimalCalendar from "@/components/animal-details/AnimalCalendar";

// Mock data for dashboard
const recentUpdates = [
  {
    id: "1",
    userId: "user1",
    userName: "John Smith",
    updateType: "weight" as const,
    animalName: "Buddy",
    animalId: "a1",
    date: "2 hours ago",
    details: "Added new weight: 235 lbs",
    read: false,
  },
  {
    id: "2",
    userId: "user2",
    userName: "Sarah Jones",
    updateType: "journal" as const,
    animalName: "Max",
    animalId: "a2",
    date: "Yesterday",
    details: "Behavior improved after changing feed schedule.",
    read: true,
  },
  {
    id: "3",
    userId: "user3",
    userName: "Mike Wilson",
    updateType: "photo" as const,
    animalName: "Luna",
    animalId: "a3",
    date: "2 days ago",
    details: "Added new progress photos showing muscle development.",
    read: false,
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Create dashboard items
  const [dashboardItems] = useState<DraggableItem[]>([
    {
      id: "recent-activity",
      content: (
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <UserActivityFeed 
              updates={recentUpdates} 
              onRead={(id) => console.log(`Marked update ${id} as read`)}
            />
          </CardContent>
        </Card>
      )
    },
    {
      id: "quick-stats",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-primary/10 rounded-md">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Total Animals</div>
              </div>
              <div className="p-4 bg-primary/10 rounded-md">
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">Upcoming Shows</div>
              </div>
              <div className="p-4 bg-primary/10 rounded-md">
                <div className="text-2xl font-bold">$2,450</div>
                <div className="text-sm text-muted-foreground">Total Expenses</div>
              </div>
              <div className="p-4 bg-primary/10 rounded-md">
                <div className="text-2xl font-bold">85%</div>
                <div className="text-sm text-muted-foreground">Weight Goal Progress</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    },
    {
      id: "schedule-card",
      content: <AnimalCalendar />
    },
    {
      id: "todo-section",
      content: (
        <Card>
          <CardHeader>
            <CardTitle>To-Do Items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center p-2 bg-muted rounded-md">
                <span className="h-2 w-2 rounded-full bg-amber-500 mr-2"></span>
                <span>Update weight records for Buddy</span>
              </li>
              <li className="flex items-center p-2 bg-muted rounded-md">
                <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                <span>Prepare for County Fair (2 days left)</span>
              </li>
              <li className="flex items-center p-2 bg-muted rounded-md">
                <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                <span>Schedule veterinarian check-up</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      )
    }
  ]);

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground pb-4">
        Your livestock management overview.
      </p>
      
      {/* Dashboard Items */}
      <DraggableContainer 
        items={dashboardItems} 
        className="pb-8"
      />
      
      {/* Fixed Quick Access Section */}
      <QuickAccessSection />
    </div>
  );
};

export default Dashboard;
