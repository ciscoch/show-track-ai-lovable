
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import MainLayout from "@/components/MainLayout";
import { Button } from "@/components/ui/button";

const EditExpensePage = () => {
  const { expenseId } = useParams();
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Edit Expense</CardTitle>
            <CardDescription>
              Update expense details for ID: {expenseId}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Edit expense form coming soon...</p>
            <Button onClick={() => navigate("/expenses")} className="mt-4">
              Back to Expenses
            </Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EditExpensePage;
