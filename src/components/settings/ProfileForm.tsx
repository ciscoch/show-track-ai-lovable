
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SaveIcon, UserIcon, MailCheckIcon } from "lucide-react";
import { User } from "@/types/models";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SubscriptionStatus from "./SubscriptionStatus";
import { useProfileForm, ProfileFormValues } from "@/hooks/useProfileForm";

interface ProfileFormProps {
  user: User | null;
  emailVerified: boolean;
  onEmailChange: (email: string) => void;
}

const ProfileForm = ({ user, emailVerified, onEmailChange }: ProfileFormProps) => {
  const { form, handleProfileUpdate } = useProfileForm(user, onEmailChange);

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
            
            <SubscriptionStatus user={user} />
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

export default ProfileForm;
