
import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import AnimalFormFields from "@/components/animal-form/AnimalFormFields";
import { useSupabaseApp } from "@/contexts/SupabaseAppContext";

const EditAnimal = () => {
  const { animalId } = useParams();
  const { user } = useSupabaseApp();

  const transformedUser = user ? {
    ...user,
    firstName: user.user_metadata?.first_name || "",
    lastName: user.user_metadata?.last_name || "",
    subscriptionLevel: "pro" as "free" | "pro" | "elite",
    createdAt: user.created_at || new Date().toISOString()
  } : null;

  return (
    <MainLayout title="Edit Animal" user={transformedUser}>
      <AnimalFormFields animalId={animalId} />
    </MainLayout>
  );
};

export default EditAnimal;
