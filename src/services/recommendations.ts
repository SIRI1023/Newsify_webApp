import { supabase } from '../lib/supabase';
import { fetchNewsData } from '../api/newsData';
import { calculateContentSimilarity } from './ml/similarityScoring';
import { getCollaborativeRecommendations } from './ml/collaborativeFiltering';
import type { NewsDataArticle } from '../types/newsData';

const CACHE_KEY = 'recommendations_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  articles: NewsDataArticle[];
  timestamp: number;
}

function getCache(): CacheEntry | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    const entry: CacheEntry = JSON.parse(cached);
    if (Date.now() - entry.timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }

    return entry;
  } catch {
    localStorage.removeItem(CACHE_KEY);
    return null;
  }
}

function setCache(articles: NewsDataArticle[]) {
  try {
    const entry: CacheEntry = {
      articles,
      timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch (error) {
    console.error('Cache storage error:', error);
  }
}

export async function fetchRecommendedArticles(userId: string): Promise<NewsDataArticle[]> {
  try {
    // Check cache first
    const cached = getCache();
    if (cached) return cached.articles;

    // Get user's preferred categories
    const { data: userData } = await supabase
      .from('users')
      .select('preferences')
      .eq('id', userId)
      .single();

    const preferences = userData?.preferences?.categories || {};
    const topCategory = Object.entries(preferences)
      .sort(([, a], [, b]) => Number(b) - Number(a))
      [0]?.[0] || 'top';

    // Fetch articles
    const articles = await fetchNewsData(topCategory);
    if (!articles.results.length) {
      return [];
    }

    // Get collaborative recommendations
    const collaborativeUrls = await getCollaborativeRecommendations(userId);
    
    // Calculate content similarity
    const similarityMatrix = calculateContentSimilarity(articles.results);
    
    // Score and rank articles
    const recommendations = articles.results
      .map((article, index) => ({
        article,
        score: calculateArticleScore(article, index, {
          similarityMatrix,
          collaborativeUrls,
          preferences
        })
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      .map(({ article }) => article);

    setCache(recommendations);
    return recommendations;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    return [];
  }
}

interface ScoringParams {
  similarityMatrix: number[][];
  collaborativeUrls: string[];
  preferences: Record<string, number>;
}

function calculateArticleScore(
  article: NewsDataArticle,
  index: number,
  { similarityMatrix, collaborativeUrls, preferences }: ScoringParams
): number {
  let score = 0;
  
  // Category preference score (0-40)
  const categoryScore = article.category?.[0] 
    ? preferences[article.category[0]] || 0
    : 0;
  score += Math.min(categoryScore * 10, 40);
  
  // Collaborative filtering score (0-30)
  if (collaborativeUrls.includes(article.link)) {
    score += 30;
  }
  
  // Content similarity score (0-30)
  const similarityScore = similarityMatrix[index]
    .reduce((sum, val) => sum + val, 0) / similarityMatrix.length;
  score += similarityScore * 30;
  
  return score;
}