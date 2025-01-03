import { NEWSDATA_API_KEY, NEWSDATA_API_BASE_URL, NEWS_DOMAINS, CATEGORIES } from '../config/newsDataApi';
import { retryWithBackoff } from '../utils/retry';
import { checkRateLimit, getRateLimitResetTime } from '../utils/rateLimiter';
import { getNewsCache, setNewsCache } from '../utils/cache/newsCache';
import type { NewsDataResponse } from '../types/newsData';
import type { NewsCategory } from '../config/newsDataApi';

const API_RATE_LIMIT_KEY = 'newsdata_api';

export async function fetchNewsData(category: NewsCategory = 'top'): Promise<NewsDataResponse> {
  try {
    // Check cache first
    const cached = getNewsCache(category);
    if (cached) {
      return cached;
    }

    // Check rate limit
    if (!checkRateLimit(API_RATE_LIMIT_KEY)) {
      const resetTime = getRateLimitResetTime(API_RATE_LIMIT_KEY);
      const waitTime = Math.ceil((resetTime - Date.now()) / 1000);
      
      // Try to return cached data even if expired
      const expiredCache = getNewsCache(category, true);
      if (expiredCache) {
        return expiredCache;
      }
      
      throw new Error(`Rate limit exceeded. Please try again in ${waitTime} seconds.`);
    }

    const params = new URLSearchParams({
      apikey: NEWSDATA_API_KEY,
      domain: NEWS_DOMAINS,
      language: 'en',
      country: 'us'
    });

    if (category !== 'top') {
      params.append('category', CATEGORIES[category]);
    }

    const url = `${NEWSDATA_API_BASE_URL}/news?${params}`;
    const response = await retryWithBackoff(
      () => fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      }), 
      3,
      { 
        initialDelay: 2000,
        maxDelay: 10000
      }
    );
    
    if (!response.ok) {
      if (response.status === 429) {
        // Try to return cached data on rate limit
        const expiredCache = getNewsCache(category, true);
        if (expiredCache) {
          return expiredCache;
        }
      }
      throw new Error(`Failed to fetch news: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'success') {
      throw new Error(data.results?.message || 'API returned unsuccessful status');
    }

    const newsData = {
      status: data.status,
      totalResults: data.totalResults || 0,
      results: data.results || [],
      nextPage: data.nextPage
    };

    // Cache the successful response
    setNewsCache(category, newsData);

    return newsData;
  } catch (error: any) {
    console.error('Error fetching news:', error.message);
    throw error;
  }
}