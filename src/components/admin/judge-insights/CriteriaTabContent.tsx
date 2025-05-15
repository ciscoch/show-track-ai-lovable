
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Form validation schema
const criteriaSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  importance: z.enum(["High", "Medium", "Low"])
});

type Criteria = {
  name: string;
  description: string;
  importance: string;
};

interface CriteriaTabContentProps {
  criteria: Criteria[];
  isEditMode: boolean;
  editIndex: number;
  selectedSpecies: string;
  onSubmit: (data: z.infer<typeof criteriaSchema>) => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
  onCancel: () => void;
}

const CriteriaTabContent = ({
  criteria,
  isEditMode,
  editIndex,
  selectedSpecies,
  onSubmit,
  onEdit,
  onDelete,
  onCancel
}: CriteriaTabContentProps) => {
  const criteriaForm = useForm<z.infer<typeof criteriaSchema>>({
    resolver: zodResolver(criteriaSchema),
    defaultValues: {
      name: "",
      description: "",
      importance: "Medium" as "High" | "Medium" | "Low"
    }
  });

  // Update form values when editing an existing criterion
  React.useEffect(() => {
    if (isEditMode && editIndex >= 0 && criteria[editIndex]) {
      const criterion = criteria[editIndex];
      criteriaForm.reset({
        name: criterion.name,
        description: criterion.description,
        importance: criterion.importance as "High" | "Medium" | "Low"
      });
    }
  }, [isEditMode, editIndex, criteria, criteriaForm]);

  return (
    <div className="space-y-4">
      <Form {...criteriaForm}>
        <form onSubmit={criteriaForm.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={criteriaForm.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Criterion Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Muscle Expression" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={criteriaForm.control}
              name="importance"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Importance</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      {...field}
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={criteriaForm.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe what judges look for in this criterion" 
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
              {isEditMode ? "Update" : "Add"} Criterion
            </Button>
          </div>
        </form>
      </Form>
      
      <Card>
        <CardHeader>
          <CardTitle>Current Judging Criteria</CardTitle>
          <CardDescription>
            {criteria.length} criteria for {selectedSpecies}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Criterion</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Importance</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {criteria.map((criterion, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{criterion.name}</TableCell>
                  <TableCell>{criterion.description}</TableCell>
                  <TableCell>
                    <Badge className={
                      criterion.importance === 'High' ? 'bg-primary' : 
                      criterion.importance === 'Medium' ? 'bg-accent' : 
                      'bg-muted'
                    }>
                      {criterion.importance}
                    </Badge>
                  </TableCell>
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

export default CriteriaTabContent;
