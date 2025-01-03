import type { NewsDataResponse } from '../../types/newsData';
import type { NewsCategory } from '../../config/newsDataApi';

const NEWS_CACHE_PREFIX = 'news_cache_';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
const EXTENDED_CACHE_DURATION = 30 * 60 * 1000; // 30 minutes for fallback

interface CacheEntry {
  data: NewsDataResponse;
  timestamp: number;
}

export function getNewsCache(category: NewsCategory, allowExpired = false): NewsDataResponse | null {
  try {
    const cached = localStorage.getItem(`${NEWS_CACHE_PREFIX}${category}`);
    if (!cached) return null;

    const entry: CacheEntry = JSON.parse(cached);
    const age = Date.now() - entry.timestamp;

    // Return null if cache is expired and we're not allowing expired data
    if (age > CACHE_DURATION && !allowExpired) {
      return null;
    }

    // Return null if cache is beyond extended duration
    if (age > EXTENDED_CACHE_DURATION) {
      localStorage.removeItem(`${NEWS_CACHE_PREFIX}${category}`);
      return null;
    }

    return entry.data;
  } catch (error) {
    console.error('Cache retrieval error:', error);
    return null;
  }
}

export function setNewsCache(category: NewsCategory, data: NewsDataResponse): void {
  try {
    const entry: CacheEntry = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(`${NEWS_CACHE_PREFIX}${category}`, JSON.stringify(entry));
  } catch (error) {
    console.error('Cache storage error:', error);
  }
}