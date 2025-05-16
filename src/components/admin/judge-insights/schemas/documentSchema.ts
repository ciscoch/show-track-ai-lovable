
import * as z from "zod";

export const documentSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  fileUrl: z.string().url("Please enter a valid URL"),
  description: z.string().optional()
});
