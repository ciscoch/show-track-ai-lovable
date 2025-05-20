
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserUpdateCardProps {
  userName: string;
  userId?: string;
  userImage?: string;
  updateType: "weight" | "journal" | "photo" | "expense";
  animalName: string;
  animalId?: string;
  date: string;
  details: string;
  read?: boolean;
  onClick: () => void;
}

const UserUpdateCard = ({
  userName,
  userId,
  userImage,
  updateType,
  animalName,
  animalId,
  date,
  details,
  read,
  onClick
}: UserUpdateCardProps) => {
  // Get appropriate color for update type
  const getUpdateColor = () => {
    switch (updateType) {
      case "weight":
        return "bg-green-100 text-green-800";
      case "journal":
        return "bg-blue-100 text-blue-800";
      case "photo":
        return "bg-purple-100 text-purple-800";
      case "expense":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getUpdateLabel = () => {
    switch (updateType) {
      case "weight":
        return "Weight Update";
      case "journal":
        return "Journal Entry";
      case "photo":
        return "New Photos";
      case "expense":
        return "Expense Tracking";
      default:
        return "Update";
    }
  };

  return (
    <Card className={cn("hover:shadow-md transition-shadow", !read && "bg-muted")}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 bg-primary/10 text-primary">
              <span className="text-xs font-medium">{userName.charAt(0)}</span>
            </Avatar>
            <div className="font-medium">{userName}</div>
          </div>
          <Badge className={getUpdateColor()}>
            {getUpdateLabel()}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-semibold">{animalName}</span>
            <span className="text-muted-foreground"> - {date}</span>
          </div>
          <p className="text-sm line-clamp-2">{details}</p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full flex justify-between items-center"
          onClick={onClick}
        >
          <span>View Details</span>
          <ArrowRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserUpdateCard;
