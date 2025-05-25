
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
import TagsInput from "./TagsInput";
import AnimalSelectField from "./journal/AnimalSelectField";
import DatePickerField from "./journal/DatePickerField";
import TimePickerField from "./journal/TimePickerField";
import MoodSelector from "./journal/MoodSelector";
import JournalImageUpload from "./journal/JournalImageUpload";
import { journalFormSchema, JournalFormValues } from "./journal/journalFormSchema";
import { usePhotoUpload } from "@/hooks/usePhotoUpload";
import LoadingState from "./LoadingState";
import ErrorState from "./ErrorState";

interface AddJournalEntryFormProps {
  initialAnimalId?: string;
  onSuccess?: () => void;
}

const AddJournalEntryForm = ({ initialAnimalId, onSuccess }: AddJournalEntryFormProps) => {
  const { animals, addJournalEntry, loading, error } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadPhoto } = usePhotoUpload();

  const form = useForm<JournalFormValues>({
    resolver: zodResolver(journalFormSchema),
    defaultValues: {
      animalId: initialAnimalId || "",
      title: "",
      content: "",
      date: new Date(),
      time: format(new Date(), "HH:mm"),
      tags: [],
      mood: "positive",
      images: [],
    },
  });

  if (loading) {
    return <LoadingState message="Loading animals..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={() => window.location.reload()} />;
  }

  const onSubmit = async (values: JournalFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Upload images if any
      const imageUrls: string[] = [];
      
      if (values.images && values.images.length > 0) {
        await Promise.all(
          values.images.map(async (file) => {
            try {
              const photo = await uploadPhoto({
                file,
                animalId: values.animalId,
                caption: values.title,
                tags: values.tags
              });
              imageUrls.push(photo.url);
            } catch (error) {
              console.error("Error uploading image:", error);
            }
          })
        );
      }
      
      const newEntry = {
        animal_id: values.animalId,
        date: format(values.date, "yyyy-MM-dd"),
        title: values.title,
        content: values.content,
        tags: values.tags.join(','), // Convert array to string
        mood: values.mood,
      };
      
      await addJournalEntry(newEntry);
      
      toast({
        title: "Journal entry added",
        description: `Entry added for ${animals.find(a => a.id === values.animalId)?.name}`,
      });
      
      form.reset({
        animalId: initialAnimalId || "",
        title: "",
        content: "",
        date: new Date(),
        time: format(new Date(), "HH:mm"),
        tags: [],
        mood: "positive",
        images: [],
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DatePickerField form={form} />
          <TimePickerField form={form} />
        </div>

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

        <JournalImageUpload form={form} />

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
          {isSubmitting ? (
            <>
              <LoadingState variant="spinner" className="mr-2" />
              Adding...
            </>
          ) : (
            "Add Journal Entry"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default AddJournalEntryForm;
