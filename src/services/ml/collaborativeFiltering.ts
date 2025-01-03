import { supabase } from '../../lib/supabase';

interface UserInteraction {
  user_id: string;
  article_url: string;
  score: number;
}

// Calculate user similarity based on reading history
async function calculateUserSimilarity(userId: string): Promise<Map<string, number>> {
  const { data: userInteractions } = await supabase
    .from('reading_history')
    .select('user_id, article_url, time_spent')
    .order('read_at', { ascending: false })
    .limit(1000);

  if (!userInteractions) return new Map();

  // Create user-article interaction matrix
  const userArticles = new Map<string, Map<string, number>>();
  userInteractions.forEach(({ user_id, article_url, time_spent }) => {
    if (!userArticles.has(user_id)) {
      userArticles.set(user_id, new Map());
    }
    userArticles.get(user_id)?.set(article_url, time_spent);
  });

  // Calculate similarity scores using Pearson correlation
  const similarities = new Map<string, number>();
  const targetUser = userArticles.get(userId);
  if (!targetUser) return similarities;

  userArticles.forEach((otherUserArticles, otherUserId) => {
    if (otherUserId === userId) return;

    // Find common articles
    const commonArticles = Array.from(targetUser.keys())
      .filter(url => otherUserArticles.has(url));

    if (commonArticles.length < 2) return;

    // Calculate Pearson correlation
    const n = commonArticles.length;
    let sum1 = 0, sum2 = 0, sum1Sq = 0, sum2Sq = 0, pSum = 0;

    commonArticles.forEach(url => {
      const score1 = targetUser.get(url) || 0;
      const score2 = otherUserArticles.get(url) || 0;
      sum1 += score1;
      sum2 += score2;
      sum1Sq += score1 * score1;
      sum2Sq += score2 * score2;
      pSum += score1 * score2;
    });

    const num = pSum - (sum1 * sum2 / n);
    const den = Math.sqrt(
      (sum1Sq - sum1 * sum1 / n) * (sum2Sq - sum2 * sum2 / n)
    );

    if (den === 0) return;
    similarities.set(otherUserId, num / den);
  });

  return similarities;
}

export async function getCollaborativeRecommendations(
  userId: string,
  limit: number = 10
): Promise<string[]> {
  const similarities = await calculateUserSimilarity(userId);
  
  // Get articles read by similar users
  const similarUsers = Array.from(similarities.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([id]) => id);

  if (similarUsers.length === 0) return [];

  const { data: recommendations } = await supabase
    .from('reading_history')
    .select('article_url, article_category')
    .in('user_id', similarUsers)
    .order('read_at', { ascending: false })
    .limit(limit);

  return recommendations?.map(r => r.article_url) || [];
}