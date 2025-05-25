
import { useNavigate } from "react-router-dom";
import AddJournalEntryForm from "@/components/AddJournalEntryForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/MainLayout";
import { useSupabaseApp } from "@/contexts/SupabaseAppContext";

const AddJournalEntryPage = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseApp();

  const handleSuccess = () => {
    navigate("/journal");
  };

  const transformedUser = user ? {
    ...user,
    email: user.email || "",
    firstName: user.user_metadata?.first_name || "",
    lastName: user.user_metadata?.last_name || "",
    subscriptionLevel: "pro" as "free" | "pro" | "elite",
    createdAt: user.created_at || new Date().toISOString()
  } : null;

  return (
    <MainLayout title="Add Journal Entry" user={transformedUser}>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Add Journal Entry</CardTitle>
            <CardDescription>
              Record your thoughts and observations about your animals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddJournalEntryForm />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddJournalEntryPage;
