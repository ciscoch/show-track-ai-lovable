
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TagIcon } from "lucide-react";
import { trendSchema } from "./schemas/trendSchema";
import * as z from "zod";

type Trend = {
  title: string;
  description: string;
  tags?: string[];
};

interface TrendsTabContentProps {
  trends: Trend[];
  isEditMode: boolean;
  editIndex: number;
  selectedSpecies: string;
  onSubmit: (data: z.infer<typeof trendSchema>) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onCancel: () => void;
}

const TrendsTabContent = ({
  trends,
  isEditMode,
  editIndex,
  selectedSpecies,
  onSubmit,
  onEdit,
  onDelete,
  onCancel
}: TrendsTabContentProps) => {
  const trendForm = useForm<z.infer<typeof trendSchema>>({
    resolver: zodResolver(trendSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: ""
    }
  });

  // Update form values when editing an existing trend
  React.useEffect(() => {
    if (isEditMode && editIndex >= 0 && trends[editIndex]) {
      const trend = trends[editIndex];
      trendForm.reset({
        title: trend.title,
        description: trend.description,
        tags: trend.tags ? trend.tags.join(", ") : "" // Convert array to comma-separated string
      });
    }
  }, [isEditMode, editIndex, trends, trendForm]);

  return (
    <div className="space-y-4">
      <Form {...trendForm}>
        <form onSubmit={trendForm.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={trendForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Trend Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Focus on Functionality" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={trendForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe the judging trend in detail" 
                    {...field} 
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={trendForm.control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., structure, muscle, balance (comma separated)" 
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Add comma-separated tags to categorize this trend
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Update" : "Add"} Trend
            </Button>
          </div>
        </form>
      </Form>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Trends</CardTitle>
          <CardDescription>
            {trends.length} trends for {selectedSpecies}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {trends.map((trend, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{trend.title}</h4>
                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => onEdit(index)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive"
                      onClick={() => onDelete(index)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{trend.description}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {trend.tags && trend.tags.length > 0 ? (
                    trend.tags.map((tag, tagIndex) => (
                      <Badge key={tagIndex} variant="outline" className="flex gap-1 items-center">
                        <TagIcon className="h-3 w-3" />
                        <span>{tag.trim()}</span>
                      </Badge>
                    ))
                  ) : (
                    <Badge variant="outline" className="flex gap-1 items-center">
                      <TagIcon className="h-3 w-3" />
                      <span>Add tags</span>
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrendsTabContent;
