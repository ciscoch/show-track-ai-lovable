import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import AnimalCard from "@/components/animals/AnimalCard";

const Dashboard = () => {
  const [animals, setAnimals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAnimals() {
      const { data, error } = await supabase
        .from("animals")
        .select("*, organization:organization_id(name)");

      if (error) {
        console.error("Error loading animals:", error);
      } else {
        setAnimals(data);
      }
    }

    fetchAnimals();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Animals</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {animals.map((animal: any) => (
          <AnimalCard
            key={animal.id}
            animal={animal}
            onClick={() => navigate(\`/animal/\${animal.id}\`)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
