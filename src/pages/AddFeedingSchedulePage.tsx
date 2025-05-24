
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";

const AddFeedingSchedulePage = () => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Add Feeding Schedule</CardTitle>
            <CardDescription>
              Create a new feeding schedule for your animals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Add feeding schedule form coming soon...</p>
            <Button onClick={() => navigate("/feeding-schedules")} className="mt-4">
              Back to Feeding Schedules
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddFeedingSchedulePage;
