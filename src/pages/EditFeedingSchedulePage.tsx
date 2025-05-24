
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";

const EditFeedingSchedulePage = () => {
  const { scheduleId } = useParams();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Feeding Schedule</CardTitle>
            <CardDescription>
              Update feeding schedule ID: {scheduleId}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Edit feeding schedule form coming soon...</p>
            <Button onClick={() => navigate("/feeding-schedules")} className="mt-4">
              Back to Feeding Schedules
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EditFeedingSchedulePage;
