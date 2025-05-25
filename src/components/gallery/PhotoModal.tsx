
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, X, Camera } from "lucide-react";
import { Photo, Comment } from "@/contexts/AppContextTypes";
import CommentSection from "./CommentSection";

interface PhotoModalProps {
  photo: Photo | null;
  isOpen: boolean;
  onClose: () => void;
  onLike: (photo: Photo) => void;
  onAddComment: (comment: Comment) => void;
}

export const PhotoModal = ({ photo, isOpen, onClose, onLike, onAddComment }: PhotoModalProps) => {
  if (!photo) return null;

  const handleLike = () => {
    onLike(photo);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden p-0">
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Section */}
          <div className="flex-1 bg-black flex items-center justify-center">
            <img 
              src={photo.url} 
              alt={photo.caption || photo.title || "Animal photo"} 
              className="max-w-full max-h-[60vh] md:max-h-[80vh] object-contain"
            />
          </div>

          {/* Info Section */}
          <div className="w-full md:w-80 p-6 space-y-4 overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {photo.caption || photo.title || "Photo"}
              </h3>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {(photo.created_at || photo.date) && (
              <p className="text-sm text-muted-foreground">
                {photo.created_at || photo.date}
              </p>
            )}

            <div className="flex items-center gap-2">
              <Button
                variant={photo.likedByUser ? "default" : "outline"}
                size="sm"
                onClick={handleLike}
                className="flex items-center gap-1"
              >
                <Heart className="h-4 w-4" />
                {photo.likes || 0}
              </Button>
            </div>

            {photo.tags && photo.tags.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {photo.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {photo.analysisResult && (
              <div className="space-y-2">
                <p className="text-sm font-medium">AI Analysis</p>
                <p className="text-sm text-muted-foreground">{photo.analysisResult}</p>
              </div>
            )}

            <CommentSection
              comments={photo.comments || []}
              onAddComment={onAddComment}
              photoId={photo.id}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
