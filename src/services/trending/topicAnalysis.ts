import type { NewsDataArticle } from '../../types/newsData';
import { extractArticleKeywords } from '../ml/keywordExtraction';

export interface TrendingTopic {
  keyword: string;
  count: number;
  score: number;
  articles: NewsDataArticle[];
}

interface KeywordData {
  count: number;
  score: number;
  articles: NewsDataArticle[];
  firstSeen: number;
}

const TRENDING_CACHE = new Map<string, TrendingTopic[]>();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Keywords to exclude from trending topics
const EXCLUDED_KEYWORDS = new Set([
  'ONLY AVAILABLE IN PAID PLANS',
  'only available in paid plans',
  'paid plans',
  'CNN ONLY AVAILABLE IN PAID PLANS',
  'PAID PLANS'
]);

function shouldIncludeKeyword(keyword: string): boolean {
  return !EXCLUDED_KEYWORDS.has(keyword) && 
         !EXCLUDED_KEYWORDS.has(keyword.toLowerCase()) &&
         !EXCLUDED_KEYWORDS.has(keyword.toUpperCase());
}

export async function analyzeTrendingTopics(
  articles: NewsDataArticle[]
): Promise<TrendingTopic[]> {
  // Check cache
  const cacheKey = articles
    .slice(0, 3)
    .map(a => a.title)
    .join('');
  const cached = TRENDING_CACHE.get(cacheKey);
  if (cached) return cached;

  // Extract keywords from all articles
  const keywordMap = new Map<string, KeywordData>();
  const now = Date.now();

  await Promise.all(
    articles.map(async article => {
      const keywords = await extractArticleKeywords(article);
      const timestamp = new Date(article.pubDate).getTime();
      
      keywords
        .filter(shouldIncludeKeyword)
        .forEach(keyword => {
          const existing = keywordMap.get(keyword) || {
            count: 0,
            score: 0,
            articles: [],
            firstSeen: timestamp
          };

          // Calculate time decay factor (newer = higher score)
          const timeDecay = Math.exp(-(now - timestamp) / (24 * 60 * 60 * 1000));
          
          existing.count += 1;
          existing.score += timeDecay;
          existing.articles.push(article);
          existing.firstSeen = Math.min(existing.firstSeen, timestamp);
          
          keywordMap.set(keyword, existing);
        });
    })
  );

  // Convert to array and sort by score
  const trending = Array.from(keywordMap.entries())
    .map(([keyword, data]) => ({
      keyword,
      count: data.count,
      score: data.score,
      articles: data.articles
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  // Cache results
  TRENDING_CACHE.set(cacheKey, trending);

  return trending;
}