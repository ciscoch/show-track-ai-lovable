
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface UserUpdateCardProps {
  userName: string;
  updateType: "weight" | "journal" | "photo" | "expense";
  animalName: string;
  date: string;
  details: string;
  onClick: () => void;
}

const UserUpdateCard = ({
  userName,
  updateType,
  animalName,
  date,
  details,
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
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <div className="font-medium">{userName}</div>
          <Badge className={getUpdateColor()}>
            {getUpdateLabel()}
          </Badge>
        </div>
        
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-semibold">{animalName}</span>
            <span className="text-muted-foreground"> - {date}</span>
          </div>
          <p className="text-sm">{details}</p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={onClick}
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default UserUpdateCard;
