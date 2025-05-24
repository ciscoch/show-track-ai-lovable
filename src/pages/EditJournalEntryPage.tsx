
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";

const EditJournalEntryPage = () => {
  const { journalId } = useParams();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Journal Entry</CardTitle>
            <CardDescription>
              Update journal entry ID: {journalId}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Edit journal entry form coming soon...</p>
            <Button onClick={() => navigate("/journal")} className="mt-4">
              Back to Journal
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EditJournalEntryPage;
