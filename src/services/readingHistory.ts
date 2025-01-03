import { supabase } from '../lib/supabase';

export async function recordReadingHistory(userId: string, articleId: string) {
  const { error } = await supabase
    .from('reading_history')
    .insert({
      user_id: userId,
      article_id: articleId,
      read_at: new Date().toISOString(),
      time_spent: 0 // Initial view
    });

  if (error) throw error;
}