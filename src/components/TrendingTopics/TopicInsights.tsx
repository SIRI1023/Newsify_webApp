import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { TrendingTopic } from '../../services/trending/topicAnalysis';
import { ArticleSummary } from '../Summary';

interface TopicInsightsProps {
  topic: TrendingTopic;
  onClose: () => void;
}

export function TopicInsights({ topic, onClose }: TopicInsightsProps) {
  const [expanded, setExpanded] = useState(false);

  const combinedContent = topic.articles
    .slice(0, 3)
    .map((article) => article.title + '\n' + (article.description || ''))
    .join('\n\n');

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">#{topic.keyword}</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800 transition-colors"
        >
          ×
        </button>
      </div>

      {/* Mentions */}
      <div className="text-sm text-gray-600 mb-4">
        Mentioned in {topic.count} articles
      </div>

      {/* Article List */}
      <div className="space-y-4">
        {topic.articles.slice(0, expanded ? undefined : 2).map((article, i) => (
          <div key={i} className="border-b pb-4 last:border-0">
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#FF8C42] hover:underline"
            >
              {article.title}
            </a>
            {article.description && (
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {article.description}
              </p>
            )}
          </div>
        ))}

        {/* Show More/Show Less */}
        {topic.articles.length > 2 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-sm text-[#FF8C42] hover:text-orange-600"
          >
            {expanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show more ({topic.articles.length - 2} articles)
              </>
            )}
          </button>
        )}
      </div>

      {/* Topic Overview */}
      <div className="mt-6">
        <h4 className="text-sm font-medium mb-2">Topic Overview</h4>
        <ArticleSummary content={combinedContent} />
      </div>
    </div>
  );
}
