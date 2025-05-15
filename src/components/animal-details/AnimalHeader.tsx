
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, PencilIcon } from "lucide-react";
import { Animal } from "@/types/models";
import { calculateAge } from "@/lib/utils";

interface AnimalHeaderProps {
  animal: Animal;
}

const AnimalHeader = ({ animal }: AnimalHeaderProps) => {
  const navigate = useNavigate();
  
  const handleEditAnimal = () => {
    navigate(`/animal/${animal.id}/edit`);
  };
  
  const handleBack = () => {
    navigate('/');
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
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary">
              <img 
                src={animal.imageUrl || animal.image || '/placeholder.svg'} 
                alt={animal.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold">{animal.name}</h1>
                <Badge>
                  {animal.species.charAt(0).toUpperCase() + animal.species.slice(1)}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleEditAnimal}
                  className="h-8 w-8"
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
              </div>
              
              <p className="text-muted-foreground">{animal.breed}</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-2 mt-4">
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-medium">{calculateAge(animal.birthdate)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Gender</p>
                  <p className="font-medium">{animal.gender === 'male' ? 'Male' : 'Female'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tag/ID</p>
                  <p className="font-medium">{animal.tagNumber || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Purchased</p>
                  <p className="font-medium">{animal.purchaseDate ? new Date(animal.purchaseDate).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
          
          {animal.notes && (
            <div className="mt-4 p-4 bg-muted/20 rounded-md">
              <p className="text-sm text-muted-foreground mb-1">Notes</p>
              <p>{animal.notes}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AnimalHeader;
