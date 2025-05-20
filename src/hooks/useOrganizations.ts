import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface Organization {
  id: string;
  name: string;
}

export const useOrganizations = () => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("organizations")
        .select("id, name")
        .order("name");

      if (error) {
        console.error("Failed to load organizations", error);
      } else if (data) {
        setOrganizations(data as Organization[]);
      }

      setLoading(false);
    };

    fetchOrganizations();
  }, []);

  return { organizations, loading };
};
