import { getHuggingFaceClient } from '../../utils/huggingface/client';
import type { NewsDataArticle } from '../../types/newsData';

export type SentimentType = 'positive' | 'negative' | 'neutral';

interface SentimentResult {
  label: SentimentType;
  score: number;
}

const SENTIMENT_CACHE = new Map<string, SentimentResult>();

export async function analyzeSentiment(text: string): Promise<SentimentResult> {
  // Check cache first
  const cacheKey = text.slice(0, 100); // Use first 100 chars as key
  const cached = SENTIMENT_CACHE.get(cacheKey);
  if (cached) return cached;

  const hf = getHuggingFaceClient();
  
  try {
    const result = await hf.textClassification({
      model: 'distilbert-base-uncased-finetuned-sst-2-english',
      inputs: text.slice(0, 512) // Limit input length
    });

    const sentiment: SentimentResult = {
      label: mapLabel(result[0].label),
      score: result[0].score
    };

    // Cache the result
    SENTIMENT_CACHE.set(cacheKey, sentiment);
    return sentiment;
  } catch (error) {
    console.error('Sentiment analysis failed:', error);
    return { label: 'neutral', score: 1 };
  }
}

function mapLabel(label: string): SentimentType {
  switch (label.toLowerCase()) {
    case 'positive':
    case 'pos':
    case '1':
      return 'positive';
    case 'negative':
    case 'neg':
    case '0':
      return 'negative';
    default:
      return 'neutral';
  }
}

export async function analyzeArticleSentiment(article: NewsDataArticle): Promise<SentimentResult> {
  // Combine title and description for analysis
  const text = [
    article.title,
    article.description || '',
    article.content?.slice(0, 200) || '' // First 200 chars of content
  ].join(' ').trim();

  return analyzeSentiment(text);
}