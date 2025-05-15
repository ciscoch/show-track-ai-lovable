
import React from "react";
import { WeightEntry } from "@/types/models";
import WeightChart from "@/components/WeightChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

interface WeightHistoryTabProps {
  weights: WeightEntry[];
  animalId: string;
  targetWeight?: number;
}

const WeightHistoryTab = ({ weights, animalId, targetWeight }: WeightHistoryTabProps) => {
  const navigate = useNavigate();

  const handleAddWeight = () => {
    navigate(`/animal/${animalId}/add-weight`);
  };

  const animalWeights = weights
    .filter(entry => entry.animalId === animalId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Weight History</h2>
        <Button onClick={handleAddWeight}>Add Weight</Button>
      </div>
      
      <WeightChart 
        weights={weights} 
        animalId={animalId}
        targetWeight={targetWeight}
        showFullHistory={true}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Weight Log</CardTitle>
          <CardDescription>Detailed weight records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {animalWeights.map(entry => (
              <div 
                key={entry.id} 
                className="flex justify-between py-3 border-b"
              >
                <div>
                  <div className="font-medium">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                  {entry.notes && (
                    <div className="text-sm text-muted-foreground">
                      {entry.notes}
                    </div>
                  )}
                </div>
                <div className="font-bold">{entry.weight} lbs</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeightHistoryTab;
