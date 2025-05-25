import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import { Animal } from "@/types/models";
import { useAppContext } from "@/contexts/AppContext";
import AnimalProfileImage from "./AnimalProfileImage";
import EditableAnimalName from "./EditableAnimalName";
import AnimalInfoGrid from "./AnimalInfoGrid";
import AnimalNotes from "./AnimalNotes";

interface AnimalHeaderProps {
  animal: Animal;
}

const AnimalHeader = ({ animal }: AnimalHeaderProps) => {
  const navigate = useNavigate();
  const { updateAnimal } = useAppContext();
  
  const handleEditAnimal = () => {
    navigate(`/animal/${animal.id}/edit`);
  };
  
  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleAnimalUpdate = async (updatedAnimal: Animal) => {
    await updateAnimal(updatedAnimal.id, {
      ...updatedAnimal,
      organization: typeof updatedAnimal.organization === 'object' 
        ? updatedAnimal.organization?.name 
        : updatedAnimal.organization
    });
  };

  return (
    <>
      <Button 
        variant="ghost" 
        onClick={handleBack}
        className="mb-6 flex items-center gap-1"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        <span>Back to Animals</span>
      </Button>
      
      <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
        <div className="flex-1">
          <div className="flex flex-wrap items-start gap-4">
            <AnimalProfileImage 
              animal={animal} 
              onImageUpdate={handleAnimalUpdate} 
            />
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <EditableAnimalName 
                  animal={animal} 
                  onNameUpdate={handleAnimalUpdate} 
                />
                <Badge>
                  {animal.species?.charAt(0).toUpperCase() + animal.species?.slice(1)}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleEditAnimal}
                  className="h-8 flex items-center gap-1"
                  title="Edit all animal details"
                >
                  <PencilIcon className="h-4 w-4" />
                  <span>Edit Details</span>
                </Button>
              </div>
              
              <p className="text-muted-foreground">{animal.breed}</p>
              
              <AnimalInfoGrid 
                animal={animal} 
                onPenUpdate={handleAnimalUpdate} 
              />
            </div>
          </div>
          
          <AnimalNotes animal={animal} />
        </div>
      </div>
    </>
  );
};

export default AnimalHeader;
