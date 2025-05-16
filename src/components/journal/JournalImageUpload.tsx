
import React, { useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { X, Camera } from "lucide-react";
import ImageUploadButton from "../ImageUploadButton";
import { toast } from "@/hooks/use-toast";

interface JournalImageUploadProps {
  form: UseFormReturn<any>;
}

const JournalImageUpload = ({ form }: JournalImageUploadProps) => {
  const [previews, setPreviews] = useState<string[]>([]);

  const handleImageSelected = async (file: File) => {
    // Get current images array or initialize empty array
    const currentImages = form.getValues("images") || [];
    
    // Update form with new image
    form.setValue("images", [...currentImages, file], { 
      shouldValidate: true, 
      shouldDirty: true 
    });
    
    // Create preview URL for display
    const previewUrl = URL.createObjectURL(file);
    setPreviews(prev => [...prev, previewUrl]);
  };
  
  const removeImage = (index: number) => {
    const currentImages = form.getValues("images") || [];
    const newImages = [...currentImages];
    newImages.splice(index, 1);
    
    form.setValue("images", newImages, { 
      shouldValidate: true, 
      shouldDirty: true 
    });
    
    // Clean up preview URL
    URL.revokeObjectURL(previews[index]);
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);
  };

  return (
    <FormField
      control={form.control}
      name="images"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Photos</FormLabel>
          <FormControl>
            <div className="space-y-4">
              {previews.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {previews.map((preview, index) => (
                    <div key={index} className="relative w-20 h-20 rounded-md overflow-hidden border">
                      <img 
                        src={preview} 
                        alt={`Preview ${index}`} 
                        className="w-full h-full object-cover" 
                      />
                      <Button 
                        type="button"
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-1 right-1 h-5 w-5 rounded-full p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <ImageUploadButton 
                onImageSelected={handleImageSelected}
              >
                <Button type="button" variant="outline" className="w-full">
                  <Camera className="mr-2 h-4 w-4" />
                  Add Photos
                </Button>
              </ImageUploadButton>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default JournalImageUpload;
