
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { ShowEvent } from "@/types/schedule";
import { Animal } from "@/types/models";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";

interface EventFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (event: ShowEvent) => void;
  animals: Animal[];
  event?: ShowEvent; // Optional event for editing
}

const EventFormDialog = ({
  open,
  onOpenChange,
  onSave,
  animals,
  event
}: EventFormDialogProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<Date>(new Date());
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<"show" | "practice" | "appointment" | "other">("show");
  const [notes, setNotes] = useState("");
  const [reminder, setReminder] = useState(false);
  const [selectedAnimalIds, setSelectedAnimalIds] = useState<string[]>([]);

  // Reset form or populate with event data when dialog opens
  useEffect(() => {
    if (open) {
      if (event) {
        // Editing mode - populate form
        setTitle(event.title);
        setDate(event.date);
        setLocation(event.location);
        setCategory(event.category);
        setNotes(event.notes || "");
        setReminder(event.reminder || false);
        setSelectedAnimalIds(event.animals);
      } else {
        // Adding mode - reset form
        setTitle("");
        setDate(new Date());
        setLocation("");
        setCategory("show");
        setNotes("");
        setReminder(false);
        setSelectedAnimalIds([]);
      }
    }
  }, [open, event]);

  const handleSave = () => {
    const updatedEvent: ShowEvent = {
      id: event?.id || uuidv4(),
      title,
      date,
      location,
      animals: selectedAnimalIds,
      category,
      notes: notes || undefined,
      reminder,
      prepTimeline: event?.prepTimeline
    };

    onSave(updatedEvent);
    onOpenChange(false);
  };

  const toggleAnimalSelection = (animalId: string) => {
    setSelectedAnimalIds(prev => 
      prev.includes(animalId) 
        ? prev.filter(id => id !== animalId)
        : [...prev, animalId]
    );
  };

  const isFormValid = title && location && selectedAnimalIds.length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{event ? "Edit Event" : "Add New Event"}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right text-sm font-medium">
              Title
            </label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              placeholder="Event title"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right text-sm font-medium">
              Date
            </label>
            <div className="col-span-3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(newDate) => newDate && setDate(newDate)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="location" className="text-right text-sm font-medium">
              Location
            </label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="col-span-3"
              placeholder="Event location"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="category" className="text-right text-sm font-medium">
              Category
            </label>
            <Select value={category} onValueChange={(value) => setCategory(value as any)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="show">Show</SelectItem>
                <SelectItem value="practice">Practice</SelectItem>
                <SelectItem value="appointment">Appointment</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label className="text-right text-sm font-medium">
              Animals
            </label>
            <div className="col-span-3 space-y-2">
              {animals.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {animals.map((animal) => (
                    <Badge
                      key={animal.id}
                      variant={selectedAnimalIds.includes(animal.id) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleAnimalSelection(animal.id)}
                    >
                      {animal.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No animals available.</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="notes" className="text-right text-sm font-medium">
              Notes
            </label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="col-span-3"
              placeholder="Additional notes"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <div></div>
            <div className="col-span-3 flex items-center space-x-2">
              <Checkbox 
                id="reminder" 
                checked={reminder} 
                onCheckedChange={(checked) => setReminder(checked === true)}
              />
              <label
                htmlFor="reminder"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Set reminder
              </label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSave} disabled={!isFormValid}>
            {event ? "Save Changes" : "Add Event"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventFormDialog;
