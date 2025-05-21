
import React, { useState } from "react";
import { WeightEntry } from "@/types/models";
import WeightChart from "@/components/WeightChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/contexts/AppContext";
import { toast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

interface WeightHistoryTabProps {
  weights: WeightEntry[];
  animalId: string;
  targetWeight?: number;
}

const formSchema = z.object({
  weight: z.number().positive("Weight must be positive"),
  date: z.date(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const WeightHistoryTab = ({ weights, animalId, targetWeight }: WeightHistoryTabProps) => {
  const navigate = useNavigate();
  const { updateWeightEntry, deleteWeightEntry } = useAppContext();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEditEntry, setCurrentEditEntry] = useState<WeightEntry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      weight: 0,
      date: new Date(),
      notes: "",
    },
  });

  const handleAddWeight = () => {
    navigate(`/animal/${animalId}/add-weight`);
  };

  const handleEditEntry = (entry: WeightEntry) => {
    setCurrentEditEntry(entry);
    form.reset({
      weight: entry.weight,
      date: new Date(entry.date),
      notes: entry.notes || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteEntry = (entryId: string) => {
    if (window.confirm("Are you sure you want to delete this weight entry?")) {
      deleteWeightEntry(entryId);
      toast({
        title: "Weight entry deleted",
        description: "The weight entry has been removed",
      });
    }
  };

  const onSubmitEdit = (values: FormValues) => {
    if (!currentEditEntry) return;
    
    setIsSubmitting(true);
    
    try {
      const updatedEntry: WeightEntry = {
        ...currentEditEntry,
        weight: values.weight,
        date: format(values.date, "yyyy-MM-dd"),
        notes: values.notes,
      };
      
      updateWeightEntry(updatedEntry);
      
      toast({
        title: "Weight entry updated",
        description: `Updated weight entry to ${values.weight}lbs`,
      });
      
      setIsEditDialogOpen(false);
      setCurrentEditEntry(null);
    } catch (error) {
      toast({
        title: "Error updating weight",
        description: "There was a problem updating this weight entry",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const animalWeights = weights
    .filter(entry => entry.animalId === animalId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Weight History</h2>
        <Button onClick={handleAddWeight}>Add Weight</Button>
      </div>
      
      <WeightChart 
        weights={weights} 
        animalId={animalId}
        targetWeight={targetWeight}
        showFullHistory={true}
      />
      
      <Card>
        <CardHeader>
          <CardTitle>Weight Log</CardTitle>
          <CardDescription>Detailed weight records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {animalWeights.map(entry => (
              <div 
                key={entry.id} 
                className="flex justify-between py-3 border-b"
              >
                <div>
                  <div className="font-medium">
                    {new Date(entry.date).toLocaleDateString()}
                  </div>
                  {entry.notes && (
                    <div className="text-sm text-muted-foreground">
                      {entry.notes}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-bold">{entry.weight} lbs</div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditEntry(entry)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
            
            {animalWeights.length === 0 && (
              <p className="text-center py-4 text-muted-foreground">
                No weight records found. Add a weight entry to get started.
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Weight Entry</DialogTitle>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-6">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (lbs)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.1"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notes</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any notes about this weight measurement"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default WeightHistoryTab;
