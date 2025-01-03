import { useState, useEffect } from 'react';
import { analyzeTrendingTopics } from '../services/trending/topicAnalysis';
import type { TrendingTopic } from '../services/trending/topicAnalysis';
import type { NewsDataArticle } from '../types/newsData';

export function useTrendingTopics(articles: NewsDataArticle[] = []) {
  const [topics, setTopics] = useState<TrendingTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function analyzeTopics() {
      if (!articles.length) {
        setTopics([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const trending = await analyzeTrendingTopics(articles);
        
        if (mounted) {
          setTopics(trending);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to analyze trending topics');
          setTopics([]);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    analyzeTopics();

    return () => {
      mounted = false;
    };
  }, [articles]);

  return { topics, loading, error };
}