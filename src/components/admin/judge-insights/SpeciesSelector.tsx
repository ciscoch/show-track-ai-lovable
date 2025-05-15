
import React from "react";
import { Button } from "@/components/ui/button";

interface SpeciesSelectorProps {
  selectedSpecies: string;
  speciesOptions: string[];
  onSpeciesChange: (species: string) => void;
}

const SpeciesSelector = ({ 
  selectedSpecies, 
  speciesOptions, 
  onSpeciesChange 
}: SpeciesSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {speciesOptions.map((species) => (
        <Button
          key={species}
          variant={selectedSpecies === species ? "default" : "outline"}
          onClick={() => onSpeciesChange(species)}
          className="text-sm"
        >
          {species}
        </Button>
      ))}
    </div>
  );
};

export default SpeciesSelector;
