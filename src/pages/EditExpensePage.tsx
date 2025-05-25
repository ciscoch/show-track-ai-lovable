
import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
// Import your edit expense form component when available

const EditExpensePage = () => {
  const { expenseId } = useParams();

  return (
    <MainLayout title="Edit Expense">
      <div>Edit expense form for ID: {expenseId}</div>
    </MainLayout>
  );
};

export default EditExpensePage;
