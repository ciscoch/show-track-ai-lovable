
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarIcon, FileTextIcon, UploadIcon } from "lucide-react";

// Form validation schema
const documentSchema = z.object({
  title: z.string().min(3, "Document title is required"),
  url: z.string().url("Must be a valid URL"),
  source: z.string().min(3, "Source is required"),
  date: z.string().min(1, "Date is required"),
  notes: z.string().optional()
});

interface DocumentsTabContentProps {
  onSubmit: (data: z.infer<typeof documentSchema>) => void;
}

const DocumentsTabContent = ({ onSubmit }: DocumentsTabContentProps) => {
  const documentForm = useForm<z.infer<typeof documentSchema>>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      title: "",
      url: "",
      source: "",
      date: new Date().toISOString().split('T')[0],
      notes: ""
    }
  });

  return (
    <div className="space-y-4">
      <Form {...documentForm}>
        <form onSubmit={documentForm.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={documentForm.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Document Title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Interview with Judge Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={documentForm.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <div className="flex items-center">
                      <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                      <Input type="date" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={documentForm.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL or File Path</FormLabel>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="e.g., https://example.com/document.pdf" 
                      {...field}
                      className="flex-1" 
                    />
                    <Button type="button" variant="outline" className="flex items-center gap-1">
                      <UploadIcon className="h-4 w-4" />
                      Upload
                    </Button>
                  </div>
                </FormControl>
                <FormDescription>
                  Enter a URL or upload a document file
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={documentForm.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Source</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., National Livestock Show Judge Panel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={documentForm.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Optional notes about this document" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end">
            <Button type="submit" className="flex items-center gap-1">
              <FileTextIcon className="h-4 w-4" />
              Add Document
            </Button>
          </div>
        </form>
      </Form>
      
      <Card>
        <CardHeader>
          <CardTitle>Research Documents</CardTitle>
          <CardDescription>
            Upload and manage reference documents for research
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-md">
            <div className="text-center">
              <FileTextIcon className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-sm font-medium">No documents yet</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Add documents using the form above
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentsTabContent;
