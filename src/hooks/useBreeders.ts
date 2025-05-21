import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export interface Breeder {
  id: string;
  name: string;
}

export const useBreeders = () => {
  const [breeders, setBreeders] = useState<Breeder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBreeders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("breeders")
        .select("id, name")
        .order("name");

      if (error) {
        console.error("Failed to load breeders", error);
      } else if (data) {
        setBreeders(data as Breeder[]);
      }

      setLoading(false);
    };

    fetchBreeders();
  }, []);

  const addBreeder = async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return null;

    const existing = breeders.find(
      (b) => b.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (existing) return existing;

    const { data, error } = await supabase
      .from("breeders")
      .insert({ name: trimmed })
      .select()
      .single();

    if (error || !data) {
      console.error("Failed to add breeder", error);
      return null;
    }

    const newBreeder = data as Breeder;
    setBreeders((prev) => [...prev, newBreeder]);
    return newBreeder;
  };

  return { breeders, loading, addBreeder };
};
