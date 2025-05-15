
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Animal } from "@/types/models";
import PremiumFeatureBanner from "./PremiumFeatureBanner";
import { useAppContext } from "@/contexts/AppContext";

type BodyCompositionCardProps = {
  animal: Animal;
};

const BodyCompositionCard = ({ animal }: BodyCompositionCardProps) => {
  const { userSubscription } = useAppContext();
  const isPremium = userSubscription.level === 'pro' || userSubscription.level === 'elite';
  
  const handleNavigateToSubscriptions = () => {
    // In a real app, navigate to subscription page
    window.location.href = '/subscription';
  };
  
  if (!isPremium) {
    return (
      <PremiumFeatureBanner
        title="AI Body Composition Analysis"
        description="Unlock AI-powered body composition analysis to track muscle development, fat coverage, and structural correctness."
        requiredTier="pro"
        onUpgrade={handleNavigateToSubscriptions}
      />
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Body Composition</CardTitle>
          <Badge className="bg-accent">AI Powered</Badge>
        </div>
        <CardDescription>
          Analyze muscle development and structure using AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="relative border rounded-md p-2 h-60 bg-muted/20">
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-muted-foreground text-center">
                  No recent scans available.<br />
                  Take a photo to analyze body composition.
                </p>
              </div>
            </div>
            <Button className="w-full">Take New Photo</Button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-muted/20 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Muscle Score</div>
                <div className="text-2xl font-bold">--</div>
              </div>
              <div className="bg-muted/20 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Fat Score</div>
                <div className="text-2xl font-bold">--</div>
              </div>
              <div className="bg-muted/20 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Est. Weight</div>
                <div className="text-2xl font-bold">--</div>
              </div>
              <div className="bg-muted/20 p-3 rounded-md">
                <div className="text-sm text-muted-foreground">Structure</div>
                <div className="text-2xl font-bold">--</div>
              </div>
            </div>
            
            <div className="bg-muted/20 p-3 rounded-md">
              <div className="text-sm text-muted-foreground mb-1">AI Analysis</div>
              <p className="text-sm">Take a photo to get AI-powered insights about muscle development, fat coverage, and structural correctness.</p>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" size="sm">History</Button>
              <Button variant="outline" size="sm">Export</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BodyCompositionCard;
