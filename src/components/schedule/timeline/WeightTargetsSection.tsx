
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Animal } from "@/types/models";

interface WeightTargetsSectionProps {
  animals: Animal[];
  eventAnimals: string[];
  targetWeights: {[key: string]: number};
  onTargetWeightsChange: (updated: {[key: string]: number}) => void;
}

const WeightTargetsSection = ({ 
  animals, 
  eventAnimals, 
  targetWeights, 
  onTargetWeightsChange 
}: WeightTargetsSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Weight Targets</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {eventAnimals.map(animalId => {
            const animal = animals.find(a => a.id === animalId);
            return animal ? (
              <div key={animalId} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  {animal.name} Target Weight (lbs)
                </label>
                <Input
                  type="number"
                  value={targetWeights[animalId] || 0}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    onTargetWeightsChange({
                      ...targetWeights,
                      [animalId]: isNaN(value) ? 0 : value
                    });
                  }}
                />
                <div className="text-xs text-muted-foreground">
                  Current weight: {animal.weight || "Unknown"} lbs
                </div>
              </div>
            ) : null;
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeightTargetsSection;
