
import { ThumbsUp, MessageCircle } from "lucide-react";
import { Photo } from "@/contexts/AppContextTypes";

interface PhotoCardProps {
  photo: Photo;
  onClick: (photo: Photo) => void;
}

export const PhotoCard = ({ photo, onClick }: PhotoCardProps) => {
  return (
    <div 
      key={photo.id} 
      className="aspect-square rounded-md overflow-hidden relative cursor-pointer border border-border hover:border-primary group"
      onClick={() => onClick(photo)}
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
  );
};
