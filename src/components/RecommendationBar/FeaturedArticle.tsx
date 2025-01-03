import { Calendar, ExternalLink } from 'lucide-react';
import type { NewsDataArticle } from '../../types/newsData';
import { formatDate } from '../../utils/dateUtils';
import { useArticleTracking } from '../../hooks/useArticleTracking';
import { SourceBadge } from '../common/SourceBadge';

interface FeaturedArticleProps {
  article: NewsDataArticle;
}

export function FeaturedArticle({ article }: FeaturedArticleProps) {
  const { trackArticleClick, isTracking } = useArticleTracking();

  const handleClick = async () => {
    await trackArticleClick(article);
    window.open(article.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      className="relative h-[500px] overflow-hidden rounded-2xl group cursor-pointer"
      onClick={handleClick}
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent">
        {article.image_url && (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
          />
        )}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-8 text-white">
        <div className="space-y-4">
          {/* Category & Source */}
          <div className="flex items-center gap-3">
            {article.category?.[0] && (
              <span className="px-3 py-1 bg-gray-800 text-[#FF8C42] shadow-md rounded-full text-sm font-medium">
                {article.category[0]}
              </span>
            )}
            <SourceBadge source={article.source_name || article.source_id} />
          </div>

          {/* Title */}
          <h3 className="text-3xl font-bold leading-tight group-hover:text-blue-400 transition-colors duration-300">
            {article.title}
          </h3>

          {/* Description */}
          <p className="text-gray-200 line-clamp-2 max-w-3xl">
            {article.description || article.content}
          </p>

          {/* Metadata */}
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {formatDate(article.pubDate)}
            </div>
            <button
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
              disabled={isTracking}
            >
              Read full article <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
