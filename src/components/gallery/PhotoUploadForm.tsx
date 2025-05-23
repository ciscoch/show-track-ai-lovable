
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import { useAppContext } from "@/contexts/AppContext";

interface PhotoUploadFormProps {
  onSuccess: () => void;
  onCancel: () => void;
  selectedAnimalId?: string;
}

export const PhotoUploadForm = ({ onSuccess, onCancel, selectedAnimalId }: PhotoUploadFormProps) => {
  const { animals } = useAppContext();
  const { uploadPhoto, isUploading } = usePhotoUpload();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const { register, handleSubmit, formState, setValue, watch } = useForm({
    defaultValues: {
      animalId: selectedAnimalId || "",
      caption: "",
      tags: ""
    }
  });
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Preview the image
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setSelectedFile(file);
  };
  
  const onSubmit = async (data: any) => {
    if (!selectedFile) return;
    
    const tags = data.tags
      .split(",")
      .map((tag: string) => tag.trim())
      .filter((tag: string) => tag.length > 0);
    
    try {
      // Prevent default form submission behavior
      await uploadPhoto({
        file: selectedFile,
        animalId: data.animalId,
        caption: data.caption,
        tags
      });
      
      onSuccess();
    } catch (error) {
      console.error("Failed to upload photo:", error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {!previewUrl ? (
        <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors">
          <input
            type="file"
            id="photo-upload"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <label htmlFor="photo-upload" className="cursor-pointer block">
            <ImagePlus className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-1">Drag and drop a photo here, or click to browse</p>
            <p className="text-xs text-muted-foreground">Supports JPG, PNG, HEIF</p>
          </label>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative aspect-square max-h-60 w-full overflow-hidden rounded-md">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute top-2 right-2"
              onClick={() => {
                setPreviewUrl(null);
                setSelectedFile(null);
              }}
            >
              Remove
            </Button>
          </div>
          
          <div>
            <Label htmlFor="animal">Animal</Label>
            <select
              id="animal"
              className="w-full px-3 py-2 border rounded-md mt-1"
              {...register("animalId", { required: true })}
            >
              <option value="">Select an animal</option>
              {animals.map(animal => (
                <option key={animal.id} value={animal.id}>
                  {animal.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <Label htmlFor="caption">Caption</Label>
            <Textarea
              id="caption"
              placeholder="Add a caption to your photo"
              {...register("caption")}
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="tags">Tags (comma separated)</Label>
            <Input
              id="tags"
              placeholder="e.g., show, training, progress"
              {...register("tags")}
              className="mt-1"
            />
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isUploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading || !selectedFile}>
              {isUploading ? "Uploading..." : "Upload Photo"}
            </Button>
          </div>
        </div>
      )}
    </form>
  );
};
