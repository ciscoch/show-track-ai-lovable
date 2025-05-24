
import { createClient } from '@supabase/supabase-js';
import { logger } from '@/lib/logger';

// Initialize the Supabase client with required environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have the required environment variables
const usingRealInstance = Boolean(supabaseUrl && supabaseAnonKey);

// For development without environment variables, use mock mode
let supabase;

if (usingRealInstance) {
  // Real Supabase connection
  supabase = createClient(supabaseUrl, supabaseAnonKey);
  logger.info('Connected to Supabase instance');
} else {
  // Mock Supabase client for development without environment variables
  logger.warn('⚠️ Using mock Supabase client - environment variables not found');
  
  // Create a minimal mock client for development
  supabase = {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null }, error: null }),
      signOut: () => Promise.resolve({ error: null }),
      // Add other auth methods as needed
    },
    from: (table) => ({
      select: () => ({
        eq: () => ({
          single: () => Promise.resolve({ data: null, error: null }),
          order: () => ({
            limit: () => Promise.resolve({ data: [], error: null })
          }),
        }),
        order: () => ({
          limit: () => Promise.resolve({ data: [], error: null })
        }),
      }),
      insert: () => Promise.resolve({ data: null, error: null }),
      upsert: () => Promise.resolve({ data: null, error: null }),
      update: () => ({
        eq: () => Promise.resolve({ data: null, error: null }),
      }),
      delete: () => ({
        eq: () => Promise.resolve({ data: null, error: null }),
      }),
    }),
    storage: {
      from: () => ({
        upload: () => Promise.resolve({ data: { path: 'mock-path' }, error: null }),
        getPublicUrl: () => ({ data: { publicUrl: 'https://placeholder.com/image.png' } }),
      }),
    },
  };
}

export { supabase };

// Helper function to check if we're connected to a real Supabase instance
export const isRealSupabaseConnection = () => usingRealInstance;
