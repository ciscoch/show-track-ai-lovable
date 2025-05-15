
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Expense } from "@/types/models";
import { useAppContext } from "@/contexts/AppContext";
import { format } from "date-fns";
import { Edit2Icon, Trash2Icon, Image } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

interface ExpensesTableProps {
  expenses: Expense[];
}

const ExpensesTable = ({ expenses }: ExpensesTableProps) => {
  const { deleteExpenseEntry, animals } = useAppContext();
  const [viewingReceipt, setViewingReceipt] = useState<Expense | null>(null);

  const getAnimalName = (animalId: string) => {
    const animal = animals.find((a) => a.id === animalId);
    return animal ? animal.name : "Unknown";
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      deleteExpenseEntry(id);
    }
  };

  return (
    <>
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Animal</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-center">Receipt</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenses.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-4">
                  No expenses found. Add an expense to get started.
                </TableCell>
              </TableRow>
            ) : (
              expenses.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{format(new Date(expense.date), "PP")}</TableCell>
                  <TableCell>{getAnimalName(expense.animalId)}</TableCell>
                  <TableCell className="capitalize">{expense.category}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell className="text-right">${expense.amount.toFixed(2)}</TableCell>
                  <TableCell className="text-center">
                    {expense.receiptImageUrl && (
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => setViewingReceipt(expense)}
                      >
                        <Image className="h-4 w-4" />
                      </Button>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit2Icon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(expense.id)}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={!!viewingReceipt} onOpenChange={() => setViewingReceipt(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Receipt - {viewingReceipt?.description}</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-2">
            {viewingReceipt?.receiptImageUrl && (
              <img
                src={viewingReceipt.receiptImageUrl}
                alt="Receipt"
                className="max-h-[70vh] object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ExpensesTable;
