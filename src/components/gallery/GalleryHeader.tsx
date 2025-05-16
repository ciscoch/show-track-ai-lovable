
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImagePlus, FolderPlus, FilterIcon } from "lucide-react";
import { Animal } from "@/types/models";

interface GalleryHeaderProps {
  animals: Animal[];
  selectedAnimalId: string;
  setSelectedAnimalId: (id: string) => void;
  allTags: string[];
  selectedTags: string[];
  toggleTag: (tag: string) => void;
  onAddPhotoClick: () => void;
}

export const GalleryHeader = ({
  animals,
  selectedAnimalId,
  setSelectedAnimalId,
  allTags,
  selectedTags,
  toggleTag,
  onAddPhotoClick,
}: GalleryHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <select
          value={selectedAnimalId}
          onChange={(e) => setSelectedAnimalId(e.target.value)}
          className="px-4 py-2 border rounded-md"
        >
          <option value="">All Animals</option>
          {animals.map(animal => (
            <option key={animal.id} value={animal.id}>
              {animal.name}
            </option>
          ))}
        </select>
        
        {allTags.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <FilterIcon className="h-4 w-4" />
            {allTags.map(tag => (
              <Badge 
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <Button onClick={onAddPhotoClick}>
          <ImagePlus className="h-4 w-4 mr-2" />
          Add Photos
        </Button>
        <Button variant="outline">
          <FolderPlus className="h-4 w-4 mr-2" />
          New Album
        </Button>
      </div>
    </div>
  );
};
