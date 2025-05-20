import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface AnimalCardProps {
  animal: {
    id: string;
    name: string;
    breed: string;
    species: string;
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
        {animal.organization && (
          <Badge className="mt-2">{animal.organization.name}</Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default AnimalCard;
