
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WebhookTestPage = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleTestWebhook = async () => {
    const payload = {
      name: "WebhookTest",
      user_email: "test-elite@example.com",
      animal_id: "abc123",
      weight: 135.2,
      photo_url: "https://example.com/photo.jpg",
      journal_text: "Looking fuller and more defined after new feed."
    };

    try {
      const response = await fetch("https://qmvbsrivanucfpfjchpw.functions.supabase.co/dynamic-worker", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("✅ Webhook Success:", result);
      alert("Webhook triggered successfully!");
    } catch (error) {
      console.error("❌ Webhook Error:", error);
      alert("Webhook test failed — check console.");
    }
  };

  const handleTestWithImage = async () => {
    if (!selectedImage) {
      alert("Please select an image first");
      return;
    }

    // Convert image to base64
    const reader = new FileReader();
    reader.onload = async (e) => {
      const base64Image = e.target?.result as string;
      
      const payload = {
        name: "WebhookTestWithImage",
        user_email: "test-elite@example.com",
        animal_id: "abc123",
        weight: 135.2,
        photo_url: base64Image,
        photo_filename: selectedImage.name,
        journal_text: "Testing webhook with uploaded image"
      };

      try {
        const response = await fetch("https://cwcharles81.app.n8n.cloud/webhook-test/lovable-image-upload", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.text();
        console.log("✅ N8N Webhook with Image Success:", result);
        alert("N8N Webhook with image triggered successfully!");
      } catch (error) {
        console.error("❌ N8N Webhook with Image Error:", error);
        alert("N8N Webhook with image test failed — check console.");
      }
    };

    reader.readAsDataURL(selectedImage);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <h1 className="text-xl font-bold mb-4">Webhook Test Page</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Basic Webhook Test</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Click the button below to test the Supabase + n8n webhook flow.</p>
          <Button
            onClick={handleTestWebhook}
            className="w-full"
          >
            Trigger Webhook Test
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>N8N Webhook Test with Image Upload</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="image-upload">Select an image to upload</Label>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="mt-1"
            />
          </div>

          {imagePreview && (
            <div className="space-y-2">
              <Label>Image Preview</Label>
              <img 
                src={imagePreview} 
                alt="Selected" 
                className="max-w-full h-48 object-contain border rounded"
              />
              <p className="text-sm text-muted-foreground">
                File: {selectedImage?.name} ({(selectedImage?.size || 0 / 1024).toFixed(1)} KB)
              </p>
            </div>
          )}

          <Button
            onClick={handleTestWithImage}
            disabled={!selectedImage}
            className="w-full"
          >
            Trigger N8N Webhook Test with Image
          </Button>
          
          <p className="text-sm text-muted-foreground">
            This will send the image data to: https://cwcharles81.app.n8n.cloud/webhook-test/lovable-image-upload
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebhookTestPage;
