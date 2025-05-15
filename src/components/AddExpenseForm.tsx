
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
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
import { Checkbox } from "@/components/ui/checkbox";
import { useAppContext } from "@/contexts/AppContext";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon, Camera, Image } from "lucide-react";
import { v4 as uuidv4 } from 'uuid';

const formSchema = z.object({
  animalId: z.string().min(1, "Please select an animal"),
  amount: z.number().positive("Amount must be positive"),
  date: z.date(),
  category: z.enum(["feed", "medicine", "supplies", "entry", "travel", "other"]),
  description: z.string().min(1, "Description is required"),
  taxDeductible: z.boolean().default(true),
  receiptImage: z.instanceof(File).optional(),
});

interface AddExpenseFormProps {
  initialAnimalId?: string;
  onSuccess?: () => void;
}

const AddExpenseForm = ({ initialAnimalId, onSuccess }: AddExpenseFormProps) => {
  const { animals, addExpenseEntry } = useAppContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      animalId: initialAnimalId || "",
      amount: undefined,
      date: new Date(),
      category: "feed",
      description: "",
      taxDeductible: true,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("receiptImage", file);
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        if (e.target?.result) {
          setPreviewUrl(e.target.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      const newEntry = {
        id: uuidv4(),
        animalId: values.animalId,
        date: format(values.date, "yyyy-MM-dd"),
        amount: values.amount,
        category: values.category,
        description: values.description,
        taxDeductible: values.taxDeductible,
        receiptImageUrl: previewUrl || null, // Store the image data URL
      };
      
      addExpenseEntry(newEntry);
      
      toast({
        title: "Expense added successfully",
        description: `$${values.amount.toFixed(2)} for ${animals.find(a => a.id === values.animalId)?.name}`,
      });
      
      form.reset({
        animalId: initialAnimalId || "",
        amount: undefined,
        date: new Date(),
        category: "feed",
        description: "",
        taxDeductible: true,
      });
      setPreviewUrl(null);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      toast({
        title: "Error adding expense",
        description: "There was a problem adding this expense entry",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: "feed", label: "Feed" },
    { value: "medicine", label: "Medicine" },
    { value: "supplies", label: "Supplies" },
    { value: "entry", label: "Show Entry Fees" },
    { value: "travel", label: "Travel" },
    { value: "other", label: "Other" },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount ($)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
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
        </div>

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <select
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                  {...field}
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="e.g. Monthly feed purchase"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="taxDeductible"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Tax Deductible</FormLabel>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="receiptImage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receipt Image</FormLabel>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById('receipt-upload')?.click()}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => document.getElementById('receipt-upload')?.click()}
                    >
                      <Image className="h-4 w-4 mr-2" />
                      Upload Image
                    </Button>
                  </div>
                  <Input
                    id="receipt-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    ref={field.ref}
                  />
                  <FormMessage />
                </div>
                <div>
                  {previewUrl ? (
                    <div className="border rounded-md overflow-hidden h-28">
                      <img 
                        src={previewUrl} 
                        alt="Receipt preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="border rounded-md p-4 flex items-center justify-center h-28 bg-muted/20">
                      <p className="text-sm text-muted-foreground text-center">
                        No receipt image selected
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Expense"}
        </Button>
      </form>
    </Form>
  );
};

export default AddExpenseForm;
