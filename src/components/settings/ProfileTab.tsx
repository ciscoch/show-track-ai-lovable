
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SaveIcon, UserIcon, MailCheckIcon, Trash2Icon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { User } from "@/types/models";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmailVerificationModal from "./EmailVerificationModal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

interface ProfileTabProps {
  user: User | null;
}

const ProfileTab = ({ user }: ProfileTabProps) => {
  const navigate = useNavigate();
  const [emailVerified, setEmailVerified] = useState(true); // In real app, this would come from user object
  const [isEmailVerificationOpen, setIsEmailVerificationOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

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
      setEmailVerified(false);
      setIsEmailVerificationOpen(true);
      
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
  
  const handleEmailVerified = () => {
    // Close the verification modal
    setIsEmailVerificationOpen(false);
    
    // Update the emailVerified status
    setEmailVerified(true);
    
    // Now update the profile with the new verified email
    const values = form.getValues();
    updateProfile(values);
  };

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    
    try {
      // Simulate API call to delete the account
      // In a real implementation, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Account deleted",
        description: "Your account has been permanently deleted.",
        variant: "destructive"
      });
      
      // Redirect to login page after account deletion
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleProfileUpdate)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5" />
                <span>Personal Information</span>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      Email
                      {emailVerified && (
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">
                          <MailCheckIcon className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="pt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">Subscription Status</div>
                  <Badge className={`py-1 px-3 text-xs ${
                    user?.subscriptionLevel === 'elite' 
                      ? 'bg-primary' 
                      : user?.subscriptionLevel === 'pro' 
                        ? 'bg-accent' 
                        : 'bg-gray-600'
                  }`}>
                    {user?.subscriptionLevel.charAt(0).toUpperCase() + user?.subscriptionLevel.slice(1)} Plan
                  </Badge>
                </div>
                
                <div className="mt-2 text-sm text-muted-foreground">
                  {user?.subscriptionEndDate ? (
                    <span>Your subscription will renew on {new Date(user.subscriptionEndDate).toLocaleDateString()}</span>
                  ) : (
                    <span>Free plan. Upgrade any time to access premium features.</span>
                  )}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-end">
              <Button 
                type="submit" 
                disabled={form.formState.isSubmitting} 
                className="flex items-center gap-1"
              >
                <SaveIcon className="h-4 w-4" />
                {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
      
      {/* Delete Account Section */}
      <Card className="mt-6 border-destructive/20">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <Trash2Icon className="h-5 w-5" />
            <span>Delete Account</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
          
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="flex items-center gap-1">
                <Trash2Icon className="h-4 w-4" />
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action will permanently delete your account and all associated data including your animals, 
                  weight records, photos, journal entries, and other personal information. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Deleting..." : "Yes, delete my account"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
      
      <EmailVerificationModal
        email={newEmail || user?.email || ""}
        open={isEmailVerificationOpen}
        onClose={() => setIsEmailVerificationOpen(false)}
        onVerified={handleEmailVerified}
      />
    </>
  );
};

export default ProfileTab;
