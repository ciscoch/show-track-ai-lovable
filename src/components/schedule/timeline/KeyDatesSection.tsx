
import React from "react";
import { format, addDays } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PrepTimeline } from "@/types/schedule";

interface KeyDatesSectionProps {
  timeline: PrepTimeline;
  eventDate: Date;
  onTimelineChange: (updatedTimeline: PrepTimeline) => void;
}

const KeyDatesSection = ({ timeline, eventDate, onTimelineChange }: KeyDatesSectionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Dates</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Final Weigh-in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !timeline.finalWeighIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {timeline.finalWeighIn ? (
                  format(timeline.finalWeighIn, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto">
              <Calendar
                mode="single"
                selected={timeline.finalWeighIn}
                onSelect={(date) => onTimelineChange({ ...timeline, finalWeighIn: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Hair Trimming</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !timeline.hairTrimming && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {timeline.hairTrimming ? (
                  format(timeline.hairTrimming, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 pointer-events-auto">
              <Calendar
                mode="single"
                selected={timeline.hairTrimming}
                onSelect={(date) => onTimelineChange({ ...timeline, hairTrimming: date })}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Feed Adjustment Start</label>
          <div className="flex space-x-2">
            <select 
              className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              value={timeline.feedAdjustment?.type || "taper"}
              onChange={(e) => onTimelineChange({
                ...timeline,
                feedAdjustment: {
                  ...(timeline.feedAdjustment || { startDate: addDays(eventDate, -7) }),
                  type: e.target.value as "taper" | "boost"
                }
              })}
            >
              <option value="taper">Taper</option>
              <option value="boost">Boost</option>
            </select>
            
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !timeline.feedAdjustment?.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {timeline.feedAdjustment?.startDate ? (
                    format(timeline.feedAdjustment.startDate, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 pointer-events-auto">
                <Calendar
                  mode="single"
                  selected={timeline.feedAdjustment?.startDate}
                  onSelect={(date) => onTimelineChange({
                    ...timeline,
                    feedAdjustment: {
                      ...(timeline.feedAdjustment || { type: "taper" }),
                      startDate: date as Date
                    }
                  })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <Input 
            placeholder="Feed adjustment notes"
            value={timeline.feedAdjustment?.notes || ""}
            onChange={(e) => onTimelineChange({
              ...timeline,
              feedAdjustment: {
                ...(timeline.feedAdjustment || { type: "taper", startDate: addDays(eventDate, -7) }),
                notes: e.target.value
              }
            })}
            className="mt-2"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default KeyDatesSection;
