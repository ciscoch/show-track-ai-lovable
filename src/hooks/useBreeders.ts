
import { useEffect, useState } from "react";

export interface Breeder {
  id: string;
  name: string;
}

export const useBreeders = () => {
  const [breeders, setBreeders] = useState<Breeder[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Mock data since breeders table doesn't exist
    const mockBreeders: Breeder[] = [
      { id: "1", name: "Johnson Ranch" },
      { id: "2", name: "Smith Cattle Co." },
      { id: "3", name: "Brown Livestock" }
    ];
    
    setLoading(true);
    setTimeout(() => {
      setBreeders(mockBreeders);
      setLoading(false);
    }, 500);
  }, []);

  const addBreeder = async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return null;

    const existing = breeders.find(
      (b) => b.name.toLowerCase() === trimmed.toLowerCase()
    );
    if (existing) return existing;

    const newBreeder: Breeder = {
      id: Date.now().toString(),
      name: trimmed
    };

    setBreeders((prev) => [...prev, newBreeder]);
    return newBreeder;
  };

  return { breeders, loading, addBreeder };
};
