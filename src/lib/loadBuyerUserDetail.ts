import { supabase } from "@/lib/supabaseClient";

/**
 * Loads animal, journal, weight, and gallery info for a specific user.
 */
export async function loadBuyerUserDetail(userId: string) {
  try {
    const { data: animals, error: animalError } = await supabase
      .from("animals")
      .select("*")
      .eq("user_id", userId);

    const { data: journals, error: journalError } = await supabase
      .from("journals")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    const { data: weights, error: weightError } = await supabase
      .from("weights")
      .select("*")
      .eq("user_id", userId)
      .order("date", { ascending: false })
      .limit(10);

    const { data: gallery, error: galleryError } = await supabase
      .from("galleries")
      .select("*")
      .eq("user_id", userId)
      .order("uploaded_at", { ascending: false })
      .limit(6);

    return {
      animals: animalError ? [] : animals,
      journals: journalError ? [] : journals,
      weights: weightError ? [] : weights,
      gallery: galleryError ? [] : gallery
    };
  } catch (err) {
    console.error("Error loading buyer user detail:", err);
    return {
      animals: [],
      journals: [],
      weights: [],
      gallery: []
    };
  }
}
