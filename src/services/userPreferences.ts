import { supabase } from '../lib/supabase';

export async function updateUserPreferences(userId: string, category: string) {
  // Get current preferences
  const { data: userData } = await supabase
    .from('users')
    .select('preferences')
    .eq('id', userId)
    .single();

  const currentPrefs = userData?.preferences || {};
  const categoryCount = ((currentPrefs.categories || {})[category] || 0) + 1;

  // Update preferences with new category count
  const { error } = await supabase
    .from('users')
    .update({
      preferences: {
        ...currentPrefs,
        categories: {
          ...(currentPrefs.categories || {}),
          [category]: categoryCount
        }
      }
    })
    .eq('id', userId);

  if (error) throw error;
}