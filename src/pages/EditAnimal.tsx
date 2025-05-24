
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";

const EditAnimal = () => {
  const { animalId } = useParams();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Animal</CardTitle>
            <CardDescription>
              Update animal details for ID: {animalId}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Edit animal form coming soon...</p>
            <Button onClick={() => navigate(`/animal/${animalId}`)} className="mt-4">
              Back to Animal Details
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EditAnimal;
