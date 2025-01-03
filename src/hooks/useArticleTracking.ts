import { useState, useCallback } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import type { NewsDataArticle } from '../types/newsData';
import { trackArticleInteraction } from '../services/articleTracking';

export function useArticleTracking() {
  const { user } = useAuthContext();
  const [isTracking, setIsTracking] = useState(false);

  const trackArticleClick = useCallback(async (article: NewsDataArticle) => {
    if (!user || isTracking) return;

    try {
      setIsTracking(true);
      await trackArticleInteraction(user.id, article);
    } catch (error) {
      console.error('Error tracking article:', error);
    } finally {
      setIsTracking(false);
    }
  }, [user, isTracking]);

  return { trackArticleClick, isTracking };
}