
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftIcon, PencilIcon, CameraIcon, CheckIcon, XIcon } from "lucide-react";
import { Animal } from "@/types/models";
import { calculateAge } from "@/lib/utils";
import { useAppContext } from "@/contexts/AppContext";
import ImageUploadButton from "@/components/ImageUploadButton";
import { Input } from "@/components/ui/input";

interface AnimalHeaderProps {
  animal: Animal;
}

const AnimalHeader = ({ animal }: AnimalHeaderProps) => {
  const navigate = useNavigate();
  const { updateAnimal } = useAppContext();
  const [isEditingName, setIsEditingName] = useState(false);
  const [animalName, setAnimalName] = useState(animal.name);
  
  const handleEditAnimal = () => {
    navigate(`/animal/${animal.id}/edit`);
  };
  
  const handleBack = () => {
    navigate('/');
  };

  const startEditingName = () => {
    setIsEditingName(true);
    setAnimalName(animal.name);
  };

  const saveAnimalName = () => {
    const trimmedName = animalName.trim();
    if (trimmedName && trimmedName !== animal.name) {
      const updatedAnimal = {
        ...animal,
        name: trimmedName
      };
      updateAnimal(updatedAnimal);
    }
    setIsEditingName(false);
  };

  const cancelEditingName = () => {
    setIsEditingName(false);
    setAnimalName(animal.name);
  };

  const handleImageUpload = async (file: File) => {
    try {
      // Create a data URL from the file
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
            <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary">
              <img 
                src={animal.imageUrl || animal.image || '/placeholder.svg'} 
                alt={animal.name} 
                className="w-full h-full object-cover"
              />
              
              <ImageUploadButton
                onImageSelected={handleImageUpload}
                className="absolute inset-0 bg-black/0 hover:bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
              >
                <div className="bg-black/70 text-white rounded-full p-2 hover:bg-black/90 transition-colors">
                  <CameraIcon className="w-5 h-5" />
                </div>
              </ImageUploadButton>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-3">
                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <Input 
                      value={animalName}
                      onChange={(e) => setAnimalName(e.target.value)}
                      className="text-xl font-bold h-auto py-1 max-w-[200px]"
                      autoFocus
                    />
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={saveAnimalName}
                      className="h-8 w-8"
                    >
                      <CheckIcon className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={cancelEditingName}
                      className="h-8 w-8"
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl font-bold">{animal.name}</h1>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={startEditingName}
                      className="h-8 w-8"
                      title="Edit name"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                  </>
                )}
                <Badge>
                  {animal.species.charAt(0).toUpperCase() + animal.species.slice(1)}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={handleEditAnimal}
                  className="h-8 w-8"
                  title="Edit animal details"
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
