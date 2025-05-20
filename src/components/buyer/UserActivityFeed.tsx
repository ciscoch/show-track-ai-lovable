
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import UserUpdateCard from "@/components/buyer/UserUpdateCard";

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

interface UserActivityFeedProps {
  updates: Update[];
  onRead: (id: string) => void;
}

const UserActivityFeed = ({ updates = [], onRead }: UserActivityFeedProps) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<string>("all");
  
  // Make sure updates is always an array
  const safeUpdates = updates || [];
  
  // Filter updates based on selected filter
  const filteredUpdates = filter === "all" 
    ? safeUpdates 
    : safeUpdates.filter(update => update.updateType === filter);

  const handleUpdateClick = (id: string, userId: string, updateType: string, animalId?: string) => {
    onRead(id);
    // Navigate to the appropriate page based on the update type
    navigate(`/buyer/user/${userId}`, { 
      state: { activeTab: updateType === "photo" ? "gallery" : updateType === "journal" ? "journal" : "updates" } 
    });
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle>Recent Activity</CardTitle>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter updates" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Updates</SelectItem>
              <SelectItem value="weight">Weight Updates</SelectItem>
              <SelectItem value="journal">Journal Entries</SelectItem>
              <SelectItem value="photo">Photos</SelectItem>
              <SelectItem value="expense">Expenses</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUpdates.length > 0 ? (
            filteredUpdates.map((update) => (
              <UserUpdateCard
                key={update.id}
                userName={update.userName}
                userId={update.userId}
                updateType={update.updateType}
                animalName={update.animalName}
                animalId={update.animalId}
                date={update.date}
                details={update.details}
                read={update.read}
                onClick={() => handleUpdateClick(update.id, update.userId, update.updateType, update.animalId)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-muted-foreground">
              No updates to display
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserActivityFeed;
