import { supabase } from '../lib/supabase';
import type { NewsDataArticle } from '../types/newsData';

export async function trackArticleInteraction(
  userId: string,
  article: NewsDataArticle
) {
  try {
    const category = article.category?.[0] || 'uncategorized';
    const timestamp = new Date().toISOString();
    
    // Insert into reading_history
    const { error: historyError } = await supabase
      .from('reading_history')
      .upsert({
        user_id: userId,
        article_title: article.title,
        article_category: category,
        article_url: article.link,
        read_at: timestamp,
        time_spent: 0
      });

    if (historyError) throw historyError;

    // Update or insert recommendation
    const { error: recommendationError } = await supabase
      .from('recommendations')
      .upsert({
        user_id: userId,
        article_title: article.title,
        article_category: category,
        article_url: article.link,
        score: 50,
        created_at: timestamp
      });

    if (recommendationError) throw recommendationError;

    // Update user preferences
    const { data: userData } = await supabase
      .from('users')
      .select('preferences')
      .eq('id', userId)
      .single();

    const currentPrefs = userData?.preferences || {};
    const categoryCount = ((currentPrefs.categories || {})[category] || 0) + 1;

    const { error: preferencesError } = await supabase
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

    if (preferencesError) throw preferencesError;

  } catch (error) {
    console.error('Error tracking article:', error);
    throw error;
  }
}