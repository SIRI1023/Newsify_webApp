import { useState } from 'react';
import { useSummary } from '../../hooks/useSummary';
import { SummaryButton } from './SummaryButton';
import { SummaryError } from './SummaryError';
import { SummaryContent } from './SummaryContent';
import { cleanHtmlContent } from '../../utils/contentProcessor';

interface ArticleSummaryProps {
  content: string;
}

export function ArticleSummary({ content }: ArticleSummaryProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const { fetchSummary, loading, error } = useSummary();

  const handleGetSummary = async () => {
    try {
      const cleanContent = cleanHtmlContent(content);
      if (!cleanContent) {
        throw new Error('No valid content to summarize');
      }

      const result = await fetchSummary(cleanContent);
      setSummary(result);
    } catch (err: any) {
      console.error('Summary generation failed:', err);
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      {!summary && (
        <SummaryButton
          onGenerate={handleGetSummary}
          loading={loading}
          disabled={!content?.trim()}
        />
      )}

      {error && <SummaryError message={error} />}

      {summary && <SummaryContent summary={summary} />}
    </div>
  );
}
