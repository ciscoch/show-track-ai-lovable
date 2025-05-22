
import { Button } from "@/components/ui/button";
import { XIcon, ThumbsUp } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CommentSection, Comment } from "./CommentSection";
import { Photo } from "@/contexts/AppContextTypes";

interface PhotoModalProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (photo: Photo) => void;
  onAddComment: (comment: Comment) => void;
}

export const PhotoModal = ({ 
  photo, 
  isOpen, 
  onClose, 
  onLike,
  onAddComment 
}: PhotoModalProps) => {
  if (!photo) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>{photo.caption || photo.title || "Photo Details"}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col space-y-4">
          <div className="relative max-h-[50vh] overflow-hidden rounded-md">
            <img 
              src={photo.url} 
              alt={photo.caption || photo.title || "Animal photo"} 
              className="w-full h-full object-contain"
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm">
                <span className="font-medium">Date:</span>{" "}
                {photo.date ? new Date(photo.date).toLocaleDateString() : "Unknown"}
              </p>
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className={photo.likedByUser ? "text-primary" : ""}
                  onClick={() => onLike(photo)}
                >
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  {photo.likes || 0} Likes
                </Button>
              </div>
            </div>
            
            {photo.tags && photo.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {photo.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {photo.analysisResult && (
              <p className="text-sm text-muted-foreground">
                {photo.analysisResult}
              </p>
            )}
            
            <div className="border-t pt-4 mt-4">
              <CommentSection 
                photoId={photo.id}
                comments={photo.comments || []}
                onAddComment={onAddComment}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
