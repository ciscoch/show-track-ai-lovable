
import React from "react";
import MainLayout from "@/components/MainLayout";
import { ScheduleForm } from "@/components/feeding/ScheduleForm";

const AddFeedingSchedulePage = () => {
  return (
    <MainLayout title="Add Feeding Schedule">
      <ScheduleForm />
    </MainLayout>
  );
};

export default AddFeedingSchedulePage;
