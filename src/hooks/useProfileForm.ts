
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { User } from "@/types/models";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;

export const useProfileForm = (user: User | null, onEmailChange: (email: string) => void) => {
  const [newEmail, setNewEmail] = useState("");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });

  const handleProfileUpdate = (values: ProfileFormValues) => {
    const emailChanged = values.email !== user?.email;
    
    if (emailChanged) {
      // Store the new email to use in verification modal
      setNewEmail(values.email);
      
      // Start email verification process
      onEmailChange(values.email);
      
      // In a real implementation, you would not update the profile until after verification
      toast({
        title: "Verification required",
        description: "Please verify your email address to complete the profile update",
      });
    } else {
      // If email didn't change, just update the profile directly
      updateProfile(values);
    }
  };
  
  const updateProfile = (values: ProfileFormValues) => {
    // Simulate an API call
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
    console.log("Profile updated with values:", values);
  };

  return {
    form,
    newEmail,
    handleProfileUpdate,
    updateProfile
  };
};
