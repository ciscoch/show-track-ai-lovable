
import { z } from "zod";

export const journalFormSchema = z.object({
  animalId: z.string().min(1, "Please select an animal"),
  title: z.string().min(1, "Please enter a title"),
  content: z.string().min(1, "Please enter some content"),
  date: z.date(),
  time: z.string().optional(),
  tags: z.array(z.string()),
  mood: z.enum(["positive", "neutral", "negative"]).default("positive"),
  images: z.array(z.instanceof(File)).optional(),
});

export type JournalFormValues = z.infer<typeof journalFormSchema>;
