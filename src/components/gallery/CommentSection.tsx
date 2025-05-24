
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAppContext } from "@/contexts/AppContext";
import { Comment } from "@/contexts/AppContextTypes";

interface CommentSectionProps {
  photoId: string;
  comments?: Comment[];
  onAddComment?: (comment: Comment) => void;
}

const CommentSection = ({ photoId, comments = [], onAddComment }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const { user } = useAppContext();

  const handleAddComment = () => {
    if (!newComment.trim() || !user || !onAddComment) return;

    const comment: Comment = {
      id: Date.now().toString(),
      photoId,
      userId: user.id,
      userName: user.email || "User",
      content: newComment.trim(),
      createdAt: new Date().toISOString()
    };

    onAddComment(comment);
    setNewComment("");
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Comments</h3>
      
      {/* Comment Input */}
      {user && (
        <div className="space-y-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[80px]"
          />
          <Button 
            onClick={handleAddComment}
            disabled={!newComment.trim()}
            size="sm"
          >
            Post Comment
          </Button>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback>
                {comment.userName.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-sm">{comment.userName}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;

export type { Comment };
