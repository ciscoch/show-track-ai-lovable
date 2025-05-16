
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppContext } from "@/contexts/AppContext";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { v4 as uuidv4 } from 'uuid';
import TagsInput from "./TagsInput";
import AnimalSelectField from "./journal/AnimalSelectField";
import DatePickerField from "./journal/DatePickerField";
import MoodSelector from "./journal/MoodSelector";
import { journalFormSchema, JournalFormValues } from "./journal/journalFormSchema";

interface AddJournalEntryFormProps {
  initialAnimalId?: string;
  onSuccess?: () => void;
}

const AddJournalEntryForm = ({ initialAnimalId, onSuccess }: AddJournalEntryFormProps) => {
  const { animals, addJournalEntry } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<JournalFormValues>({
    resolver: zodResolver(journalFormSchema),
    defaultValues: {
      animalId: initialAnimalId || "",
      title: "",
      content: "",
      date: new Date(),
      tags: [],
      mood: "positive",
    },
  });

  const onSubmit = (values: JournalFormValues) => {
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
          <AnimalSelectField form={form} animals={animals} />
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

        <DatePickerField form={form} />

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

        <MoodSelector form={form} />

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
