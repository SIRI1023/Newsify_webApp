import { useState, useEffect } from 'react';
import { fetchNews } from '../utils/api';
import type { Article } from '../types/news';

export function useNews() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const getNews = async () => {
      try {
        setLoading(true);
        const data = await fetchNews(activeCategory);
        setArticles(data.data);
        setError(false);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getNews();
  }, [activeCategory]);

  return { 
    articles, 
    loading, 
    error, 
    activeCategory, 
    setActiveCategory 
  };
}