import { useState } from 'react';
import { generateSummary } from '../utils/huggingface/summarize';

export function useSummary() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = async (content: string): Promise<string> => {
    setLoading(true);
    setError(null);

    try {
      const summary = await generateSummary(content);
      return summary;
    } catch (err: any) {
      const errorMessage = err?.message || 'An error occurred while generating the summary.';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { fetchSummary, loading, error };
}