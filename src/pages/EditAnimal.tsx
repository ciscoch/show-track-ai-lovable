
import React from "react";
import { useParams } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import AnimalFormFields from "@/components/animal-form/AnimalFormFields";

const EditAnimal = () => {
  const { animalId } = useParams();

  return (
    <MainLayout title="Edit Animal">
      <AnimalFormFields mode="edit" animalId={animalId} />
    </MainLayout>
  );
};

export default EditAnimal;
