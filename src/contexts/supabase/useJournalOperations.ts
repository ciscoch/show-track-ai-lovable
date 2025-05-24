
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
      const { data, error } = await supabase
        .from('journal_entries')
        .insert({
          ...entryData,
          user_id: user.id
        })
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setJournalEntries(prev => [data, ...prev]);
      }
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  }, [user, setJournalEntries, setError]);

  const updateJournalEntry = useCallback(async (id: string, updates: Partial<JournalEntry>) => {
    try {
      const { data, error } = await supabase
        .from('journal_entries')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setJournalEntries(prev => prev.map(entry => entry.id === id ? data : entry));
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
