
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with public anon key (safe to use in browser)
// Replace these with actual values if/when connecting to a real Supabase project
const supabaseUrl = 'https://example.supabase.co';
const supabaseAnonKey = 'your-public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
