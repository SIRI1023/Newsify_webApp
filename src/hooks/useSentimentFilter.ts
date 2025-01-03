import { useState, useCallback } from 'react';
import type { SentimentType } from '../services/ml/sentimentAnalysis';

export function useSentimentFilter() {
  const [selectedSentiment, setSelectedSentiment] = useState<SentimentType | 'all'>('all');

  const filterBySentiment = useCallback((sentiment: SentimentType | null) => {
    if (selectedSentiment === 'all') return true;
    return sentiment === selectedSentiment;
  }, [selectedSentiment]);

  return {
    selectedSentiment,
    setSelectedSentiment,
    filterBySentiment
  };
}