
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Animal } from "@/types/models";
import PremiumFeatureBanner from "./PremiumFeatureBanner";
import { useAppContext } from "@/contexts/AppContext";
import { Box } from "lucide-react";
import { useState } from "react";
import { navigate } from "@/platform/navigation";
import PhotoAnalysisTab from "./body-composition/PhotoAnalysisTab";
import LidarScanTab from "./body-composition/LidarScanTab";
import TimelineTab from "./body-composition/TimelineTab";

type BodyCompositionCardProps = {
  animal: Animal;
};

const BodyCompositionCard = ({ animal }: BodyCompositionCardProps) => {
  const { userSubscription } = useAppContext();
  const isPremium = userSubscription.level === 'pro' || userSubscription.level === 'elite';
  const [activeTab, setActiveTab] = useState<string>("photo");
  
  const handleNavigateToSubscriptions = () => {
    // In a real app, navigate to subscription page
    navigate('/subscription');
  };
  
  if (!isPremium) {
    return (
      <PremiumFeatureBanner
        title="AI Body Composition Analysis"
        description="Unlock AI-powered body composition analysis to track muscle development, fat coverage, and structural correctness."
        requiredLevel="pro"
        onUpgrade={handleNavigateToSubscriptions}
      />
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Box className="h-5 w-5 mr-2 text-accent" />
            Body Composition
          </CardTitle>
          <Badge className="bg-accent">Pro Feature</Badge>
        </div>
        <CardDescription>
          Analyze muscle development and body structure using advanced AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 md:w-[400px]">
            <TabsTrigger value="photo">Photo Analysis</TabsTrigger>
            <TabsTrigger value="lidar">LIDAR Scan</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
        
          <TabsContent value="photo" className="space-y-4">
            <PhotoAnalysisTab animal={animal} isPremium={isPremium} />
          </TabsContent>
          
          <TabsContent value="lidar" className="space-y-4">
            <LidarScanTab animal={animal} isPremium={isPremium} />
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-4">
            <TimelineTab animal={animal} isPremium={isPremium} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BodyCompositionCard;
