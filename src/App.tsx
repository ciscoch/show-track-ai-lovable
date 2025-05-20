
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
import AccountTypePage from "@/pages/AccountTypePage";
import LoginPage from "@/pages/LoginPage";
import FriendsPage from "@/pages/FriendsPage";
import UploadsPage from "@/pages/UploadsPage";
import SupportChatPage from "@/pages/SupportChatPage";
import BuyerLoginPage from "@/pages/buyer/BuyerLoginPage";
import BuyerDashboardPage from "@/pages/buyer/BuyerDashboardPage";
import BuyerViewUserPage from "@/pages/buyer/BuyerViewUserPage";
import BuyerViewAnimalPage from "@/pages/buyer/BuyerViewAnimalPage";
import BuyerLinkRedirect from "@/pages/buyer/BuyerLinkRedirect";
import Dashboard from "@/pages/Dashboard";

<Route path="/dashboard" element={<Dashboard />} />

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Index />} />
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
        <Route path="/help" element={<SupportChatPage />} />
        <Route path="/signup" element={<AccountTypePage />} />
        <Route path="/signup/exhibitor" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/uploads" element={<UploadsPage />} />
        <Route path="/buyer-link/:token" element={<BuyerLinkRedirect />} />

        {/* Buyer Routes */}
        <Route path="/buyer/login" element={<BuyerLoginPage />} />
        <Route path="/buyer/dashboard" element={<BuyerDashboardPage />} />
        <Route path="/buyer/user/:userId" element={<BuyerViewUserPage />} />
        <Route path="/buyer/animal/:animalId" element={<BuyerViewAnimalPage />} />
        <Route path="/connect/:inviteCode" element={<BuyerViewUserPage />} />
        
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
