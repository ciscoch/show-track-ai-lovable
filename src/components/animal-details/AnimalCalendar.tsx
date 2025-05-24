
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CalendarIcon, PlusCircleIcon } from "lucide-react";

const AnimalCalendar = () => {
  const navigate = useNavigate();

  return (
    <Card className="w-full md:w-auto md:min-w-[320px]">
      <CardHeader className="pb-3">
        <CardTitle>Calendar</CardTitle>
        <CardDescription>Track important dates</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="flex flex-col items-center justify-center space-y-4 py-6">
          <CalendarIcon className="h-12 w-12 text-muted-foreground" />
          <p className="text-center text-muted-foreground">Schedule your animal events</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-3">
        <Button variant="outline" size="sm" onClick={() => navigate('/schedule')}>
          View Schedule
        </Button>
        <Button size="sm" onClick={() => navigate('/schedule')}>
          <PlusCircleIcon className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AnimalCalendar;
