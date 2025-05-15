
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon } from "lucide-react";

// Form validation schema
const reviewSchema = z.object({
  nextReviewDate: z.string().min(1, "Next review date is required"),
  reviewNotes: z.string().optional(),
  assignedTo: z.string().optional()
});

interface ReviewScheduleTabContentProps {
  onSubmit: (data: z.infer<typeof reviewSchema>) => void;
}

const ReviewScheduleTabContent = ({ onSubmit }: ReviewScheduleTabContentProps) => {
  const reviewForm = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      nextReviewDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 90 days from now
      reviewNotes: "",
      assignedTo: ""
    }
  });

  return (
    <div className="space-y-4">
      <Form {...reviewForm}>
        <form onSubmit={reviewForm.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={reviewForm.control}
              name="nextReviewDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Next Review Date</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                      <Input type="date" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Schedule when this research should be reviewed again
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={reviewForm.control}
              name="assignedTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assigned To</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., content@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    Email of the person responsible for the review
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={reviewForm.control}
            name="reviewNotes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Add notes about what should be reviewed" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Button type="submit" className="flex items-center gap-1">
              <CalendarIcon className="h-4 w-4" />
              Schedule Review
            </Button>
          </div>
        </form>
      </Form>
      
      <Card>
        <CardHeader>
          <CardTitle>Scheduled Reviews</CardTitle>
          <CardDescription>
            Upcoming review cycles for research
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-md">
            <div className="text-center">
              <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No reviews scheduled</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Schedule regular content reviews using the form above
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReviewScheduleTabContent;
