import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import ImageUploadButton from "@/components/ImageUploadButton";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { User } from "@/types/models";
import { toast } from "@/hooks/use-toast";
import { logger } from "@/lib/logger";

interface AboutMeSectionProps {
  user: User | null;
}

const aboutMeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  aboutMe: z.string().optional(),
});

type AboutMeValues = z.infer<typeof aboutMeSchema>;

const AboutMeSection = ({ user }: AboutMeSectionProps) => {
  const [photo, setPhoto] = useState<string | null>(user?.avatarUrl || null);

  const form = useForm<AboutMeValues>({
    resolver: zodResolver(aboutMeSchema),
    defaultValues: {
      name:
        user?.name ||
        `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim(),
      aboutMe: user?.aboutMe || "",
    },
  });

  const handleImageSelected = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = (values: AboutMeValues) => {
    logger.info("About Me", { ...values, photo });
    toast({ title: "Profile updated", description: "Your About Me section was saved." });
  };

  return (
    <Card className="mt-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>About Me (optional)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                {photo ? (
                  <img src={photo} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                  <span className="text-xs text-muted-foreground">No photo</span>
                )}
              </div>
              <ImageUploadButton onImageSelected={handleImageSelected} />
            </div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="aboutMe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fun Details</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Share something interesting about yourself" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">Save About Me</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AboutMeSection;
