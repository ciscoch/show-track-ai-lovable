import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnimalCardProps {
  animal: {
    id: string;
    name: string;
    breed: string;
    breederName?: string;
    species: string;
    aiScore?: number;
    organization?: {
      name: string;
    };
  };
  onClick?: () => void;
}

const AnimalCard: React.FC<AnimalCardProps> = ({ animal, onClick }) => {
  return (
    <Card onClick={onClick} className="cursor-pointer hover:shadow-md transition-all">
      <CardContent className="p-4 space-y-1">
        <div className="text-xl font-semibold">{animal.name}</div>
        <div className="text-sm text-muted-foreground">{animal.breed} · {animal.species}</div>
        {animal.breederName && (
          <div className="text-xs text-muted-foreground">Breeder: {animal.breederName}</div>
        )}
        {animal.organization && (
          <Badge className="mt-2">{animal.organization.name}</Badge>
        )}
        {typeof animal.aiScore === 'number' && (
          <Badge variant="secondary" className="mt-2">
            AI Score: {animal.aiScore}
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default AnimalCard;
