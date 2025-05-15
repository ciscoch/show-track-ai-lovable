
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form validation schema
const tipSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters")
});

type Tip = {
  title: string;
  description: string;
};

interface TipsTabContentProps {
  tips: Tip[];
  isEditMode: boolean;
  editIndex: number;
  selectedSpecies: string;
  onSubmit: (data: z.infer<typeof tipSchema>) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onCancel: () => void;
}

const TipsTabContent = ({
  tips,
  isEditMode,
  editIndex,
  selectedSpecies,
  onSubmit,
  onEdit,
  onDelete,
  onCancel
}: TipsTabContentProps) => {
  const tipForm = useForm<z.infer<typeof tipSchema>>({
    resolver: zodResolver(tipSchema),
    defaultValues: {
      title: "",
      description: ""
    }
  });

  // Update form values when editing an existing tip
  React.useEffect(() => {
    if (isEditMode && editIndex >= 0 && tips[editIndex]) {
      const tip = tips[editIndex];
      tipForm.reset({
        title: tip.title,
        description: tip.description
      });
    }
  }, [isEditMode, editIndex, tips, tipForm]);

  return (
    <div className="space-y-4">
      <Form {...tipForm}>
        <form onSubmit={tipForm.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={tipForm.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tip Title</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Strategic Conditioning" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={tipForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Provide detailed preparation advice based on judge research" 
                    {...field} 
                    className="min-h-[100px]"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? "Update" : "Add"} Tip
            </Button>
          </div>
        </form>
      </Form>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Preparation Tips</CardTitle>
          <CardDescription>
            {tips.length} preparation tips for {selectedSpecies}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tip</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tips.map((tip, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{tip.title}</TableCell>
                  <TableCell>{tip.description}</TableCell>
                  <TableCell>
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TipsTabContent;
