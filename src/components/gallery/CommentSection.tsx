
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { MessageCircle } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { toast } from "@/hooks/use-toast";

export interface Comment {
  id: string;
  photoId: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  createdAt: string;
}

interface CommentSectionProps {
  photoId: string;
  comments: Comment[];
  onAddComment: (comment: Comment) => void;
}

export const CommentSection = ({ photoId, comments, onAddComment }: CommentSectionProps) => {
  const { user } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm({
    defaultValues: {
      comment: "",
    },
  });
  
  const handleSubmit = form.handleSubmit((data) => {
    if (!user) {
      toast({
        title: "Not signed in",
        description: "You need to sign in to leave a comment",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Create a new comment
    const newComment = {
      id: crypto.randomUUID(),
      photoId,
      userId: user.id,
      userName: `${user.firstName} ${user.lastName}`,
      userAvatar: undefined,
      content: data.comment,
      createdAt: new Date().toISOString(),
    };
    
    // In a real app, we would save this to a database
    // For this demo, we just add it to the local state
    setTimeout(() => {
      onAddComment(newComment);
      form.reset();
      setIsSubmitting(false);
    }, 500);
  });
  
  return (
    <div className="space-y-4">
      <h3 className="font-medium text-sm flex items-center gap-1">
        <MessageCircle className="h-4 w-4" />
        Comments ({comments.length})
      </h3>
      
      {comments.length > 0 ? (
        <ul className="space-y-4">
          {comments.map((comment) => (
            <li key={comment.id} className="flex gap-3">
              <Avatar className="h-8 w-8">
                {comment.userAvatar && <AvatarImage src={comment.userAvatar} alt={comment.userName} />}
                <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center">
                  <span className="font-medium text-sm">{comment.userName}</span>
                  <span className="text-xs text-muted-foreground ml-2">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm mt-1">{comment.content}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted-foreground">No comments yet. Be the first to comment!</p>
      )}
      
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-2">
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea 
                    placeholder="Add a comment..." 
                    className="resize-none" 
                    {...field} 
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button 
            type="submit" 
            size="sm" 
            disabled={isSubmitting || !form.watch("comment").trim()}
          >
            {isSubmitting ? "Posting..." : "Post Comment"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
