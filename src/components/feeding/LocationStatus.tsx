
import { Card, CardContent } from "@/components/ui/card";
import { MapPinIcon } from "lucide-react";

interface LocationStatusProps {
  isLoading: boolean;
  error: string | null;
}

export const LocationStatus = ({ isLoading, error }: LocationStatusProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Loading weather data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (error) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-6">
          <div className="flex items-center justify-center text-muted-foreground">
            <MapPinIcon className="mr-2 h-5 w-5" />
            <p className="text-sm">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return null;
};
