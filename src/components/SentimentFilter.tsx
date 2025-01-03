import { Smile, Frown, Minus } from 'lucide-react'; 
import type { SentimentType } from '../services/ml/sentimentAnalysis';

interface SentimentFilterProps {
  selected: SentimentType | 'all';
  onChange: (sentiment: SentimentType | 'all') => void;
}

export function SentimentFilter({ selected, onChange }: SentimentFilterProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-gray-700">Filter by tone:</span>
      <div className="flex gap-1">
        <button
          onClick={() => onChange('all')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
            ${selected === 'all'
              ? 'bg-[#FF8C42] text-white'
              : 'text-gray-600 hover:bg-gray-200 hover:text-[#FF8C42]'
            }`}
        >
          All
        </button>
        <button
          onClick={() => onChange('positive')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1
            ${selected === 'positive'
              ? 'bg-green-100 text-green-900'
              : 'text-gray-600 hover:bg-gray-200 hover:text-green-800'
            }`}
        >
          <Smile className="w-4 h-4" />
          Positive
        </button>
        <button
          onClick={() => onChange('neutral')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1
            ${selected === 'neutral'
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-200 hover:text-gray-800'
            }`}
        >
          <Minus className="w-4 h-4" />
          Neutral
        </button>
        <button
          onClick={() => onChange('negative')}
          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1
            ${selected === 'negative'
              ? 'bg-red-100 text-red-900'
              : 'text-gray-600 hover:bg-gray-200 hover:text-red-800'
            }`}
        >
          <Frown className="w-4 h-4" />
          Negative
        </button>
      </div>
    </div>
  );
}
