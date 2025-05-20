import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GalleryHeader } from "@/components/gallery/GalleryHeader";
import { GalleryTabs } from "@/components/gallery/GalleryTabs";
import { PhotoUploadForm } from "@/components/gallery/PhotoUploadForm";
import { Photo } from "@/contexts/AppContextTypes";

// Mock data for the gallery
const mockPhotos: Photo[] = [
  {
    id: "p1",
    animalId: "1",
    url: "/placeholder.svg",
    date: "2023-03-15",
    tags: ["profile", "show preparation"]
  },
  {
    id: "p2",
    animalId: "1",
    url: "/placeholder.svg",
    date: "2023-04-01",
    tags: ["show", "pose"],
    title: "First show"
  },
  {
    id: "p3",
    animalId: "2",
    url: "/placeholder.svg",
    date: "2023-03-10",
    tags: ["profile", "weight check"]
  },
  {
    id: "p4",
    animalId: "2",
    url: "/placeholder.svg",
    date: "2023-03-25",
    tags: ["training"],
    title: "Training session"
  },
  {
    id: "p5",
    animalId: "3",
    url: "/placeholder.svg",
    date: "2023-04-10",
    tags: ["muscle evaluation", "side view"]
  },
  {
    id: "p6",
    animalId: "1",
    url: "/placeholder.svg",
    date: "2023-04-15",
    tags: ["show progress"]
  }
];

const GalleryPage = () => {
  const { animals, userSubscription, user } = useAppContext();
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);
  
  // Extract all unique tags from photos
  const allTags = Array.from(
    new Set(
      photos.flatMap(photo => photo.tags || [])
    )
  );
  
  // Filter photos based on selected animal and tags
  const filteredPhotos = photos.filter(photo => {
    const matchesAnimal = selectedAnimalId === "" || photo.animalId === selectedAnimalId;
    const matchesTags = selectedTags.length === 0 || 
      selectedTags.some(tag => photo.tags?.includes(tag));
    
    return matchesAnimal && matchesTags;
  });
  
  // Sort photos by date (newest first)
  const sortedPhotos = [...filteredPhotos].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  
  // Group photos by animal
  const photosByAnimal = animals.map(animal => ({
    animal,
    photos: photos.filter(photo => photo.animalId === animal.id)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  }));
  
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const isElite = userSubscription.level === "elite";
  
  const handleUpgrade = () => {
    // Redirect to subscription page
    window.location.href = '/subscription';
  };

  const handlePhotoUploadSuccess = () => {
    setIsAddPhotoOpen(false);
    // In a real app, we would fetch the updated photos
    // For now, we simply close the dialog
  };
  
  return (
    <MainLayout title="Photo Gallery" user={user}>
      <GalleryHeader
        animals={animals}
        selectedAnimalId={selectedAnimalId}
        setSelectedAnimalId={setSelectedAnimalId}
        allTags={allTags}
        selectedTags={selectedTags}
        toggleTag={toggleTag}
        onAddPhotoClick={() => setIsAddPhotoOpen(true)}
      />
      
      <GalleryTabs
        sortedPhotos={sortedPhotos}
        photosByAnimal={photosByAnimal}
        isElite={isElite}
        handleUpgrade={handleUpgrade}
      />
      
      <Dialog open={isAddPhotoOpen} onOpenChange={setIsAddPhotoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Photos</DialogTitle>
          </DialogHeader>
          <PhotoUploadForm 
            onSuccess={handlePhotoUploadSuccess}
            onCancel={() => setIsAddPhotoOpen(false)}
            selectedAnimalId={selectedAnimalId !== "" ? selectedAnimalId : undefined}
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default GalleryPage;
