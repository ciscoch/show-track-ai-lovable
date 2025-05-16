
import * as z from "zod";

export const reviewSchema = z.object({
  nextReviewDate: z.date(),
  reviewerName: z.string().min(3, "Reviewer name must be at least 3 characters"),
  notes: z.string().optional()
});
