
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnimalListCardProps {
  id: string;
  name: string;
  species: string;
  breed: string;
  onClick: () => void;
}

const AnimalListCard = ({
  id,
  name,
  species,
  breed,
  onClick,
}: AnimalListCardProps) => {
  // Get appropriate color for species
  const getSpeciesColor = () => {
    switch (species.toLowerCase()) {
      case "cattle":
        return "bg-red-100 text-red-800";
      case "goat":
        return "bg-blue-100 text-blue-800";
      case "pig":
        return "bg-pink-100 text-pink-800";
      case "sheep":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card 
      className="hover:shadow-md transition-shadow cursor-pointer" 
      onClick={onClick}
    >
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-sm text-muted-foreground">{breed}</p>
        </div>
        <Badge className={getSpeciesColor()}>
          {species}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default AnimalListCard;
