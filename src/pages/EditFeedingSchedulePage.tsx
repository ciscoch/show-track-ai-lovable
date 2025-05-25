
import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
// Import your edit feeding schedule form component when available

const EditFeedingSchedulePage = () => {
  const { scheduleId } = useParams();

  return (
    <MainLayout title="Edit Feeding Schedule">
      <div>Edit feeding schedule form for ID: {scheduleId}</div>
    </MainLayout>
  );
};

export default EditFeedingSchedulePage;
