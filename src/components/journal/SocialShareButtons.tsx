
import React from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

interface SocialShareButtonsProps {
  title: string;
  text: string;
  className?: string;
}

const SocialShareButtons = ({ title, text, className }: SocialShareButtonsProps) => {
  const handleShare = async (platform: string) => {
    const shareText = `${title}: ${text.substring(0, 100)}${text.length > 100 ? '...' : ''}`;
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    
    try {
      // Try Web Share API first if available
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl,
        });
        return;
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
    
    // Fallback to platform-specific sharing or copying link
    switch (platform) {
      case "facebook":
        if (typeof window !== "undefined") {
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank");
        }
        break;
      case "twitter":
        if (typeof window !== "undefined") {
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, "_blank");
        }
        break;
      case "linkedin":
        if (typeof window !== "undefined") {
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank");
        }
        break;
      case "copy":
      default:
        if (typeof navigator !== "undefined" && navigator.clipboard) {
          navigator.clipboard.writeText(`${title}\n\n${text}\n\n${shareUrl}`);
        }
        toast({
          title: "Link copied",
          description: "Journal entry link copied to clipboard",
        });
    }
  };
  
  return (
    <div className={`flex space-x-2 ${className || ""}`}>
      <Button 
        onClick={() => handleShare("facebook")} 
        variant="outline" 
        size="icon"
        className="h-8 w-8 rounded-full"
      >
        <Facebook className="h-4 w-4" />
        <span className="sr-only">Share on Facebook</span>
      </Button>
      
      <Button 
        onClick={() => handleShare("twitter")} 
        variant="outline" 
        size="icon"
        className="h-8 w-8 rounded-full"
      >
        <Twitter className="h-4 w-4" />
        <span className="sr-only">Share on Twitter</span>
      </Button>
      
      <Button 
        onClick={() => handleShare("linkedin")} 
        variant="outline" 
        size="icon"
        className="h-8 w-8 rounded-full"
      >
        <Linkedin className="h-4 w-4" />
        <span className="sr-only">Share on LinkedIn</span>
      </Button>
      
      <Button 
        onClick={() => handleShare("copy")} 
        variant="outline"
        size="sm"
      >
        Copy Link
      </Button>
    </div>
  );
};

export default SocialShareButtons;
