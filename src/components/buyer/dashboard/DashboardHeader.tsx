
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, LogOut } from "lucide-react";

interface DashboardHeaderProps {
  userEmail: string | null;
  onConnectUser: () => void;
  onLogout: () => void;
}

const DashboardHeader = ({ userEmail, onConnectUser, onLogout }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold mr-2">Buyer Dashboard</h1>
        <Badge variant="outline" className="text-sm font-normal px-2 py-0">
          {userEmail}
        </Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onConnectUser}
          className="flex items-center gap-1"
        >
          <Users className="h-4 w-4" />
          Connect User
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onLogout}
          className="flex items-center gap-1"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
