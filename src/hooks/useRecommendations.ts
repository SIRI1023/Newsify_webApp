import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { fetchRecommendedArticles } from '../services/recommendations';
import type { NewsDataArticle } from '../types/newsData';

export function useRecommendations() {
  const { user } = useAuthContext();
  const [recommendations, setRecommendations] = useState<NewsDataArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadRecommendations() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Add timeout to prevent infinite loading
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Request timeout')), 10000);
        });

        const fetchPromise = fetchRecommendedArticles(user.id);
        const articles = await Promise.race([fetchPromise, timeoutPromise]) as NewsDataArticle[];
        
        if (mounted) {
          setRecommendations(articles);
        }
      } catch (err: any) {
        console.error('Error fetching recommendations:', err);
        if (mounted) {
          setError(err.message || 'Failed to load recommendations');
          // Return empty array on error to prevent UI issues
          setRecommendations([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadRecommendations();

    return () => {
      mounted = false;
    };
  }, [user]);

  return { recommendations, loading, error };
}