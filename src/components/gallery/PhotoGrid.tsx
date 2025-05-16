
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { PhotoCard } from "./PhotoCard";
import { Photo } from "@/contexts/AppContextTypes";

interface PhotoGridProps {
  photos: Photo[];
  onPhotoClick: (photo: Photo) => void;
  onAddPhoto: () => void;
  isUploading: boolean;
}

export const PhotoGrid = ({ photos, onPhotoClick, onAddPhoto, isUploading }: PhotoGridProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Photo Gallery</h2>
        <Button onClick={onAddPhoto} disabled={isUploading}>
          <PlusIcon className="h-4 w-4 mr-2" />
          {isUploading ? "Uploading..." : "Add Photo"}
        </Button>
      </div>
      
      {photos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <PhotoCard 
              key={photo.id} 
              photo={photo} 
              onClick={onPhotoClick} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-md border-dashed">
          <p className="text-muted-foreground mb-4">No photos available.</p>
          <Button onClick={onAddPhoto}>Add Your First Photo</Button>
        </div>
      )}
    </div>
  );
};
