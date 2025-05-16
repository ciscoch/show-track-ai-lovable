
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { Clock } from "lucide-react";

interface TimePickerFieldProps {
  form: UseFormReturn<any>;
}

const TimePickerField = ({ form }: TimePickerFieldProps) => {
  return (
    <FormField
      control={form.control}
      name="time"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Time</FormLabel>
          <div className="relative">
            <FormControl>
              <Input
                type="time"
                placeholder="Select time"
                {...field}
                value={field.value || ""}
              />
            </FormControl>
            <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default TimePickerField;
