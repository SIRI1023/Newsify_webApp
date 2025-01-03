import { memo } from 'react';
import { ExternalLink, MessageSquare, FileText } from 'lucide-react';

interface CardActionsProps {
  onRead: () => void;
  onDiscuss: () => void;
  onSummary: () => void;
  isLoading?: boolean;
}

export const CardActions = memo(function CardActions({ 
  onRead, 
  onDiscuss, 
  onSummary,
  isLoading 
}: CardActionsProps) {
  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={onRead}
        disabled={isLoading}
        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg hover:from-blue-700 hover:to-blue-600 transition-all disabled:opacity-50"
      >
        <ExternalLink className="w-4 h-4" />
        Read More
      </button>
      
      <button
        onClick={onDiscuss}
        className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <MessageSquare className="w-4 h-4" />
        <span className="hidden sm:inline">Discuss</span>
      </button>
      
      <button
        onClick={onSummary}
        className="flex items-center justify-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <FileText className="w-4 h-4" />
        <span className="hidden sm:inline">Summary</span>
      </button>
    </div>
  );
});