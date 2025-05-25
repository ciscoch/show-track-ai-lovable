
import { useState } from "react";
import { navigate } from "@/platform/navigation";
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
import { Animal, User } from "@/types/models";

// Mock data for the gallery
const mockPhotos: Photo[] = [
  {
    id: "p1",
    animal_id: "1",
    animalId: "1",
    url: "/placeholder.svg",
    filename: "photo1.jpg",
    date: "2023-03-15",
    tags: ["profile", "show preparation"]
  },
  {
    id: "p2",
    animal_id: "1",
    animalId: "1",
    url: "/placeholder.svg",
    filename: "photo2.jpg",
    date: "2023-04-01",
    tags: ["show", "pose"],
    title: "First show"
  },
  {
    id: "p3",
    animal_id: "2",
    animalId: "2",
    url: "/placeholder.svg",
    filename: "photo3.jpg",
    date: "2023-03-10",
    tags: ["profile", "weight check"]
  },
  {
    id: "p4",
    animal_id: "2",
    animalId: "2",
    url: "/placeholder.svg",
    filename: "photo4.jpg",
    date: "2023-03-25",
    tags: ["training"],
    title: "Training session"
  },
  {
    id: "p5",
    animal_id: "3",
    animalId: "3",
    url: "/placeholder.svg",
    filename: "photo5.jpg",
    date: "2023-04-10",
    tags: ["muscle evaluation", "side view"]
  },
  {
    id: "p6",
    animal_id: "1",
    animalId: "1",
    url: "/placeholder.svg",
    filename: "photo6.jpg",
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
  
  // Transform animals data
  const transformedAnimals: Animal[] = animals.map(animal => ({
    ...animal,
    gender: (animal.gender || "male") as "male" | "female",
    animalId: animal.id,
    birthdate: animal.birth_date || animal.birthdate || "",
    description: animal.description || "",
    showAnimal: animal.showAnimal || false,
    purpose: (animal.purpose || "other") as "breeding" | "show" | "market" | "pet" | "other",
    weight: animal.weight || 0,
    penNumber: animal.pen_number || animal.penNumber,
    breederName: animal.breeder_name || animal.breeder_name,
    breed: animal.breed || "",
    species: animal.species || "",
    createdAt: animal.created_at || animal.created_at || new Date().toISOString(),
    // Fix organization handling - ensure it's always an object or undefined
    organization: typeof animal.organization === 'string' 
      ? { id: animal.organization, name: animal.organization }
      : undefined
  }));
  
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
    (a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime()
  );
  
  // Group photos by animal
  const photosByAnimal = transformedAnimals.map(animal => ({
    animal,
    photos: photos.filter(photo => photo.animalId === animal.id)
      .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime())
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
    navigate('/subscription');
  };

  const handlePhotoUploadSuccess = () => {
    setIsAddPhotoOpen(false);
    // In a real app, we would fetch the updated photos
    // For now, we simply close the dialog
  };

  const transformedUser: User = user ? {
    ...user,
    email: user.email || "",
    firstName: user.user_metadata?.first_name || "",
    lastName: user.user_metadata?.last_name || "",
    subscriptionLevel: "pro" as "free" | "pro" | "elite",
    createdAt: user.created_at || new Date().toISOString()
  } : {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    subscriptionLevel: "free" as "free" | "pro" | "elite",
    createdAt: new Date().toISOString()
  };
  
  return (
    <MainLayout title="Photo Gallery" user={transformedUser}>
      <GalleryHeader
        animals={transformedAnimals}
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
