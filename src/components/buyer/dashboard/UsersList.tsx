
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

interface ConnectedUser {
  id: string;
  name: string;
  email: string;
  animalCount: number;
  lastUpdate: string;
  updatesCount: number;
  image: string;
}

interface UsersListProps {
  users: ConnectedUser[];
  onConnectUser: () => void;
}

const UsersList = ({ users, onConnectUser }: UsersListProps) => {
  const navigate = useNavigate();
  
  if (users.length === 0) {
    return (
      <div className="text-center p-8 border rounded-lg border-dashed">
        <p className="text-muted-foreground mb-2">No users found.</p>
        <Button onClick={onConnectUser}>Connect a User</Button>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map(user => (
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
  );
};

export default UsersList;
