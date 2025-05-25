
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import MainLayout from "@/components/MainLayout";
import ExpensesTable from "@/components/ExpensesTable";
import { useAppContext } from "@/contexts/AppContext";
import { Expense } from "@/contexts/AppContextTypes";

const ExpensesPage = () => {
  const navigate = useNavigate();
  const { expenses, animals } = useAppContext();
  const [selectedAnimal, setSelectedAnimal] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Filter expenses based on selected animal and category
  const filteredExpenses = expenses.filter((expense) => {
    const animalMatch = selectedAnimal === "all" || expense.animal_id === selectedAnimal;
    const categoryMatch = selectedCategory === "all" || expense.category === selectedCategory;
    return animalMatch && categoryMatch;
  });

  // Calculate total expenses
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Calculate tax deductible amount
  const taxDeductibleAmount = filteredExpenses
    .filter(expense => expense.tax_deductible)
    .reduce((sum, expense) => sum + expense.amount, 0);

  const handleEditExpense = (expense: Expense) => {
    navigate(`/expenses/${expense.id}/edit`);
  };

  // Get animal name by ID
  const getAnimalName = (animalId: string) => {
    const animal = animals.find(a => a.id === animalId);
    return animal?.name || 'Unknown Animal';
  };

  return (
    <MainLayout title="Expenses">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedAnimal} onValueChange={setSelectedAnimal}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by animal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Animals</SelectItem>
                {animals.map((animal) => (
                  <SelectItem key={animal.id} value={animal.id}>
                    {animal.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="feed">Feed</SelectItem>
                <SelectItem value="medicine">Medicine</SelectItem>
                <SelectItem value="supplies">Supplies</SelectItem>
                <SelectItem value="entry">Entry</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={() => navigate('/expenses/add')}>
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Total Expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${totalExpenses.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Tax Deductible</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                ${taxDeductibleAmount.toFixed(2)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardDescription>Number of Expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {filteredExpenses.length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Expenses Table */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Records</CardTitle>
            <CardDescription>
              Track and manage all your animal-related expenses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ExpensesTable 
              expenses={filteredExpenses}
              onEdit={handleEditExpense}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ExpensesPage;
