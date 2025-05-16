
import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { Animal } from "@/types/models";

interface AnimalSelectFieldProps {
  form: UseFormReturn<any>;
  animals: Animal[];
}

const AnimalSelectField = ({ form, animals }: AnimalSelectFieldProps) => {
  return (
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
  );
};

export default AnimalSelectField;
