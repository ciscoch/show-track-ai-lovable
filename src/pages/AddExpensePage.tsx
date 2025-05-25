
import { useNavigate } from "react-router-dom";
import AddExpenseForm from "@/components/AddExpenseForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/MainLayout";
import { useSupabaseApp } from "@/contexts/SupabaseAppContext";

const AddExpensePage = () => {
  const navigate = useNavigate();
  const { user } = useSupabaseApp();

  const handleSuccess = () => {
    navigate("/expenses");
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
    <MainLayout title="Add Expense" user={transformedUser}>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Expense</CardTitle>
            <CardDescription>
              Record a new expense for your animals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddExpenseForm />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddExpensePage;
