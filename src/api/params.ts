import { NEWS_SOURCES } from '../config/sources';
import { CATEGORIES, type NewsCategory } from '../config/categories';

const API_KEY = 'pub_63089a8bbfcae3a5f0c3d0eed732ae34bab3e';

interface NewsParams {
  category?: NewsCategory;
  language?: string;
  country?: string;
}

export function buildNewsParams({
  category = 'top',
  language = 'en',
  country = 'us'
}: NewsParams = {}): URLSearchParams {
  const params = new URLSearchParams({
    apikey: API_KEY,
    language,
    country,
    domain: NEWS_SOURCES.join(',')
  });

  // Add category if not 'top'
  if (category !== 'top') {
    params.append('category', CATEGORIES[category]);
  }

  return params;
}