
import { useState, useId } from "react";
import { Button } from "@/components/ui/button";
import { UploadIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ImageUploadButtonProps {
  onImageSelected: (file: File) => Promise<void>;
  className?: string;
  children?: React.ReactNode;
}

const ImageUploadButton = ({ onImageSelected, className, children }: ImageUploadButtonProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const inputId = useId();
  
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (.jpg, .png, .gif)",
        variant: "destructive"
      });
      return;
    }
    
    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Image must be less than 5MB in size",
        variant: "destructive"
      });
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Prevent default form submission behavior that might cause navigation
      e.preventDefault();
      await onImageSelected(file);
      toast({
        title: "Image uploaded",
        description: "Your animal's photo has been updated"
      });
    } catch (error) {
      console.error("Upload failed:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your image",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
      // Reset the input value so the same file can be uploaded again if needed
      e.target.value = '';
    }
  };
  
  return (
    <div className={className}>
      <input
        type="file"
        id={inputId}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <label htmlFor={inputId}>
        {children || (
          <Button 
            variant="secondary" 
            size="sm" 
            className="w-full"
            disabled={isUploading}
            type="button" // Explicitly set type to prevent form submission
          >
            <UploadIcon className="w-4 h-4 mr-2" />
            {isUploading ? "Uploading..." : "Upload Image"}
          </Button>
        )}
      </label>
    </div>
  );
};

export default ImageUploadButton;
