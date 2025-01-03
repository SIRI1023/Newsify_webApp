import type { TrendingTopic } from '../../services/trending/topicAnalysis'; 

interface TopicListProps {
  topics: TrendingTopic[];
  onTopicClick: (topic: TrendingTopic) => void;
}

export function TopicList({ topics, onTopicClick }: TopicListProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {topics.map((topic) => (
        <button
          key={topic.keyword}
          onClick={() => onTopicClick(topic)}
          className="group px-5 py-2 bg-gray-800 text-[#FF8C42] rounded-full shadow-md hover:bg-gray-900 hover:text-[#FF8C42] transition-all"
        >
          <span className="font-semibold">
            #{topic.keyword}
          </span>
          <span className="ml-2 text-sm">
            ({topic.count})
          </span>
        </button>
      ))}
    </div>
  );
}
