
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables or default testing values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if we're connected to a real Supabase instance
export const isRealSupabaseConnection = () => {
  return supabaseUrl !== 'https://example.supabase.co';
};
