
import { useSupabaseApp } from "@/contexts/SupabaseAppContext";
import { ScheduleForm } from "@/components/feeding/ScheduleForm";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/components/MainLayout";
import { Animal, User } from "@/types/models";

const AddFeedingSchedulePage = () => {
  const { animals, addFeedingSchedule, user } = useSupabaseApp();
  const navigate = useNavigate();

  const handleSave = async (schedule: any) => {
    try {
      const scheduleToAdd = {
        animal_id: schedule.animalId || schedule.animal_id,
        name: schedule.name,
        feeding_times: schedule.feedingTimes || schedule.feeding_times || [],
        reminder_enabled: schedule.reminderEnabled ?? true,
        reminder_minutes_before: schedule.reminderMinutesBefore ?? 30
      };
      
      await addFeedingSchedule(scheduleToAdd);
      navigate("/feed-reminders");
    } catch (error) {
      console.error("Error adding feeding schedule:", error);
    }
  };

  // Transform animals to match expected format
  const transformedAnimals: Animal[] = animals.map(animal => ({
    ...animal,
    gender: (animal.gender || "male") as "male" | "female",
    animalId: animal.id,
    birthdate: animal.birth_date || "",
    description: animal.description || "",
    showAnimal: animal.showAnimal || false,
    purpose: (animal.purpose || "other") as "breeding" | "show" | "market" | "pet" | "other",
    weight: animal.weight || 0,
    penNumber: animal.pen_number,
    breederName: animal.breeder_name,
    breed: animal.breed || "",
    species: animal.species || "",
    createdAt: animal.created_at || new Date().toISOString()
  }));

  const transformedUser: User = user ? {
    ...user,
    firstName: user.user_metadata?.first_name || "",
    lastName: user.user_metadata?.last_name || "",
    subscriptionLevel: "pro" as "free" | "pro" | "elite",
    createdAt: user.created_at || new Date().toISOString()
  } : {
    id: "",
    email: "",
    firstName: "",
    lastName: "",
    subscriptionLevel: "free" as "free" | "pro" | "elite",
    createdAt: new Date().toISOString()
  };

  return (
    <MainLayout title="Add Feeding Schedule" user={transformedUser}>
      <ScheduleForm
        animals={transformedAnimals}
        selectedAnimalId="all"
        onSave={handleSave}
        location={null}
      />
    </MainLayout>
  );
};

export default AddFeedingSchedulePage;
