import { useState, useEffect } from 'react';
import { fetchNewsData } from '../api/newsData';
import { analyzeArticleSentiment } from '../services/ml/sentimentAnalysis';
import type { NewsDataArticle } from '../types/newsData';
import type { NewsCategory } from '../config/newsDataApi';
import type { SentimentType } from '../services/ml/sentimentAnalysis';

interface EnrichedArticle extends NewsDataArticle {
  sentiment?: SentimentType;
}

export function useNewsData() {
  const [articles, setArticles] = useState<EnrichedArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<NewsCategory>('top');

  useEffect(() => {
    let mounted = true;

    const getNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchNewsData(activeCategory);
        
        if (!mounted) return;

        // Analyze sentiment for each article
        const enrichedArticles = await Promise.all(
          data.results.map(async (article) => {
            try {
              const { label } = await analyzeArticleSentiment(article);
              return { ...article, sentiment: label };
            } catch (err) {
              console.error('Sentiment analysis failed for article:', err);
              return { ...article };
            }
          })
        );

        setArticles(enrichedArticles);
      } catch (err: any) {
        if (mounted) {
          setError(err.message || 'Failed to load news articles');
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    getNews();

    return () => {
      mounted = false;
    };
  }, [activeCategory]);

  return { 
    articles, 
    loading, 
    error, 
    activeCategory, 
    setActiveCategory 
  };
}