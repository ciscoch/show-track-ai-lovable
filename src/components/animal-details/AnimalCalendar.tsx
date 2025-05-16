
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AnimalCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const navigate = useNavigate();

  return (
    <Card className="w-full md:w-auto md:min-w-[280px]">
      <CardHeader className="pb-3">
        <CardTitle>Calendar</CardTitle>
        <CardDescription>Track important dates</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </CardContent>
      <CardFooter className="flex justify-between pt-3">
        <Button variant="outline" size="sm" onClick={() => navigate('/schedule')}>View Schedule</Button>
        <Button size="sm" onClick={() => navigate('/schedule')}>Add Event</Button>
      </CardFooter>
    </Card>
  );
};

export default AnimalCalendar;
