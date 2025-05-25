
import MainLayout from "@/components/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const FeedingSchedulePage = () => {
  return (
    <MainLayout title="Feeding Schedules">
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Feeding Schedules</CardTitle>
            <CardDescription>
              Manage feeding schedules for your animals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Feeding schedule management coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default FeedingSchedulePage;
