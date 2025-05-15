
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/contexts/AppContext";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  animalId: z.string().min(1, "Please select an animal"),
  weight: z.number().positive("Weight must be positive"),
  date: z.date(),
  notes: z.string().optional(),
});

interface AddWeightFormProps {
  initialAnimalId?: string;
  onSuccess?: () => void;
}

const AddWeightForm = ({ initialAnimalId, onSuccess }: AddWeightFormProps) => {
  const { animals, addWeightEntry } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animalId: initialAnimalId || "",
      weight: undefined,
      date: new Date(),
      notes: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const newEntry = {
        id: uuidv4(),
        animalId: values.animalId,
        date: format(values.date, "yyyy-MM-dd"),
        weight: values.weight,
        notes: values.notes,
      };
      
      addWeightEntry(newEntry);
      
      toast({
        title: "Weight added successfully",
        description: `Recorded ${values.weight}lbs for ${animals.find(a => a.id === values.animalId)?.name}`,
      });
      
      form.reset({
        animalId: initialAnimalId || "",
        weight: undefined,
        date: new Date(),
        notes: "",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error adding weight",
        description: "There was a problem adding this weight entry",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {!initialAnimalId && (
          <FormField
            control={form.control}
            name="animalId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Animal</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    {...field}
                  >
                    <option value="">Select an animal</option>
                    {animals.map((animal) => (
                      <option key={animal.id} value={animal.id}>
                        {animal.name} ({animal.species})
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

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
              <FormDescription>
                Optional notes about condition, feed changes, etc.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Weight Entry"}
        </Button>
      </form>
    </Form>
  );
};

export default AddWeightForm;
