
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Animal } from "@/types/models";
import PremiumFeatureBanner from "./PremiumFeatureBanner";
import { useAppContext } from "@/contexts/AppContext";
import { Badge } from "@/components/ui/badge";
import { CheckIcon, XIcon } from "lucide-react";
import { navigate } from "@/platform/navigation";

type JudgeAnalysisCardProps = {
  animal: Animal;
};

const JudgeAnalysisCard = ({ animal }: JudgeAnalysisCardProps) => {
  const { userSubscription } = useAppContext();
  const isElite = userSubscription.level === 'elite';
  
  const handleNavigateToSubscriptions = () => {
    // In a real app, navigate to subscription page
    navigate('/subscription');
  };
  
  if (!isElite) {
    return (
      <PremiumFeatureBanner
        title="Judge Trend Analysis"
        description="Get insights on what top judges look for in winning animals and how your animal measures up."
        requiredLevel="elite"
        onUpgrade={handleNavigateToSubscriptions}
      />
    );
  }
  
  // Mock data for judge preferences
  const judgePreferences = {
    name: "Judge Richard Anderson",
    preferredTraits: [
      "Strong muscle definition in the loin",
      "Balanced body structure",
      "Good width through the chest",
      "Level topline"
    ],
    avoidTraits: [
      "Excessive fat coverage",
      "Weak front shoulders",
      "Poor leg structure"
    ],
    recentShow: "County Spring Livestock Show",
    animalMatches: 3,
    animalMisses: 1
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Judge Analysis</CardTitle>
          <Badge className="bg-primary">Elite Feature</Badge>
        </div>
        <CardDescription>
          Insights on what top judges are looking for
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border rounded-md p-4 bg-muted/10">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">{judgePreferences.name}</h3>
            <Badge variant="outline">Recent: {judgePreferences.recentShow}</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h4 className="text-sm font-medium mb-2 text-primary">Preferred Traits</h4>
              <ul className="space-y-2">
                {judgePreferences.preferredTraits.map((trait, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckIcon className="h-4 w-4 text-primary mt-0.5" />
                    <span>{trait}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium mb-2 text-barn-red-500">Traits to Avoid</h4>
              <ul className="space-y-2">
                {judgePreferences.avoidTraits.map((trait, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <XIcon className="h-4 w-4 text-barn-red-500 mt-0.5" />
                    <span>{trait}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border rounded-md p-4">
          <h3 className="font-semibold mb-2">Your Animal Analysis</h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-full bg-muted rounded-full h-2.5">
              <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <span className="text-sm font-medium">75% Match</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Based on your animal's profile, it matches {judgePreferences.animalMatches} preferred traits and 
            has {judgePreferences.animalMisses} trait(s) to improve.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default JudgeAnalysisCard;
