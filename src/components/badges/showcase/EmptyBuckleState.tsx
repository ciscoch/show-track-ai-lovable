
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";

const EmptyBuckleState = () => {
  return (
    <Card className="bg-muted/50">
      <CardContent className="flex flex-col items-center justify-center p-6 text-center">
        <Trophy className="h-12 w-12 text-muted-foreground opacity-40 mb-2" />
        <h3 className="font-semibold text-lg">No Buckles Yet</h3>
        <p className="text-sm text-muted-foreground">
          Complete achievements to earn buckles for your showcase
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyBuckleState;
