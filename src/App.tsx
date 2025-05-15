
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import Index from "@/pages/Index";
import AnimalDetails from "@/pages/AnimalDetails";
import AddAnimal from "@/pages/AddAnimal";
import Subscription from "@/pages/Subscription";
import NotFound from "@/pages/NotFound";
import WeightTrackingPage from "@/pages/WeightTrackingPage";
import JournalPage from "@/pages/JournalPage";
import GalleryPage from "@/pages/GalleryPage";
import ExpensesPage from "@/pages/ExpensesPage";
import SchedulePage from "@/pages/SchedulePage";
import UserSettingsPage from "@/pages/UserSettingsPage";
import FeedReminderPage from "@/pages/FeedReminderPage";
import SignupPage from "@/pages/SignupPage";
import LoginPage from "@/pages/LoginPage";
import FriendsPage from "@/pages/FriendsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/animal/:animalId" element={<AnimalDetails />} />
        <Route path="/add-animal" element={<AddAnimal />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/weights" element={<WeightTrackingPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/schedule" element={<SchedulePage />} />
        <Route path="/settings" element={<UserSettingsPage />} />
        <Route path="/feed-reminders" element={<FeedReminderPage />} />
        <Route path="/friends" element={<FriendsPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
