
import { useNavigate } from "react-router-dom";
import AddJournalEntryForm from "@/components/AddJournalEntryForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/MainLayout";

const AddJournalEntryPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/journal");
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Add Journal Entry</CardTitle>
            <CardDescription>
              Record your thoughts and observations about your animals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddJournalEntryForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddJournalEntryPage;
