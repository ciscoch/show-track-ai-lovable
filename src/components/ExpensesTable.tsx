
import { ExpenseEntry } from "@/types/models";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

type ExpensesTableProps = {
  expenses: ExpenseEntry[];
  animalId: string;
};

const ExpensesTable = ({ expenses, animalId }: ExpensesTableProps) => {
  // Filter expenses for this animal
  const animalExpenses = expenses
    .filter(entry => entry.animalId === animalId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Calculate total spent
  const totalSpent = animalExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Format category for display
  const formatCategory = (category: string) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };
  
  return (
    <div className="w-full">
      <Table>
        <TableCaption>Expense records for your animal</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Tax Deductible</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {animalExpenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{format(new Date(expense.date), 'MM/dd/yyyy')}</TableCell>
              <TableCell>
                <Badge variant="outline">{formatCategory(expense.category)}</Badge>
              </TableCell>
              <TableCell>{expense.description}</TableCell>
              <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
              <TableCell className="text-right">
                {expense.taxDeductible ? 
                  <Badge className="bg-primary">Yes</Badge> : 
                  <Badge variant="outline">No</Badge>
                }
              </TableCell>
            </TableRow>
          ))}
          <TableRow className="font-bold">
            <TableCell colSpan={3} className="text-right">Total:</TableCell>
            <TableCell className="text-right">${totalSpent.toFixed(2)}</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpensesTable;
