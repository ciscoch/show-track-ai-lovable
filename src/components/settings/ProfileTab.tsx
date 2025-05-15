
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SaveIcon, UserIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { User } from "@/types/models";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });

  const handleProfileUpdate = (values: ProfileFormValues) => {
    // Simulate an API call
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully."
    });
    console.log("Profile updated with values:", values);
  };

  return (
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
                  <FormLabel>Email</FormLabel>
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
  );
};

export default ProfileTab;
