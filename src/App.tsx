import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { SupabaseAppProvider } from "@/contexts/SupabaseAppContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { Toaster } from "@/components/ui/toaster";
import ProtectedRoute from "@/components/ProtectedRoute";

// Pages
import Index from "@/pages/Index";
import AuthPage from "@/pages/AuthPage";
import Dashboard from "@/pages/Dashboard";
import AddAnimal from "@/pages/AddAnimal";
import AnimalDetails from "@/pages/AnimalDetails";
import EditAnimal from "@/pages/EditAnimal";
import ExpensesPage from "@/pages/ExpensesPage";
import AddExpensePage from "@/pages/AddExpensePage";
import EditExpensePage from "@/pages/EditExpensePage";
import JournalPage from "@/pages/JournalPage";
import AddJournalEntryPage from "@/pages/AddJournalEntryPage";
import EditJournalEntryPage from "@/pages/EditJournalEntryPage";
import WeightTrackingPage from "@/pages/WeightTrackingPage";
import SubscriptionPage from "@/pages/SubscriptionPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import BuyerDashboard from "@/pages/buyer/BuyerDashboard";
import BuyerLoginPage from "@/pages/buyer/BuyerLoginPage";
import FeedingSchedulePage from "@/pages/FeedingSchedulePage";
import AddFeedingSchedulePage from "@/pages/AddFeedingSchedulePage";
import EditFeedingSchedulePage from "@/pages/EditFeedingSchedulePage";
import WebhookTestPage from "@/pages/WebhookTestPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: (failureCount, error: any) => {
        // Don't retry on 401/403 errors
        if (error?.status === 401 || error?.status === 403) {
          return false;
        }
        return failureCount < 3;
      },
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <SupabaseAppProvider>
            <Router>
              <div className="min-h-screen bg-background">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignupPage />} />
                  
                  {/* Protected Routes */}
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/add-animal" element={
                    <ProtectedRoute>
                      <AddAnimal />
                    </ProtectedRoute>
                  } />
                  <Route path="/animal/:animalId" element={
                    <ProtectedRoute>
                      <AnimalDetails />
                    </ProtectedRoute>
                  } />
                  <Route path="/animal/:animalId/edit" element={
                    <ProtectedRoute>
                      <EditAnimal />
                    </ProtectedRoute>
                  } />
                  <Route path="/expenses" element={
                    <ProtectedRoute>
                      <ExpensesPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/expenses/add" element={
                    <ProtectedRoute>
                      <AddExpensePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/expenses/:expenseId/edit" element={
                    <ProtectedRoute>
                      <EditExpensePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/journal" element={
                    <ProtectedRoute>
                      <JournalPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/journal/add" element={
                    <ProtectedRoute>
                      <AddJournalEntryPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/journal/:journalId/edit" element={
                    <ProtectedRoute>
                      <EditJournalEntryPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/weight" element={
                    <ProtectedRoute>
                      <WeightTrackingPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/subscription" element={
                    <ProtectedRoute>
                      <SubscriptionPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/feeding-schedules" element={
                    <ProtectedRoute>
                      <FeedingSchedulePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/feeding-schedules/add" element={
                    <ProtectedRoute>
                      <AddFeedingSchedulePage />
                    </ProtectedRoute>
                  } />
                  <Route path="/feeding-schedules/:scheduleId/edit" element={
                    <ProtectedRoute>
                      <EditFeedingSchedulePage />
                    </ProtectedRoute>
                  } />

                  {/* Webhook testing */}
                  <Route path="/webhook-test" element={<WebhookTestPage />} />

                  {/* Buyer Routes */}
                  <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
                  <Route path="/buyer/login" element={<BuyerLoginPage />} />
                </Routes>
              </div>
              <Toaster />
            </Router>
          </SupabaseAppProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
