
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with required environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const usingRealInstance = Boolean(supabaseUrl && supabaseAnonKey);

if (!usingRealInstance) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if we're connected to a real Supabase instance
export const isRealSupabaseConnection = () => usingRealInstance;
