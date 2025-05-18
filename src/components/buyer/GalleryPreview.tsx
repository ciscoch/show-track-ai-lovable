
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface GalleryPreviewProps {
  userId: string;
}

interface GalleryImage {
  id: string;
  url: string;
  animalName: string;
  date: string;
  caption?: string;
}

const GalleryPreview = ({ userId }: GalleryPreviewProps) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  // Mock gallery data
  const galleryImages: GalleryImage[] = [
    {
      id: "img1",
      url: "/placeholder.svg",
      animalName: "Blue Ribbon",
      date: "2025-05-14",
      caption: "Side profile showing muscle definition"
    },
    {
      id: "img2",
      url: "/placeholder.svg",
      animalName: "Blue Ribbon",
      date: "2025-05-14",
      caption: "Front view after grooming"
    },
    {
      id: "img3",
      url: "/placeholder.svg",
      animalName: "Blue Ribbon",
      date: "2025-05-14",
      caption: "Rear view showing development"
    },
    {
      id: "img4",
      url: "/placeholder.svg",
      animalName: "Champion",
      date: "2025-05-10"
    },
    {
      id: "img5",
      url: "/placeholder.svg",
      animalName: "Champion",
      date: "2025-05-10"
    },
    {
      id: "img6",
      url: "/placeholder.svg",
      animalName: "Star",
      date: "2025-05-05"
    }
  ];

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {galleryImages.map((image) => (
          <div 
            key={image.id} 
            className="aspect-square relative rounded-md overflow-hidden cursor-pointer border hover:border-primary transition-colors"
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={image.url} 
              alt={image.caption || `Photo of ${image.animalName}`}
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-end">
              <div className="w-full p-2 bg-black/30 text-white text-xs">
                <div className="font-medium">{image.animalName}</div>
                <div className="text-white/80">{image.date}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedImage?.animalName} - {selectedImage?.date}
            </DialogTitle>
          </DialogHeader>
          
          {selectedImage && (
            <div className="space-y-4">
              <div className="aspect-video w-full overflow-hidden rounded-md">
                <img 
                  src={selectedImage.url} 
                  alt={selectedImage.caption || `Photo of ${selectedImage.animalName}`}
                  className="object-contain w-full h-full"
                />
              </div>
              
              {selectedImage.caption && (
                <p className="text-muted-foreground">
                  {selectedImage.caption}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GalleryPreview;
