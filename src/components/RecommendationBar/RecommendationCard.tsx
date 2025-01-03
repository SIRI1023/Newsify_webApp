import { Calendar } from 'lucide-react';
import type { NewsDataArticle } from '../../types/newsData';
import { formatDate } from '../../utils/dateUtils';
import { useArticleTracking } from '../../hooks/useArticleTracking';

interface RecommendationCardProps {
  article: NewsDataArticle;
}

export function RecommendationCard({ article }: RecommendationCardProps) {
  const { trackArticleClick, isTracking } = useArticleTracking();

  const handleClick = async () => {
    await trackArticleClick(article);
    window.open(article.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <article className="flex-shrink-0 w-72 bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video relative overflow-hidden bg-gray-100">
        {article.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
          <Calendar className="w-3 h-3" />
          <time>{formatDate(article.pubDate)}</time>
        </div>
        
        <h3 className="text-sm font-medium line-clamp-2 mb-2">
          <button
            onClick={handleClick}
            disabled={isTracking}
            className="hover:text-blue-600 transition-colors text-left disabled:opacity-50"
          >
            {article.title}
          </button>
        </h3>
      </div>
    </article>
  );
}