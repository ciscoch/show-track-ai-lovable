
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { JournalEntry } from '../AppContextTypes';

export const useJournalOperations = (
  user: any,
  setJournalEntries: React.Dispatch<React.SetStateAction<JournalEntry[]>>,
  setError: (error: string | null) => void
) => {
  const addJournalEntry = useCallback(async (entryData: Omit<JournalEntry, 'id'>) => {
    if (!user) return;

    try {
      // Convert tags from string to array if needed for database
      const processedEntry = {
        ...entryData,
        user_id: user.id,
        tags: typeof entryData.tags === 'string' ? entryData.tags.split(',').filter(tag => tag.trim()) : entryData.tags
      };

      const { data, error } = await supabase
        .from('journal_entries')
        .insert(processedEntry)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        // Convert tags back to string for UI compatibility
        const processedData = {
          ...data,
          tags: Array.isArray(data.tags) ? data.tags.join(',') : data.tags
        };
        setJournalEntries(prev => [processedData, ...prev]);
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  }, [user, setJournalEntries, setError]);

  const updateJournalEntry = useCallback(async (id: string, updates: Partial<JournalEntry>) => {
    try {
      // Convert tags to array if needed
      const processedUpdates = {
        ...updates,
        tags: typeof updates.tags === 'string' ? updates.tags.split(',').filter(tag => tag.trim()) : updates.tags
      };

      const { data, error } = await supabase
        .from('journal_entries')
        .update(processedUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        const processedData = {
          ...data,
          tags: Array.isArray(data.tags) ? data.tags.join(',') : data.tags
        };
        setJournalEntries(prev => prev.map(entry => entry.id === id ? processedData : entry));
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  }, [setJournalEntries, setError]);

  const deleteJournalEntry = useCallback(async (id: string) => {
    try {
      const { error } = await supabase
        .from('journal_entries')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setJournalEntries(prev => prev.filter(entry => entry.id !== id));
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  }, [setJournalEntries, setError]);

  return {
    addJournalEntry,
    updateJournalEntry,
    deleteJournalEntry
  };
};
