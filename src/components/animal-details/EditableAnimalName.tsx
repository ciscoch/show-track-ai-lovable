
import React, { useState } from "react";
import { Animal } from "@/types/models";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon, CheckIcon, XIcon } from "lucide-react";

interface EditableAnimalNameProps {
  animal: Animal;
  onNameUpdate: (updatedAnimal: Animal) => void;
}

const EditableAnimalName = ({ animal, onNameUpdate }: EditableAnimalNameProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [animalName, setAnimalName] = useState(animal.name);

  const startEditing = () => {
    setIsEditing(true);
    setAnimalName(animal.name);
  };

  const saveAnimalName = () => {
    const trimmedName = animalName.trim();
    if (trimmedName && trimmedName !== animal.name) {
      const updatedAnimal = {
        ...animal,
        name: trimmedName
      };
      onNameUpdate(updatedAnimal);
    }
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setAnimalName(animal.name);
  };

  return (
    <>
      {isEditing ? (
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
            title="Save name"
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={cancelEditing}
            className="h-8 w-8"
            title="Cancel"
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
            onClick={startEditing}
            className="h-8 w-8 flex items-center gap-1"
            title="Edit name"
          >
            <PencilIcon className="h-4 w-4" />
            <span className="sr-only">Edit Name</span>
          </Button>
        </>
      )}
    </>
  );
};

export default EditableAnimalName;
