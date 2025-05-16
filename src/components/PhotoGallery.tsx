import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PlusIcon, XIcon, ThumbsUp, MessageCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { CommentSection, Comment } from "./gallery/CommentSection";
import { useAppContext } from "@/contexts/AppContext";

export interface Photo {
  id: string;
  animalId: string;
  url: string;
  date: string;
  tags?: string[];
  caption?: string;
  title?: string;
  likes?: number;
  comments?: Comment[];
  likedByUser?: boolean;
}

interface PhotoGalleryProps {
  photos: Photo[];
  animalId?: string;
  onAddPhoto?: (photo: Photo) => void;
}

// Enhanced placeholder photos with likes and comments
const placeholderPhotos: Photo[] = [
  {
    id: "p1",
    animalId: "1",
    url: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=612&q=80",
    caption: "First day home",
    date: "2023-03-15",
    tags: ["new", "arrival"],
    likes: 5,
    comments: [
      {
        id: "c1",
        photoId: "p1",
        userId: "user1",
        userName: "Jane Smith",
        content: "Looking great! Can't wait to see more progress.",
        createdAt: "2023-03-16T10:30:00.000Z"
      }
    ]
  },
  {
    id: "p2",
    animalId: "1",
    url: "https://images.unsplash.com/photo-1596116921775-c6648616780c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    caption: "Training session",
    date: "2023-04-02",
    tags: ["training", "progress"],
    likes: 3,
    comments: []
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
  }
];

const PhotoGallery = ({ photos = placeholderPhotos, animalId, onAddPhoto }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState<Photo[]>(photos);
  const { user } = useAppContext();

  const filteredPhotos = animalId ? galleryPhotos.filter(p => p.animalId === animalId) : galleryPhotos;
  
  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };
  
  const handleAddPhoto = () => {
    setIsUploading(true);
    
    // Simulate upload delay
    setTimeout(() => {
      toast({
        title: "Feature in development",
        description: "Photo upload will be available in the Pro plan"
      });
      setIsUploading(false);
    }, 1000);
  };

  const handleLike = (photo: Photo) => {
    if (!user) {
      toast({
        title: "Not signed in",
        description: "You need to sign in to like photos",
        variant: "destructive",
      });
      return;
    }

    // Update state with liked photo
    setGalleryPhotos(prevPhotos => 
      prevPhotos.map(p => {
        if (p.id === photo.id) {
          const currentLikes = p.likes || 0;
          const likedByUser = p.likedByUser || false;
          
          return { 
            ...p, 
            likes: likedByUser ? currentLikes - 1 : currentLikes + 1,
            likedByUser: !likedByUser
          };
        }
        return p;
      })
    );

    // If the photo is currently selected, update that too
    if (selectedPhoto?.id === photo.id) {
      const currentLikes = selectedPhoto.likes || 0;
      const likedByUser = selectedPhoto.likedByUser || false;
      
      setSelectedPhoto({
        ...selectedPhoto,
        likes: likedByUser ? currentLikes - 1 : currentLikes + 1,
        likedByUser: !likedByUser
      });
    }
  };

  const handleAddComment = (newComment: Comment) => {
    // Update gallery photos with the new comment
    setGalleryPhotos(prevPhotos =>
      prevPhotos.map(p => {
        if (p.id === newComment.photoId) {
          const currentComments = p.comments || [];
          return {
            ...p,
            comments: [...currentComments, newComment]
          };
        }
        return p;
      })
    );

    // If the photo is currently selected, update that too
    if (selectedPhoto?.id === newComment.photoId) {
      const currentComments = selectedPhoto.comments || [];
      setSelectedPhoto({
        ...selectedPhoto,
        comments: [...currentComments, newComment]
      });
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Photo Gallery</h2>
        <Button onClick={handleAddPhoto} disabled={isUploading}>
          <PlusIcon className="h-4 w-4 mr-2" />
          {isUploading ? "Uploading..." : "Add Photo"}
        </Button>
      </div>
      
      {filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
            <div 
              key={photo.id} 
              className="aspect-square rounded-md overflow-hidden relative cursor-pointer border border-border hover:border-primary group"
              onClick={() => handlePhotoClick(photo)}
            >
              <img 
                src={photo.url} 
                alt={photo.caption || photo.title || "Animal photo"} 
                className="w-full h-full object-cover"
              />
              {(photo.caption || photo.title) && (
                <div className="absolute bottom-0 left-0 right-0 bg-background/75 p-2 truncate">
                  <p className="text-sm">{photo.caption || photo.title}</p>
                </div>
              )}

              <div className="absolute bottom-2 right-2 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {photo.likes !== undefined && (
                  <div className="flex items-center bg-background/75 rounded-full px-2 py-1">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    <span className="text-xs">{photo.likes}</span>
                  </div>
                )}
                {photo.comments && photo.comments.length > 0 && (
                  <div className="flex items-center bg-background/75 rounded-full px-2 py-1">
                    <MessageCircle className="h-3 w-3 mr-1" />
                    <span className="text-xs">{photo.comments.length}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 border rounded-md border-dashed">
          <p className="text-muted-foreground mb-4">No photos available.</p>
          <Button onClick={handleAddPhoto}>Add Your First Photo</Button>
        </div>
      )}
      
      <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              <span>{selectedPhoto?.caption || selectedPhoto?.title || "Photo Details"}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setSelectedPhoto(null)}
              >
                <XIcon className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          {selectedPhoto && (
            <div className="flex flex-col space-y-4">
              <div className="relative max-h-[50vh] overflow-hidden rounded-md">
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.caption || selectedPhoto.title || "Animal photo"} 
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm">
                    <span className="font-medium">Date:</span>{" "}
                    {selectedPhoto.date ? new Date(selectedPhoto.date).toLocaleDateString() : "Unknown"}
                  </p>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={selectedPhoto.likedByUser ? "text-primary" : ""}
                      onClick={() => handleLike(selectedPhoto)}
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      {selectedPhoto.likes || 0} Likes
                    </Button>
                  </div>
                </div>
                
                {selectedPhoto.tags && selectedPhoto.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedPhoto.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="border-t pt-4 mt-4">
                  <CommentSection 
                    photoId={selectedPhoto.id}
                    comments={selectedPhoto.comments || []}
                    onAddComment={handleAddComment}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhotoGallery;
