export const NEWSDATA_API_KEY = 'pub_63089a8bbfcae3a5f0c3d0eed732ae34bab3e';
export const NEWSDATA_API_BASE_URL = 'https://newsdata.io/api/1';

// News domains
export const NEWS_DOMAINS = [
  'foxnews',
  'cnn',
  'abcnews',
  'nbcnews',
  'npr'
].join(',');

// Available news categories
export const CATEGORIES = {
  top: 'top',
  business: 'business',
  entertainment: 'entertainment',
  health: 'health',
  politics: 'politics',
  science: 'science',
  sports: 'sports',
  technology: 'technology',
  world: 'world',
  environment: 'environment',
  food: 'food'
} as const;

export type NewsCategory = keyof typeof CATEGORIES;