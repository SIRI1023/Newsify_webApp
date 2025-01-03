import { useState } from 'react';
import { TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';
import { useTrendingTopics } from '../../hooks/useTrendingTopics';
import { TopicList } from './TopicList';
import { TopicInsights } from './TopicInsights';
import type { TrendingTopic } from '../../services/trending/topicAnalysis';
import type { NewsDataArticle } from '../../types/newsData';

interface TrendingTopicsProps {
  articles: NewsDataArticle[];
}

export function TrendingTopics({ articles }: TrendingTopicsProps) {
  const { topics, loading, error } = useTrendingTopics(articles);
  const [isExpanded, setIsExpanded] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState<TrendingTopic | null>(null);

  if (loading || error || !topics.length) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-semibold">Trending Topics</h2>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-500 hover:text-gray-700"
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </button>
      </div>

      {isExpanded && (
        <TopicList
          topics={topics}
          onTopicClick={setSelectedTopic}
        />
      )}

      {selectedTopic && (
        <TopicInsights
          topic={selectedTopic}
          onClose={() => setSelectedTopic(null)}
        />
      )}
    </section>
  );
}