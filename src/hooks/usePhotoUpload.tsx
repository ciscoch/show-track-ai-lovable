
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { analyzeAnimalPhoto } from "@/services/huggingfaceService";
import { Photo } from "@/contexts/AppContextTypes";

export interface UploadPhotoParams {
  file: File;
  animalId: string;
  caption?: string;
  tags?: string[];
}

export const usePhotoUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { refreshData } = useAppContext();
  
  const uploadPhoto = async ({ file, animalId, caption, tags }: UploadPhotoParams) => {
    setIsUploading(true);
    
    try {
      // Create a placeholder URL for the image
      const url = URL.createObjectURL(file);
      
      // In a real app, we would upload to storage service
      // For now, we'll simulate it with a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new photo object
      const newPhoto: Photo = {
        id: uuidv4(),
        animalId,
        url,
        date: new Date().toISOString(),
        caption,
        tags: tags || [],
        likes: 0,
        comments: []
      };

      // In a real app, we would save this to a database
      // For now, let's just simulate it
      console.log("Photo uploaded:", newPhoto);

      toast({
        title: "Photo uploaded successfully",
        description: "Your animal's photo has been added to the gallery"
      });

      try {
        const analysis = await analyzeAnimalPhoto(file);
        const message =
          typeof analysis.weight === "number"
            ? `Estimated weight: ${analysis.weight} lbs`
            : analysis.message || "Analysis complete";
        newPhoto.analysisResult = message;
        toast({
          title: "Photo analyzed",
          description: message
        });
      } catch (analysisError) {
        console.error("Analysis failed:", analysisError);
        toast({
          title: "Analysis failed",
          description: "There was an error analyzing the image",
          variant: "destructive"
        });
      }

      refreshData();
      return newPhoto;
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your photo",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsUploading(false);
    }
  };
  
  return {
    uploadPhoto,
    isUploading
  };
};
