import { useState } from 'react';
import { Loader, X } from 'lucide-react';
import { useSummary } from '../../hooks/useSummary';
import { cleanHtmlContent } from '../../utils/contentProcessor';

interface SummaryOverlayProps {
  content: string;
  isOpen: boolean;
  onClose: () => void;
}

export function SummaryOverlay({
  content,
  isOpen,
  onClose,
}: SummaryOverlayProps) {
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
    } catch (err) {
      console.error('Summary generation failed:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold">Article Summary</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader className="w-6 h-6 animate-spin text-blue-600" />
              <span className="ml-3 text-gray-600">Generating summary...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg">{error}</div>
          ) : summary ? (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{summary}</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Click the button below to generate a summary of this article.
              </p>
              <button
                onClick={handleGetSummary}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Generate Summary
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
