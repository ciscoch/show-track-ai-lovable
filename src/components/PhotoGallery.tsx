import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { PhotoGrid } from "./gallery/PhotoGrid";
import { PhotoModal } from "./gallery/PhotoModal";
import { Photo, Comment } from "@/contexts/AppContextTypes";

interface PhotoGalleryProps {
  photos: Photo[];
  animalId?: string;
  onAddPhoto?: (photo: Photo) => void;
}

// Enhanced placeholder photos with likes and comments
const placeholderPhotos: Photo[] = [
  {
    id: "p1",
    animal_id: "1",
    url: "https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=612&q=80",
    filename: "first-day.jpg",
    caption: "First day home",
    created_at: "2023-03-15",
    title: "First day home",
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
    animal_id: "1",
    url: "https://images.unsplash.com/photo-1596116921775-c6648616780c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
    filename: "training-session.jpg",
    caption: "Training session",
    created_at: "2023-04-02",
    title: "Training session",
    date: "2023-04-02",
    tags: ["training", "progress"],
    likes: 3,
    comments: []
  },
  {
    id: "p3",
    animal_id: "2",
    url: "https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1015&q=80",
    filename: "show-prep.jpg",
    caption: "Getting ready for the show",
    created_at: "2023-03-20",
    title: "Getting ready for the show",
    date: "2023-03-20",
    tags: ["preparation", "grooming"]
  },
  {
    id: "p4",
    animal_id: "3",
    url: "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80",
    filename: "show-day.jpg",
    caption: "First show day",
    created_at: "2023-04-15",
    title: "First show day",
    date: "2023-04-15",
    tags: ["show", "competition"]
  }
];

const PhotoGallery = ({ photos = placeholderPhotos, animalId, onAddPhoto }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [galleryPhotos, setGalleryPhotos] = useState<Photo[]>(photos);
  const { user } = useAppContext();

  const filteredPhotos = animalId ? galleryPhotos.filter(p => p.animal_id === animalId) : galleryPhotos;
  
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
    <>
      <PhotoGrid
        photos={filteredPhotos}
        onPhotoClick={handlePhotoClick}
        onAddPhoto={handleAddPhoto}
        isUploading={isUploading}
      />
      
      <PhotoModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onLike={handleLike}
        onAddComment={handleAddComment}
      />
    </>
  );
};

export default PhotoGallery;
