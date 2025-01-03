import { NEWS_API_KEY, NEWS_API_BASE_URL, NEWS_SOURCES } from '../config/newsApi';
import { getDateRange } from './dateUtils';
import type { NewsAPIResponse } from '../types/news';

export type NewsCategory = 
  | 'general'
  | 'business'
  | 'technology'
  | 'entertainment'
  | 'health'
  | 'science'
  | 'sports';

export function getCategoryParam(category: string): NewsCategory {
  switch (category.toLowerCase()) {
    case 'all': return 'general';
    case 'business': return 'business';
    case 'technology': return 'technology';
    case 'entertainment': return 'entertainment';
    case 'health': return 'health';
    case 'science': return 'science';
    case 'sports': return 'sports';
    default: return 'general';
  }
}

export async function fetchNews(category: string = 'All'): Promise<NewsAPIResponse> {
  try {
    const apiCategory = getCategoryParam(category);
    const { startDate, endDate } = getDateRange();
    
    const params = new URLSearchParams({
      apiKey: NEWS_API_KEY,
      language: 'en',
      sources: NEWS_SOURCES,
      from: startDate,
      to: endDate,
      sortBy: 'publishedAt',
      pageSize: '100'
    });

    // Add category if not 'general' to avoid conflicts with sources
    if (apiCategory !== 'general') {
      params.append('category', apiCategory);
    }
    
    const url = `${NEWS_API_BASE_URL}/everything?${params.toString()}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch news');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching news:', error);
    throw error;
  }
}