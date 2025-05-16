
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client with environment variables or default testing values
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://qmvbsrivanucfpfjchpw.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtdmJzcml2YW51Y2ZwZmpjaHB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMjgzMjksImV4cCI6MjA2MjkwNDMyOX0.jF7Tkz8pFtx4HHKrWfRRcQPpSeGR4xu8MQvlvV5Vgxo';

// Log Supabase connection info for debugging
console.log(`Supabase connection info: 
  Using URL: ${supabaseUrl}
  Is using fallback URL: ${supabaseUrl === 'https://qmvbsrivanucfpfjchpw.supabase.co'}
  Environment variables present: ${!!import.meta.env.VITE_SUPABASE_URL && !!import.meta.env.VITE_SUPABASE_ANON_KEY}
`);

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Helper function to check if we're connected to a real Supabase instance
export const isRealSupabaseConnection = () => {
  const usingRealInstance = supabaseUrl !== 'https://qmvbsrivanucfpfjchpw.supabase.co';
  return usingRealInstance;
};
