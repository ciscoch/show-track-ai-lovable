
import { Animal } from "@/types/models";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/contexts/AppContext";
import ImageUploadButton from "./ImageUploadButton";
import { CameraIcon } from "lucide-react";

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
  const navigate = useNavigate();
  const { updateAnimal } = useAppContext();
  const age = animal.birthdate ? Math.floor((new Date().getTime() - new Date(animal.birthdate).getTime()) / (1000 * 60 * 60 * 24 * 30.44)) : 0;
  
  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent card click when clicking on the upload button
    if ((e.target as Element).closest('.animal-card-upload-btn')) {
      e.stopPropagation();
      return;
    }
    onClick(animal);
    navigate(`/animal/${animal.id}`);
  };

  const handleImageUpload = async (file: File) => {
    try {
      // Create a data URL from the file
      if (typeof window === "undefined") return;
      const reader = new FileReader();
      
      const imageUrl = await new Promise<string>((resolve, reject) => {
        reader.onload = (e) => {
          if (e.target?.result) {
            resolve(e.target.result as string);
          } else {
            reject(new Error('Failed to read file'));
          }
        };
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      
      // Update animal with new image
      const updatedAnimal = {
        ...animal,
        imageUrl: imageUrl
      };
      
      updateAnimal(updatedAnimal);
    } catch (error) {
      console.error("Error processing image:", error);
      throw error;
    }
  };
  
  return (
    <Card 
      className="animal-card hover:cursor-pointer border-2 hover:border-primary overflow-hidden"
      onClick={handleCardClick}
    >
      <div className="relative w-full h-40 overflow-hidden">
        <img 
          src={animal.image || animal.imageUrl || "/placeholder.svg"} 
          alt={animal.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-primary hover:bg-primary/90">{capitalizeFirstLetter(animal.species)}</Badge>
        </div>
        
        {/* Upload button overlay */}
        <div className="animal-card-upload-btn absolute inset-0 bg-black/0 hover:bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
          <ImageUploadButton
            onImageSelected={handleImageUpload}
            className="z-10"
          >
            <div className="bg-black/70 text-white rounded-full p-3 hover:bg-black/90 transition-colors">
              <CameraIcon className="w-6 h-6" />
            </div>
          </ImageUploadButton>
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
        <span className="text-xs text-muted-foreground">Added: {animal.createdAt ? new Date(animal.createdAt).toLocaleDateString() : 'N/A'}</span>
      </CardFooter>
    </Card>
  );
};

export default AnimalCard;
