
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import PhotoGallery from "@/components/PhotoGallery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PremiumFeatureBanner from "@/components/PremiumFeatureBanner";
import { Badge } from "@/components/ui/badge";

// Mock photo data
interface Photo {
  id: string;
  animalId: string;
  url: string;
  caption?: string;
  date: string;
  tags?: string[];
}

// Placeholder photos for demo
const placeholderPhotos: Photo[] = [
  {
    id: "p1",
    animalId: "1",
    url: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=612&q=80",
    caption: "First day home",
    date: "2023-03-15",
    tags: ["new", "arrival"]
  },
  {
    id: "p2",
    animalId: "1",
    url: "https://images.unsplash.com/photo-1596116921775-c6648616780c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    caption: "Training session",
    date: "2023-04-02",
    tags: ["training", "progress"]
  },
  {
    id: "p3",
    animalId: "2",
    url: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80",
    caption: "Getting ready for the show",
    date: "2023-03-20",
    tags: ["preparation", "grooming"]
  },
  {
    id: "p4",
    animalId: "3",
    url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    caption: "First show day",
    date: "2023-04-15",
    tags: ["show", "competition"]
  },
  {
    id: "p5",
    animalId: "1",
    url: "https://images.unsplash.com/photo-1560982011-0b67e47d3f08?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    caption: "Working on stance",
    date: "2023-04-20",
    tags: ["training", "showmanship"]
  },
  {
    id: "p6",
    animalId: "2",
    url: "https://images.unsplash.com/photo-1522383584566-8638a2d77cb5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    caption: "After grooming",
    date: "2023-04-25",
    tags: ["grooming", "preparation"]
  }
];

const GalleryPage = () => {
  const { animals, userSubscription } = useAppContext();
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>("");
  const [selectedTab, setSelectedTab] = useState("all");
  
  const filteredPhotos = selectedAnimalId 
    ? placeholderPhotos.filter(photo => photo.animalId === selectedAnimalId)
    : placeholderPhotos;
    
  return (
    <MainLayout title="Photo Gallery">
      <Tabs defaultValue="all" onValueChange={setSelectedTab}>
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="all">All Photos</TabsTrigger>
            <TabsTrigger value="by-animal">By Animal</TabsTrigger>
            <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
          </TabsList>
          
          {selectedTab === "by-animal" && (
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
          )}
        </div>
        
        <TabsContent value="all">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(placeholderPhotos.flatMap(p => p.tags || []))).map(tag => (
                <Badge key={tag} variant="outline" className="cursor-pointer">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          
          <PhotoGallery photos={placeholderPhotos} />
        </TabsContent>
        
        <TabsContent value="by-animal">
          {selectedAnimalId ? (
            <PhotoGallery 
              photos={filteredPhotos}
              animalId={selectedAnimalId}
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {animals.map(animal => (
                <div 
                  key={animal.id} 
                  className="border rounded-md overflow-hidden cursor-pointer hover:border-primary"
                  onClick={() => {
                    setSelectedAnimalId(animal.id);
                    setSelectedTab("by-animal");
                  }}
                >
                  <div className="aspect-square bg-muted overflow-hidden">
                    {placeholderPhotos.find(p => p.animalId === animal.id) ? (
                      <img 
                        src={placeholderPhotos.find(p => p.animalId === animal.id)?.url} 
                        alt={animal.name} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <p className="text-muted-foreground">No photos</p>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{animal.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {placeholderPhotos.filter(p => p.animalId === animal.id).length} photos
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="ai-analysis">
          <PremiumFeatureBanner 
            title="AI Photo Analysis"
            description="Upgrade to Pro or Elite to access AI photo analysis, which can estimate weight, muscle mass, and body composition from your photos."
            currentLevel={userSubscription.level}
            requiredLevel="pro"
          />
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default GalleryPage;
