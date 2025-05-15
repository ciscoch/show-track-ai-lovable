
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Animal } from "@/types/models";
import PremiumFeatureBanner from "./PremiumFeatureBanner";
import { useAppContext } from "@/contexts/AppContext";
import { Camera, Box3D, Upload, LineChart } from "lucide-react";
import { useState } from "react";

type BodyCompositionCardProps = {
  animal: Animal;
};

const BodyCompositionCard = ({ animal }: BodyCompositionCardProps) => {
  const { userSubscription } = useAppContext();
  const isPremium = userSubscription.level === 'pro' || userSubscription.level === 'elite';
  const [activeTab, setActiveTab] = useState<string>("photo");
  
  const handleNavigateToSubscriptions = () => {
    // In a real app, navigate to subscription page
    window.location.href = '/subscription';
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
            <Box3D className="h-5 w-5 mr-2 text-accent" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative border rounded-md p-2 h-60 bg-muted/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground text-center">
                      No recent photos available.<br />
                      Take a photo to analyze body composition.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button className="w-full flex items-center">
                    <Camera className="h-4 w-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button variant="outline" className="w-full flex items-center">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
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
                
                <div className="bg-accent/10 p-3 rounded-md">
                  <div className="text-sm font-medium mb-1 text-accent">Show Readiness</div>
                  <div className="flex items-center space-x-1">
                    <div className="h-2 flex-1 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: "0%" }}></div>
                    </div>
                    <span className="text-sm">0%</span>
                  </div>
                  <p className="text-xs mt-2 text-muted-foreground">
                    Take a photo to get an AI assessment of show readiness based on breed standards.
                  </p>
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
          </TabsContent>
          
          <TabsContent value="lidar" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative border rounded-md p-2 h-60 bg-muted/20">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <Box3D className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">
                        No 3D scans available.<br />
                        Use LIDAR-enabled device to scan.
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="w-full flex items-center">
                  <Box3D className="h-4 w-4 mr-2" />
                  Start 3D Scan
                </Button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-muted/20 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Frame Score</div>
                    <div className="text-2xl font-bold">--</div>
                  </div>
                  <div className="bg-muted/20 p-3 rounded-md">
                    <div className="text-sm text-muted-foreground">Est. Volume</div>
                    <div className="text-2xl font-bold">--</div>
                  </div>
                </div>
                
                <div className="bg-muted/20 p-3 rounded-md">
                  <div className="text-sm text-muted-foreground mb-1">3D Analysis</div>
                  <p className="text-sm">
                    LIDAR scanning creates a 3D model of your animal for precise body structure analysis and accurate weight estimations.
                    <br /><br />
                    <span className="text-xs italic">Note: Requires a LIDAR-enabled device, such as iPhone Pro models or compatible Android phones.</span>
                  </p>
                </div>
                
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">Scan History</Button>
                  <Button variant="outline" size="sm">Export Model</Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="timeline" className="space-y-4">
            <div className="border rounded-md p-4 h-72 flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <LineChart className="h-10 w-10 text-accent mx-auto mb-2" />
                <p className="text-muted-foreground mb-4">
                  Timeline visualization shows body changes over time.<br />
                  No data available yet. Take photos or scans to track changes.
                </p>
                <Button variant="outline" size="sm">
                  View Example Timeline
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-muted/20 p-3 rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Feed Conversion</div>
                <p className="text-sm">Track how efficiently your animal converts feed to weight gain.</p>
              </div>
              
              <div className="bg-muted/20 p-3 rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Muscle Growth</div>
                <p className="text-sm">Visualize muscle development over time with AI analysis.</p>
              </div>
              
              <div className="bg-muted/20 p-3 rounded-md">
                <div className="text-sm text-muted-foreground mb-1">Body Structure</div>
                <p className="text-sm">Track structural changes as your animal develops.</p>
              </div>
            </div>
            
            <div className="flex justify-between">
              <Button variant="outline" size="sm">Export Charts</Button>
              <Button variant="outline" size="sm">Generate Report</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default BodyCompositionCard;
