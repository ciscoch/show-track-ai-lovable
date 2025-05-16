
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import PremiumFeatureBanner from "@/components/PremiumFeatureBanner";
import PhotoGallery from "@/components/PhotoGallery";
import { Photo } from "@/contexts/AppContextTypes";
import { Animal } from "@/types/models";

interface GalleryTabsProps {
  sortedPhotos: Photo[];
  photosByAnimal: {
    animal: Animal;
    photos: Photo[];
  }[];
  isElite: boolean;
  handleUpgrade: () => void;
}

export const GalleryTabs = ({
  sortedPhotos,
  photosByAnimal,
  isElite,
  handleUpgrade,
}: GalleryTabsProps) => {
  return (
    <Tabs defaultValue="all">
      <TabsList>
        <TabsTrigger value="all">All Photos</TabsTrigger>
        <TabsTrigger value="by-animal">By Animal</TabsTrigger>
        <TabsTrigger value="albums">Albums</TabsTrigger>
        <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-6">
        <PhotoGallery 
          photos={sortedPhotos}
        />
      </TabsContent>
      
      <TabsContent value="by-animal" className="mt-6">
        <div className="space-y-8">
          {photosByAnimal.map(group => (
            <div key={group.animal.id} className="space-y-4">
              <h3 className="text-lg font-medium">{group.animal.name}</h3>
              {group.photos.length > 0 ? (
                <PhotoGallery 
                  photos={group.photos}
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
  );
};
