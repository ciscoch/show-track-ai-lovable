
import { Animal } from "@/types/models";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/utils";

type AnimalCardProps = {
  animal: Animal;
  onClick: (animal: Animal) => void;
};

const getSpeciesEmoji = (species: Animal['species']) => {
  switch (species) {
    case 'cattle': return '🐄';
    case 'goat': return '🐐';
    case 'sheep': return '🐑';
    case 'pig': return '🐖';
    default: return '🐾';
  }
};

const AnimalCard = ({ animal, onClick }: AnimalCardProps) => {
  const age = animal.birthDate ? Math.floor((new Date().getTime() - new Date(animal.birthDate).getTime()) / (1000 * 60 * 60 * 24 * 30.44)) : 0;
  
  return (
    <Card 
      className="animal-card hover:cursor-pointer border-2 hover:border-primary overflow-hidden"
      onClick={() => onClick(animal)}
    >
      <div className="relative w-full h-40 overflow-hidden">
        <img 
          src={animal.imageUrl || "/placeholder.svg"} 
          alt={animal.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-primary hover:bg-primary/90">{capitalizeFirstLetter(animal.species)}</Badge>
        </div>
      </div>
      <CardHeader className="p-4 pb-2">
        <CardTitle className="flex items-center gap-2">
          <span>{getSpeciesEmoji(animal.species)}</span>
          <span>{animal.name}</span>
        </CardTitle>
        <CardDescription>{animal.breed}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="grid grid-cols-2 gap-1 text-sm">
          <div className="text-muted-foreground">Age:</div>
          <div>{age} months</div>
          <div className="text-muted-foreground">ID:</div>
          <div>{animal.tagNumber || 'N/A'}</div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Badge variant="outline" className="text-xs">
          {animal.gender === 'male' ? '♂️ Male' : '♀️ Female'}
        </Badge>
        <span className="text-xs text-muted-foreground">Added: {new Date(animal.createdAt).toLocaleDateString()}</span>
      </CardFooter>
    </Card>
  );
};

export default AnimalCard;
