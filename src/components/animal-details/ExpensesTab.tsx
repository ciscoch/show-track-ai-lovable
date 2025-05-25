
import React, { useState } from "react";
import { Expense } from "@/contexts/AppContextTypes";
import ExpensesTable from "@/components/ExpensesTable";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ExpensesTabProps {
  expenses: Expense[];
  animalId: string;
}

const ExpensesTab = ({ expenses, animalId }: ExpensesTabProps) => {
  const navigate = useNavigate();
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const handleAddExpense = () => {
    navigate(`/animal/${animalId}/add-expense`);
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    navigate(`/animal/${animalId}/edit-expense/${expense.id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Expenses</h2>
        <Button onClick={handleAddExpense}>Add Expense</Button>
      </div>
      
      <ExpensesTable expenses={expenses} onEdit={handleEditExpense} />
    </div>
  );
};

export default ExpensesTab;
