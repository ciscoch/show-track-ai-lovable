
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Camera, CheckCircle2 } from "lucide-react";
import ImageUploadButton from "@/components/ImageUploadButton";
import { analyzeAnimalPhoto } from "@/services/huggingfaceService";
import { toast } from "@/hooks/use-toast";
import { PhotoAnalysisProps } from "./types";

const PhotoAnalysisTab = ({ animal }: PhotoAnalysisProps) => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisSuccess, setAnalysisSuccess] = useState(false);

  const handlePhotoSelected = async (file: File) => {
    const url = URL.createObjectURL(file);
    setPhoto(url);
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setAnalysisSuccess(false);

    try {
      console.log('Starting photo analysis for animal:', animal.name);
      const result = await analyzeAnimalPhoto(file);
      console.log('Analysis result:', result);
      
      const message =
        typeof result.weight === 'number'
          ? `Estimated weight: ${result.weight} lbs`
          : result.message || 'Analysis complete';
          
      setAnalysisResult(message);
      setAnalysisSuccess(true);
      
      toast({
        title: 'Analysis complete',
        description: message,
      });
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-4">
        <div className="relative border rounded-md p-2 h-60 bg-muted/20 flex items-center justify-center overflow-hidden">
          {photo ? (
            <>
              <img src={photo} alt="Selected" className="object-cover w-full h-full" />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="bg-background p-3 rounded-md text-center">
                    <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-sm">Analyzing image...</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <p className="text-muted-foreground text-center">
              No recent photos available.<br />
              Take a photo to analyze body composition.
            </p>
          )}
        </div>
        <ImageUploadButton onImageSelected={handlePhotoSelected} className="w-full">
          <Button className="w-full flex items-center" disabled={isAnalyzing}>
            <Camera className="h-4 w-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Upload Photo'}
          </Button>
        </ImageUploadButton>
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
        
        <div className={`p-3 rounded-md ${analysisSuccess ? "bg-green-100 border border-green-200 dark:bg-green-900/20 dark:border-green-800" : "bg-muted/20"}`}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium">AI Analysis</span>
            {analysisSuccess && <CheckCircle2 className="h-4 w-4 text-green-500" />}
          </div>
          
          {analysisResult ? (
            <div className="text-sm space-y-1">
              <p className={`font-medium ${analysisSuccess ? "text-green-700 dark:text-green-400" : ""}`}>
                {analysisResult}
              </p>
              {analysisSuccess && <p className="text-xs text-muted-foreground">Analysis complete. Results can be used for tracking.</p>}
            </div>
          ) : (
            <p className="text-sm">
              Take a photo to get AI-powered insights about muscle development, fat coverage, and structural correctness.
            </p>
          )}
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" size="sm">History</Button>
          <Button variant="outline" size="sm">Export</Button>
        </div>
      </div>
    </div>
  );
};

export default PhotoAnalysisTab;
