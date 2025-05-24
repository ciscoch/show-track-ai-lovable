
import React, { useState } from "react";
import { Animal } from "@/types/models";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon, CheckIcon, XIcon } from "lucide-react";

interface EditablePenNumberProps {
  animal: Animal;
  onPenUpdate: (updatedAnimal: Animal) => void;
}

const EditablePenNumber = ({ animal, onPenUpdate }: EditablePenNumberProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [penNumber, setPenNumber] = useState(animal.penNumber || "");

  const startEditing = () => {
    setIsEditing(true);
    setPenNumber(animal.penNumber || "");
  };

  const savePenNumber = () => {
    const trimmedPen = penNumber.trim();
    if (trimmedPen !== (animal.penNumber || "")) {
      const updatedAnimal = {
        ...animal,
        penNumber: trimmedPen || undefined
      };
      onPenUpdate(updatedAnimal);
    }
    setIsEditing(false);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setPenNumber(animal.penNumber || "");
  };

  return (
    <>
      {isEditing ? (
        <div className="flex items-center gap-1">
          <Input
            value={penNumber}
            onChange={(e) => setPenNumber(e.target.value)}
            className="h-7 py-1 max-w-[80px]"
            autoFocus
          />
          <Button variant="ghost" size="icon" onClick={savePenNumber} className="h-6 w-6" title="Save pen number">
            <CheckIcon className="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" onClick={cancelEditing} className="h-6 w-6" title="Cancel">
            <XIcon className="h-3 w-3" />
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-1">
          <p className="font-medium">{animal.penNumber || 'N/A'}</p>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={startEditing} 
            className="h-6 w-6 flex items-center justify-center" 
            title="Edit pen number"
          >
            <PencilIcon className="h-3 w-3" />
            <span className="sr-only">Edit Pen</span>
          </Button>
        </div>
      )}
    </>
  );
};

export default EditablePenNumber;
