
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FeedingSchedule } from '../AppContextTypes';

export const useFeedingOperations = (
  user: any,
  setFeedingSchedules: React.Dispatch<React.SetStateAction<FeedingSchedule[]>>
) => {
  const addFeedingSchedule = useCallback(async (scheduleData: Omit<FeedingSchedule, 'id'>) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('feeding_schedules')
      .insert({
        user_id: user.id,
        animal_id: scheduleData.animal_id,
        name: scheduleData.name || 'Default Schedule',
        feeding_times: scheduleData.feeding_times as any,
        reminder_enabled: scheduleData.reminder_enabled,
        reminder_minutes_before: scheduleData.reminder_minutes_before
      })
      .select()
      .single();

    if (error) throw error;
    if (data) {
      setFeedingSchedules(prev => [{
        ...data,
        animal_id: data.animal_id,
        feeding_times: data.feeding_times as any,
        reminder_enabled: data.reminder_enabled,
        reminder_minutes_before: data.reminder_minutes_before,
        created_at: data.created_at
      }, ...prev]);
    }
  }, [user, setFeedingSchedules]);

  const updateFeedingSchedule = useCallback(async (id: string, updates: Partial<FeedingSchedule>) => {
    const updateData: any = { ...updates };
    if (updates.feeding_times) {
      updateData.feeding_times = updates.feeding_times as any;
    }

    const { data, error } = await supabase
      .from('feeding_schedules')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (data) {
      setFeedingSchedules(prev => prev.map(schedule => 
        schedule.id === id ? {
          ...data,
          animal_id: data.animal_id,
          feeding_times: data.feeding_times as any,
          reminder_enabled: data.reminder_enabled,
          reminder_minutes_before: data.reminder_minutes_before,
          created_at: data.created_at
        } : schedule
      ));
    }
  }, [setFeedingSchedules]);

  const deleteFeedingSchedule = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('feeding_schedules')
      .delete()
      .eq('id', id);

    if (error) throw error;
    setFeedingSchedules(prev => prev.filter(schedule => schedule.id !== id));
  }, [setFeedingSchedules]);

  return {
    addFeedingSchedule,
    updateFeedingSchedule,
    deleteFeedingSchedule
  };
};
