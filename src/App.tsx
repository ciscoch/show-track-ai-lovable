
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AddAnimal from "./pages/AddAnimal";
import AnimalDetails from "./pages/AnimalDetails";
import Subscription from "./pages/Subscription";
import WeightTrackingPage from "./pages/WeightTrackingPage";
import JournalPage from "./pages/JournalPage";
import GalleryPage from "./pages/GalleryPage";
import ExpensesPage from "./pages/ExpensesPage";
import SchedulePage from "./pages/SchedulePage";
import UserSettingsPage from "./pages/UserSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/add-animal" element={<AddAnimal />} />
            <Route path="/animal/:animalId" element={<AnimalDetails />} />
            <Route path="/weights" element={<WeightTrackingPage />} />
            <Route path="/journal" element={<JournalPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/settings" element={<UserSettingsPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
