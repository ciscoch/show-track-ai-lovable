
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Expense } from '../AppContextTypes';

export const useExpenseOperations = (
  user: any,
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>
) => {
  const addExpense = useCallback(async (expenseData: Omit<Expense, 'id'>) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('expenses')
      .insert({
        ...expenseData,
        user_id: user.id
      })
      .select()
      .single();

    if (error) throw error;
    if (data) {
      setExpenses(prev => [data, ...prev]);
    }
  }, [user, setExpenses]);

  const updateExpense = useCallback(async (id: string, updates: Partial<Expense>) => {
    const { data, error } = await supabase
      .from('expenses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (data) {
      setExpenses(prev => prev.map(expense => expense.id === id ? data : expense));
    }
  }, [setExpenses]);

  const deleteExpense = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) throw error;
    setExpenses(prev => prev.filter(expense => expense.id !== id));
  }, [setExpenses]);

  return {
    addExpense,
    updateExpense,
    deleteExpense
  };
};
