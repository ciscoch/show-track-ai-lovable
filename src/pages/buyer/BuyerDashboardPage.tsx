
import BuyerLayout from "@/components/buyer/BuyerLayout";
import ConnectUserDialog from "@/components/buyer/ConnectUserDialog";
import DashboardHeader from "@/components/buyer/dashboard/DashboardHeader";
import SearchBar from "@/components/buyer/dashboard/SearchBar";
import DashboardTabs from "@/components/buyer/dashboard/DashboardTabs";
import { useDashboardState } from "@/components/buyer/dashboard/useDashboardState";

const BuyerDashboardPage = () => {
  const {
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
  } = useDashboardState();

  const userEmail = localStorage.getItem("buyerEmail");

  return (
    <BuyerLayout title="Buyer Dashboard">
      <div className="container mx-auto py-8 px-4">
        <DashboardHeader 
          userEmail={userEmail} 
          onConnectUser={() => setIsConnectDialogOpen(true)}
          onLogout={handleLogout}
        />

        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
        />

        <DashboardTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          recentUpdates={recentUpdates}
          filteredUsers={filteredUsers}
          onConnectUser={() => setIsConnectDialogOpen(true)}
        />
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
