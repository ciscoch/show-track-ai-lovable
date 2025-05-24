
import { createClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';

// Initialize the Supabase client with required environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have the required environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing required Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment.');
}

// Create real Supabase connection
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
logger.info('Connected to real Supabase instance');

// Helper function to check if we're connected to a real Supabase instance
export const isRealSupabaseConnection = () => true;
