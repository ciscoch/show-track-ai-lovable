
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SupabaseAppProvider } from "@/contexts/SupabaseAppContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AuthPage from "@/pages/AuthPage";
import Dashboard from "@/pages/Dashboard";
import AddAnimal from "@/pages/AddAnimal";
import AnimalDetails from "@/pages/AnimalDetails";
import JournalPage from "@/pages/JournalPage";
import WeightTrackingPage from "@/pages/WeightTrackingPage";
import ExpensesPage from "@/pages/ExpensesPage";
import GalleryPage from "@/pages/GalleryPage";
import SchedulePage from "@/pages/SchedulePage";
import FeedReminderPage from "@/pages/FeedReminderPage";
import UserSettingsPage from "@/pages/UserSettingsPage";
import Subscription from "@/pages/Subscription";
import TrendInsights from "@/pages/TrendInsights";
import UploadsPage from "@/pages/UploadsPage";
import SupportChatPage from "@/pages/SupportChatPage";
import FriendsPage from "@/pages/FriendsPage";
import NotFound from "@/pages/NotFound";

// Buyer routes
import BuyerLoginPage from "@/pages/buyer/BuyerLoginPage";
import BuyerDashboardPage from "@/pages/buyer/BuyerDashboardPage";
import BuyerUserDetail from "@/pages/buyer/BuyerUserDetail";
import BuyerViewUserPage from "@/pages/buyer/BuyerViewUserPage";
import BuyerViewAnimalPage from "@/pages/buyer/BuyerViewAnimalPage";
import BuyerLinkRedirect from "@/pages/buyer/BuyerLinkRedirect";

const queryClient = new QueryClient();

const AuthenticatedApp = () => {
  return (
    <SupabaseAppProvider>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-animal"
          element={
            <ProtectedRoute>
              <AddAnimal />
            </ProtectedRoute>
          }
        />
        <Route
          path="/animal/:id"
          element={
            <ProtectedRoute>
              <AnimalDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <ProtectedRoute>
              <JournalPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/weight-tracking"
          element={
            <ProtectedRoute>
              <WeightTrackingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/expenses"
          element={
            <ProtectedRoute>
              <ExpensesPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <GalleryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/schedule"
          element={
            <ProtectedRoute>
              <SchedulePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/feed-reminders"
          element={
            <ProtectedRoute>
              <FeedReminderPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <UserSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/subscription"
          element={
            <ProtectedRoute>
              <Subscription />
            </ProtectedRoute>
          }
        />
        <Route
          path="/trends"
          element={
            <ProtectedRoute>
              <TrendInsights />
            </ProtectedRoute>
          }
        />
        <Route
          path="/uploads"
          element={
            <ProtectedRoute>
              <UploadsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/support"
          element={
            <ProtectedRoute>
              <SupportChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/friends"
          element={
            <ProtectedRoute>
              <FriendsPage />
            </ProtectedRoute>
          }
        />

        {/* Buyer routes */}
        <Route path="/buyer/login" element={<BuyerLoginPage />} />
        <Route path="/buyer/dashboard" element={<BuyerDashboardPage />} />
        <Route path="/buyer/user/:userId" element={<BuyerUserDetail />} />
        <Route path="/buyer/users/:userId" element={<BuyerViewUserPage />} />
        <Route path="/buyer/animal/:animalId" element={<BuyerViewAnimalPage />} />
        <Route path="/buyer/link/:linkId" element={<BuyerLinkRedirect />} />

        {/* Root redirect */}
        <Route path="/" element={<RootRedirect />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SupabaseAppProvider>
  );
};

const RootRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/auth" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <BrowserRouter>
          <AuthenticatedApp />
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
