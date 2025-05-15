
import React, { useState, useRef } from "react";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Upload, Check, X, FileIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const UploadsPage = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploaded, setUploaded] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const simulateUpload = () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select files to upload first.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    // Simulate upload process with timeout
    setTimeout(() => {
      const uploadedNames = files.map(file => file.name);
      setUploaded((prev) => [...prev, ...uploadedNames]);
      setFiles([]);
      setUploading(false);
      
      toast({
        title: "Upload successful",
        description: `${uploadedNames.length} files have been uploaded.`,
        variant: "default",
      });
    }, 2000);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <MainLayout title="File Uploads">
      <div className="mb-6">
        <p className="text-muted-foreground">
          Note: This is a simulation of file uploads. In an actual deployment, 
          you would need to configure a server endpoint to receive and store these files.
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
          </CardHeader>
          <CardContent>
            <Input 
              ref={fileInputRef}
              type="file" 
              className="hidden" 
              onChange={handleFileChange}
              multiple
            />
            
            <div 
              className="border-2 border-dashed rounded-lg p-8 text-center hover:bg-muted/50 cursor-pointer transition-colors mb-6"
              onClick={triggerFileInput}
            >
              <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-1">
                Click to browse or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                Supported file types: Images, PDFs, Documents, etc.
              </p>
            </div>
            
            {files.length > 0 && (
              <div className="space-y-2 mb-6">
                <h3 className="text-sm font-medium">Selected Files</h3>
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div className="flex items-center space-x-2">
                      <FileIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFile(index)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <Button 
              onClick={simulateUpload} 
              className="w-full"
              disabled={files.length === 0 || uploading}
            >
              {uploading ? "Uploading..." : "Upload Files"}
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Uploaded Files</CardTitle>
          </CardHeader>
          <CardContent>
            {uploaded.length > 0 ? (
              <div className="space-y-2">
                {uploaded.map((name, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-sm truncate max-w-[200px]">{name}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">Uploaded</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-muted-foreground">
                <p>No files uploaded yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default UploadsPage;
