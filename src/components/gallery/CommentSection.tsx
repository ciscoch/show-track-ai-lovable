
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/contexts/AppContext";
import { Comment } from "@/contexts/AppContextTypes";

interface CommentSectionProps {
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
  photoId: string;
}

const CommentSection = ({ comments, onAddComment, photoId }: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");
  const { user } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    const comment: Comment = {
      id: Date.now().toString(),
      photoId,
      userId: user.id,
      userName: user.email || "Anonymous",
      content: newComment,
      createdAt: new Date().toISOString()
    };

    onAddComment(comment);
    setNewComment("");
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold">Comments ({comments.length})</h4>
      
      <div className="space-y-3 max-h-32 overflow-y-auto">
        {comments.map((comment) => (
          <div key={comment.id} className="text-sm">
            <span className="font-medium">{comment.userName}</span>
            <p className="text-muted-foreground">{comment.content}</p>
          </div>
        ))}
      </div>

      {user && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <Textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[60px]"
          />
          <Button type="submit" size="sm" disabled={!newComment.trim()}>
            Post Comment
          </Button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;
