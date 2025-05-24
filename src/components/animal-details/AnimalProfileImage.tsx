
import React from "react";
import { Animal } from "@/types/models";
import ImageUploadButton from "@/components/ImageUploadButton";
import { CameraIcon } from "lucide-react";
import { readFileAsDataURL } from "@/platform/file";

interface AnimalProfileImageProps {
  animal: Animal;
  onImageUpdate: (updatedAnimal: Animal) => void;
}

const AnimalProfileImage = ({ animal, onImageUpdate }: AnimalProfileImageProps) => {
  const handleImageUpload = async (file: File) => {
    try {
      const imageUrl = await readFileAsDataURL(file);
      
      // Update animal with new image
      const updatedAnimal = {
        ...animal,
        imageUrl: imageUrl
      };
      
      onImageUpdate(updatedAnimal);
    } catch (error) {
      console.error("Error processing image:", error);
      throw error;
    }
  };

  return (
    <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-primary">
      <img 
        src={animal.imageUrl || animal.image || '/placeholder.svg'} 
        alt={animal.name} 
        className="w-full h-full object-cover"
      />
      
      <ImageUploadButton
        onImageSelected={handleImageUpload}
        className="absolute inset-0 bg-black/0 hover:bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
      >
        <div className="bg-black/70 text-white rounded-full p-2 hover:bg-black/90 transition-colors">
          <CameraIcon className="w-5 h-5" />
        </div>
      </ImageUploadButton>
    </div>
  );
};

export default AnimalProfileImage;
