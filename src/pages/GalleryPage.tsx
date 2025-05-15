
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImagePlus, FolderPlus, FilterIcon } from "lucide-react";
import PhotoGallery from "@/components/PhotoGallery";
import PremiumFeatureBanner from "@/components/PremiumFeatureBanner";
import { Badge } from "@/components/ui/badge";

// Mock data for the gallery
interface Photo {
  id: string;
  animalId: string;
  url: string;
  date: string;
  tags?: string[];
  title?: string;
}

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
  const { animals, userSubscription } = useAppContext();
  const [isAddPhotoOpen, setIsAddPhotoOpen] = useState(false);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Extract all unique tags from photos
  const allTags = Array.from(
    new Set(
      mockPhotos.flatMap(photo => photo.tags || [])
    )
  );
  
  // Filter photos based on selected animal and tags
  const filteredPhotos = mockPhotos.filter(photo => {
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
    photos: mockPhotos.filter(photo => photo.animalId === animal.id)
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
  
  return (
    <MainLayout title="Photo Gallery">
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
          <Button onClick={() => setIsAddPhotoOpen(true)}>
            <ImagePlus className="h-4 w-4 mr-2" />
            Add Photos
          </Button>
          <Button variant="outline">
            <FolderPlus className="h-4 w-4 mr-2" />
            New Album
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Photos</TabsTrigger>
          <TabsTrigger value="by-animal">By Animal</TabsTrigger>
          <TabsTrigger value="albums">Albums</TabsTrigger>
          <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-6">
          <PhotoGallery 
            photos={sortedPhotos.map(photo => ({
              id: photo.id,
              url: photo.url,
              title: photo.title || '',
              animalName: animals.find(a => a.id === photo.animalId)?.name || ''
            }))}
          />
        </TabsContent>
        
        <TabsContent value="by-animal" className="mt-6">
          <div className="space-y-8">
            {photosByAnimal.map(group => (
              <div key={group.animal.id} className="space-y-4">
                <h3 className="text-lg font-medium">{group.animal.name}</h3>
                {group.photos.length > 0 ? (
                  <PhotoGallery 
                    photos={group.photos.map(photo => ({
                      id: photo.id,
                      url: photo.url,
                      title: photo.title || '',
                      animalName: ''
                    }))}
                  />
                ) : (
                  <p className="text-muted-foreground">No photos for this animal.</p>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="albums" className="mt-6">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Create albums to organize your photos by show, event, or training sessions.</p>
                <Button>Create Your First Album</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai-analysis" className="mt-6">
          {!isElite ? (
            <PremiumFeatureBanner
              title="AI-Powered Photo Analysis"
              description="Upgrade to Elite to access our AI tools that can analyze your animal photos for muscle development, structural correctness, and show readiness."
              requiredLevel="elite"
              onUpgrade={handleUpgrade}
            />
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-12">
                  <p className="text-primary font-medium mb-2">Elite Feature</p>
                  <p className="text-muted-foreground mb-4">Select photos to analyze with our AI for muscle development, structural correctness, and show readiness scores.</p>
                  <Button>Upload Photos for Analysis</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={isAddPhotoOpen} onOpenChange={setIsAddPhotoOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Photos</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors">
              <ImagePlus className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-1">Drag and drop photos here, or click to browse</p>
              <p className="text-xs text-muted-foreground">Supports JPG, PNG, HEIF</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Select Animal</label>
                <select className="w-full px-3 py-2 border rounded-md">
                  {animals.map(animal => (
                    <option key={animal.id} value={animal.id}>{animal.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Date</label>
                <input type="date" className="w-full px-3 py-2 border rounded-md" />
              </div>
            </div>
            
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsAddPhotoOpen(false)}>Cancel</Button>
              <Button>Upload</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default GalleryPage;
