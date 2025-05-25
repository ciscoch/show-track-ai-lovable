
import { supabase } from '@/integrations/supabase/client';
import { logger } from '@/lib/logger';

// Use the integrated Supabase client from Lovable
export { supabase };
logger.info('Using Lovable integrated Supabase client');

// Helper function to check if we're connected to a real Supabase instance
export const isRealSupabaseConnection = () => true;
