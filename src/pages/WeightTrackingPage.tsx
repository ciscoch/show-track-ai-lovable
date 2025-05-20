
import { useState } from "react";
import { navigate } from "@/platform/navigation";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import ImageUploadButton from "@/components/ImageUploadButton";
import { analyzeAnimalPhoto } from "@/services/huggingfaceService";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import WeightChart from "@/components/WeightChart";
import AddWeightForm from "@/components/AddWeightForm";
import PremiumFeatureBanner from "@/components/PremiumFeatureBanner";

const WeightTrackingPage = () => {
  const { animals, weights, userSubscription, user } = useAppContext();
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>(animals[0]?.id || "");
  const [isAddWeightOpen, setIsAddWeightOpen] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  const animalWeights = weights.filter(w => w.animalId === selectedAnimalId)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
  const latestWeight = animalWeights.length > 0 
    ? animalWeights[animalWeights.length - 1].weight 
    : 0;
    
  const initialWeight = animalWeights.length > 0 
    ? animalWeights[0].weight 
    : 0;
    
  const weightGain = latestWeight - initialWeight;
  
  const averageDailyGain = () => {
    if (animalWeights.length < 2) return 0;
    
    const firstDate = new Date(animalWeights[0].date);
    const lastDate = new Date(animalWeights[animalWeights.length - 1].date);
    
    const daysDiff = Math.max(1, Math.round((lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24)));
    
    return weightGain / daysDiff;
  };
  
  const targetWeight = () => {
    const animal = animals.find(a => a.id === selectedAnimalId);
    
    if (!animal) return 0;
    
    // Example target weights (these could be customized or pulled from data)
    switch(animal.species) {
      case 'goat': return 100;
      case 'cattle': return 1200;
      case 'pig': return 280;
      case 'sheep': return 140;
      default: return 0;
    }
  };

  const daysToTarget = () => {
    if (averageDailyGain() <= 0) return "N/A";
    
    const target = targetWeight();
    const remaining = target - latestWeight;
    
    if (remaining <= 0) return "Target reached";
    
    const days = Math.ceil(remaining / averageDailyGain());
    return `${days} days`;
  };
  
  const handleUpgrade = () => {
    // Redirect to subscription page
    navigate('/subscription');
  };

  const handlePhotoUpload = async (file: File) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeAnimalPhoto(file);
      const message =
        typeof result.weight === 'number'
          ? `Estimated weight: ${result.weight} lbs`
          : result.message || 'Analysis complete';
      setAnalysisResult(message);
    } catch (error) {
      console.error('Analysis failed:', error);
      toast({
        title: 'Analysis failed',
        description: 'There was an error analyzing the image',
        variant: 'destructive'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Check if user has Pro or Elite access
  const hasPremiumAccess = userSubscription.level === 'pro' || userSubscription.level === 'elite';
  
  // Check if user has Elite access
  const hasEliteAccess = userSubscription.level === 'elite';
  
  return (
    <MainLayout title="Weight Tracking" user={user}>
      <Tabs defaultValue="overview" className="w-full mt-8">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="all-animals">All Animals</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
        </TabsList>
        
        <div className="flex justify-between items-center my-4">
          <div className="flex items-center gap-4">
            <select
              value={selectedAnimalId}
              onChange={(e) => setSelectedAnimalId(e.target.value)}
              className="px-2 py-1 border rounded-md"
            >
              {animals.map(animal => (
                <option key={animal.id} value={animal.id}>
                  {animal.name} ({animal.species})
                </option>
              ))}
            </select>
          </div>
          
          <Button onClick={() => setIsAddWeightOpen(true)}>
            Add Weight Entry
          </Button>
        </div>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Current Weight</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {latestWeight} lbs
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Total Gain</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {weightGain > 0 ? "+" : ""}{weightGain} lbs
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Daily Gain</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {averageDailyGain().toFixed(2)} lbs/day
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">Target: {targetWeight()} lbs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {daysToTarget()}
                </div>
                <p className="text-xs text-muted-foreground">Est. time to target</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Weight Progression</CardTitle>
            </CardHeader>
            <CardContent>
              <WeightChart 
                weights={weights} 
                animalId={selectedAnimalId} 
                targetWeight={targetWeight()}
                showFullHistory={true}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Weight Log</CardTitle>
            </CardHeader>
            <CardContent>
              {animalWeights.length > 0 ? (
                <div className="space-y-1">
                  {animalWeights
                    .slice()
                    .reverse()
                    .map(entry => (
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
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No weight entries yet. Add your first weight entry to start tracking.
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="all-animals" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {animals.map(animal => (
              <Card key={animal.id}>
                <CardHeader>
                  <CardTitle>{animal.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <WeightChart 
                    weights={weights} 
                    animalId={animal.id}
                  />
                  <div className="mt-4 text-center">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedAnimalId(animal.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="trends" className="space-y-6">
          {!hasPremiumAccess ? (
            <PremiumFeatureBanner 
              title="Advanced Weight Trend Analysis" 
              description="Upgrade to access advanced weight trend analysis, including growth projections and comparison to breed standards."
              requiredLevel="pro"
              currentLevel={userSubscription.level}
              onUpgrade={handleUpgrade}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Advanced Weight Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your advanced weight trend analysis is available here. This feature shows detailed projections and comparisons to breed standards.
                </p>
                {/* Advanced trend content would go here */}
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="ai-analysis" className="space-y-6">
          {userSubscription.level !== 'elite' ? (
            <PremiumFeatureBanner 
              title="AI Weight Estimation & Analysis" 
              description="Upload photos of your animal and our AI will estimate weight and body composition."
              requiredLevel="elite"
              currentLevel={userSubscription.level}
              onUpgrade={handleUpgrade}
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>AI Weight Estimation & Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <p>Upload photos of your animal for AI-powered weight estimation and body composition analysis.</p>
                  
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <ImageUploadButton onImageSelected={handlePhotoUpload} className="mb-4">
                      <Button disabled={isAnalyzing} className="mb-4">
                        {isAnalyzing ? 'Analyzing...' : 'Upload Photo for Analysis'}
                      </Button>
                    </ImageUploadButton>
                    {analysisResult && (
                      <p className="text-sm mb-2">{analysisResult}</p>
                    )}
                    <p className="text-sm text-muted-foreground">
                      For best results, take photos from the side, front, and top angle with good lighting.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Recent Analyses</h3>
                    {analysisResult ? (
                      <p className="text-sm text-muted-foreground">{analysisResult}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No analyses yet. Upload a photo to get started.
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={isAddWeightOpen} onOpenChange={setIsAddWeightOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Weight Entry</DialogTitle>
          </DialogHeader>
          <AddWeightForm 
            initialAnimalId={selectedAnimalId}
            onSuccess={() => setIsAddWeightOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default WeightTrackingPage;
