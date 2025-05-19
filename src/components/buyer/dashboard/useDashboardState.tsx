
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ConnectedUser {
  id: string;
  name: string;
  email: string;
  animalCount: number;
  lastUpdate: string;
  updatesCount: number;
  image: string;
}

interface Update {
  id: string;
  userId: string;
  userName: string;
  updateType: "weight" | "journal" | "photo" | "expense";
  animalName: string;
  animalId: string;
  date: string;
  details: string;
}

export const useDashboardState = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("users");

  // Demo data for connected users
  const [connectedUsers, setConnectedUsers] = useState<ConnectedUser[]>([
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
  const recentUpdates: Update[] = [
    {
      id: "update1",
      userId: "user1",
      userName: "John Smith",
      updateType: "weight",
      animalName: "Blue Ribbon",
      animalId: "1",
      date: "2025-05-15",
      details: "Blue Ribbon gained 2.5 lbs since last week. Current weight: 1250 lbs."
    },
    {
      id: "update2",
      userId: "user2",
      userName: "Sarah Miller",
      updateType: "journal",
      animalName: "Champion",
      animalId: "2",
      date: "2025-05-15",
      details: "Added new journal entry about feeding routine. The new feed mixture is working well."
    },
    {
      id: "update3",
      userId: "user1",
      userName: "John Smith",
      updateType: "photo",
      animalName: "Blue Ribbon",
      animalId: "1",
      date: "2025-05-14",
      details: "Added 3 new photos showing muscle development and posture improvements."
    },
    {
      id: "update4",
      userId: "user2",
      userName: "Sarah Miller",
      updateType: "weight",
      animalName: "Star",
      animalId: "3",
      date: "2025-05-13",
      details: "Star gained 1.8 lbs this week. Current weight: 225 lbs."
    },
    {
      id: "update5",
      userId: "user1",
      userName: "John Smith",
      updateType: "expense",
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

  return {
    searchTerm,
    setSearchTerm,
    isConnectDialogOpen,
    setIsConnectDialogOpen,
    activeTab,
    setActiveTab,
    filteredUsers,
    recentUpdates,
    handleConnectUser,
    handleLogout
  };
};
