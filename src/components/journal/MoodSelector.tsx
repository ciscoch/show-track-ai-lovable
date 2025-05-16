
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

// Define the schema type for the form that will be using this component
interface MoodSelectorProps {
  form: UseFormReturn<any>;
}

const MoodSelector = ({ form }: MoodSelectorProps) => {
  return (
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
  );
};

export default MoodSelector;
