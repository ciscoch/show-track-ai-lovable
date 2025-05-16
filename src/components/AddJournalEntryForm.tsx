
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
import TagsInput from "./TagsInput";

const formSchema = z.object({
  animalId: z.string().min(1, "Please select an animal"),
  title: z.string().min(1, "Please enter a title"),
  content: z.string().min(1, "Please enter some content"),
  date: z.date(),
  tags: z.array(z.string()),
  mood: z.enum(["positive", "neutral", "negative"]).default("positive"),
});

interface AddJournalEntryFormProps {
  initialAnimalId?: string;
  onSuccess?: () => void;
}

const AddJournalEntryForm = ({ initialAnimalId, onSuccess }: AddJournalEntryFormProps) => {
  const { animals, addJournalEntry } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animalId: initialAnimalId || "",
      title: "",
      content: "",
      date: new Date(),
      tags: [],
      mood: "positive",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const newEntry = {
        id: uuidv4(),
        animalId: values.animalId,
        date: format(values.date, "yyyy-MM-dd"),
        title: values.title,
        content: values.content,
        tags: values.tags,
        mood: values.mood,
      };
      
      addJournalEntry(newEntry);
      
      toast({
        title: "Journal entry added",
        description: `Entry added for ${animals.find(a => a.id === values.animalId)?.name}`,
      });
      
      form.reset({
        animalId: initialAnimalId || "",
        title: "",
        content: "",
        date: new Date(),
        tags: [],
        mood: "positive",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error adding journal entry",
        description: "There was a problem adding this journal entry",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter a title for your journal entry" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entry Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your journal entry here..."
                  className="min-h-[200px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mood</FormLabel>
              <FormControl>
                <div className="flex space-x-4">
                  {[
                    { value: "positive", emoji: "😊", label: "Positive" },
                    { value: "neutral", emoji: "😐", label: "Neutral" },
                    { value: "negative", emoji: "😟", label: "Negative" }
                  ].map((mood) => (
                    <label key={mood.value} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        value={mood.value}
                        checked={field.value === mood.value}
                        onChange={() => field.onChange(mood.value)}
                        className="sr-only"
                      />
                      <div className={cn(
                        "w-10 h-10 flex items-center justify-center rounded-full border-2",
                        field.value === mood.value 
                          ? "border-primary" 
                          : "border-transparent"
                      )}>
                        <span className="text-2xl">
                          {mood.emoji}
                        </span>
                      </div>
                      <span className="capitalize">{mood.label}</span>
                    </label>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <TagsInput 
                  value={field.value} 
                  onChange={field.onChange} 
                />
              </FormControl>
              <FormDescription>
                Select tags or add your own custom tags
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Journal Entry"}
        </Button>
      </form>
    </Form>
  );
};

export default AddJournalEntryForm;
