
import { useNavigate } from "react-router-dom";
import AddExpenseForm from "@/components/AddExpenseForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/MainLayout";

const AddExpensePage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/expenses");
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Add New Expense</CardTitle>
            <CardDescription>
              Record a new expense for your animals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AddExpenseForm onSuccess={handleSuccess} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AddExpensePage;
