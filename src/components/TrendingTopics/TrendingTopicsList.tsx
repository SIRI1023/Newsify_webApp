import { TrendingUp, Loader } from 'lucide-react';
import type { TrendingTopic } from '../../services/trending/topicAnalysis';

interface TrendingTopicsListProps {
  topics: TrendingTopic[];
  loading: boolean;
  error: string | null;
  onTopicClick: (topic: TrendingTopic) => void;
}

export function TrendingTopicsList({
  topics,
  loading,
  error,
  onTopicClick
}: TrendingTopicsListProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center h-12">
        <Loader className="w-5 h-5 animate-spin text-gray-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-500">
        Failed to load trending topics
      </div>
    );
  }

  if (!topics.length) {
    return (
      <div className="text-sm text-gray-500">
        No trending topics found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
        <TrendingUp className="w-4 h-4" />
        <span>Trending Topics</span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => (
          <button
            key={topic.keyword}
            onClick={() => onTopicClick(topic)}
            className="px-3 py-1 text-sm bg-white rounded-full border border-gray-200 
                     hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            <span className="font-medium">#{topic.keyword}</span>
            <span className="ml-1 text-gray-500">({topic.count})</span>
          </button>
        ))}
      </div>
    </div>
  );
}