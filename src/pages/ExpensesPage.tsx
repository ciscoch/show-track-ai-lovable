
import { useState } from "react";
import { useAppContext } from "@/contexts/AppContext";
import MainLayout from "@/components/MainLayout";
import ExpensesTable from "@/components/ExpensesTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PremiumFeatureBanner from "@/components/PremiumFeatureBanner";
import AddExpenseForm from "@/components/AddExpenseForm";
import { ChartBarIcon, ChevronDownIcon, DownloadIcon, FilterIcon } from "lucide-react";

const ExpensesPage = () => {
  const { animals, expenses, userSubscription, user } = useAppContext();
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>('all');
  
  // Calculate unique years from the expenses
  const years = Array.from(
    new Set(expenses.map(expense => new Date(expense.date).getFullYear()))
  ).map(year => year.toString());
  
  // Filter expenses based on filters
  const filteredExpenses = expenses.filter(expense => {
    const matchesAnimal = selectedAnimalId === "" || expense.animalId === selectedAnimalId;
    const matchesCategory = selectedCategory === "" || expense.category === selectedCategory;
    const matchesYear = selectedYear === "all" || 
      new Date(expense.date).getFullYear().toString() === selectedYear;
    
    return matchesAnimal && matchesCategory && matchesYear;
  });
  
  // Calculate totals
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  
  // Calculate expenses by category
  const expensesByCategory = filteredExpenses.reduce<{[key: string]: number}>((acc, expense) => {
    const category = expense.category;
    acc[category] = (acc[category] || 0) + expense.amount;
    return acc;
  }, {});
  
  // Calculate expenses by animal
  const expensesByAnimal = filteredExpenses.reduce<{[key: string]: number}>((acc, expense) => {
    const animalId = expense.animalId;
    acc[animalId] = (acc[animalId] || 0) + expense.amount;
    return acc;
  }, {});
  
  const categories = [
    { value: "feed", label: "Feed" },
    { value: "medicine", label: "Medicine" },
    { value: "supplies", label: "Supplies" },
    { value: "entry", label: "Show Entry Fees" },
    { value: "travel", label: "Travel" },
    { value: "other", label: "Other" },
  ];
  
  const isProOrElite = userSubscription.level === "pro" || userSubscription.level === "elite";
  const isElite = userSubscription.level === "elite";
  
  const handleUpgrade = () => {
    // Redirect to subscription page
    window.location.href = '/subscription';
  };
  
  return (
    <MainLayout title="Expenses Tracker" user={user}>
      <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
        <div className="flex flex-wrap gap-4">
          <select
            value={selectedAnimalId}
            onChange={(e) => setSelectedAnimalId(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All Animals</option>
            {animals.map(animal => (
              <option key={animal.id} value={animal.id}>
                {animal.name}
              </option>
            ))}
          </select>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <Button onClick={() => setIsAddExpenseOpen(true)}>
          Add Expense
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalExpenses.toFixed(2)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Tax Deductible</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredExpenses.filter(e => e.taxDeductible).reduce((sum, e) => sum + e.amount, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Largest Category</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.keys(expensesByCategory).length > 0 ? (
              <div className="text-2xl font-bold capitalize">
                {Object.entries(expensesByCategory).sort((a, b) => b[1] - a[1])[0][0]}
              </div>
            ) : (
              <div className="text-2xl font-bold">N/A</div>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">List</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="tax">Tax Reports</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="mt-6">
          <ExpensesTable expenses={filteredExpenses} />
        </TabsContent>
        
        <TabsContent value="summary" className="mt-6">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Expenses by Category</span>
                  {isProOrElite && (
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <ChartBarIcon className="h-4 w-4" />
                      <span>View Chart</span>
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(expensesByCategory).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(expensesByCategory)
                      .sort((a, b) => b[1] - a[1])
                      .map(([category, amount]) => (
                        <div key={category} className="flex justify-between items-center">
                          <div className="capitalize">{category}</div>
                          <div className="font-medium">${amount.toFixed(2)}</div>
                        </div>
                      ))
                    }
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No expenses found with current filters.</p>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Expenses by Animal</span>
                  {isProOrElite && (
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <ChartBarIcon className="h-4 w-4" />
                      <span>View Chart</span>
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {Object.keys(expensesByAnimal).length > 0 ? (
                  <div className="space-y-2">
                    {Object.entries(expensesByAnimal)
                      .sort((a, b) => b[1] - a[1])
                      .map(([animalId, amount]) => {
                        const animal = animals.find(a => a.id === animalId);
                        return (
                          <div key={animalId} className="flex justify-between items-center">
                            <div>{animal ? animal.name : 'Unknown Animal'}</div>
                            <div className="font-medium">${amount.toFixed(2)}</div>
                          </div>
                        );
                      })
                    }
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-4">No expenses found with current filters.</p>
                )}
              </CardContent>
            </Card>
          </div>
          
          {!isProOrElite && (
            <div className="mt-6">
              <PremiumFeatureBanner 
                title="Advanced Expense Reporting"
                description="Upgrade to Pro or Elite for advanced expense reporting including charts, projections, and more detailed analysis."
                requiredLevel="pro"
                onUpgrade={handleUpgrade}
              />
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="tax" className="mt-6">
          {isProOrElite ? (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Tax Summary Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Button variant="outline" className="flex w-full justify-between items-center">
                      <span>Annual Tax Summary (All Animals)</span>
                      <DownloadIcon className="h-4 w-4" />
                    </Button>
                    
                    <div className="border rounded-md">
                      <div className="p-4 border-b flex justify-between items-center cursor-pointer hover:bg-muted/50">
                        <span>Animal-Specific Tax Reports</span>
                        <ChevronDownIcon className="h-4 w-4" />
                      </div>
                      <div className="p-4 space-y-2">
                        {animals.map(animal => (
                          <Button key={animal.id} variant="ghost" className="flex w-full justify-between items-center">
                            <span>{animal.name} Tax Report</span>
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    {isElite && (
                      <Button variant="outline" className="flex w-full justify-between items-center">
                        <span>Detailed Tax Forms (Elite Feature)</span>
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {!isElite && (
                <PremiumFeatureBanner 
                  title="Elite Tax Features"
                  description="Upgrade to Elite for advanced tax forms and summaries that can be directly used for filing."
                  requiredLevel="elite"
                  onUpgrade={handleUpgrade}
                />
              )}
            </div>
          ) : (
            <PremiumFeatureBanner 
              title="Tax Reporting"
              description="Upgrade to Pro or Elite to access tax reporting features, including deduction summaries and exportable reports."
              requiredLevel="pro"
              onUpgrade={handleUpgrade}
            />
          )}
        </TabsContent>
      </Tabs>
      
      <Dialog open={isAddExpenseOpen} onOpenChange={setIsAddExpenseOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Expense</DialogTitle>
          </DialogHeader>
          <AddExpenseForm 
            onSuccess={() => setIsAddExpenseOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
};

export default ExpensesPage;
