
import React from "react";
import { Animal } from "@/types/models";
import { calculateAge } from "@/lib/utils";
import EditablePenNumber from "./EditablePenNumber";

interface AnimalInfoGridProps {
  animal: Animal;
  onPenUpdate: (updatedAnimal: Animal) => void;
}

const AnimalInfoGrid = ({ animal, onPenUpdate }: AnimalInfoGridProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-6 gap-x-8 gap-y-2 mt-4">
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
        <p className="text-sm text-muted-foreground">Breeder</p>
        <p className="font-medium">{animal.breederName || 'N/A'}</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Pen #</p>
        <EditablePenNumber 
          animal={animal}
          onPenUpdate={onPenUpdate}
        />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">Purchased</p>
        <p className="font-medium">{animal.purchaseDate ? new Date(animal.purchaseDate).toLocaleDateString() : 'N/A'}</p>
      </div>
    </div>
  );
};

export default AnimalInfoGrid;
