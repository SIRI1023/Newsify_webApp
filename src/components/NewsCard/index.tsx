import { useState } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { CategoryTag } from './CategoryTag';
import { ImageSection } from './ImageSection';
import { CardActions } from './CardActions';
import { ChatOverlay } from '../Chat/ChatOverlay';
import { SummaryOverlay } from '../Summary/SummaryOverlay';
import { useArticleTracking } from '../../hooks/useArticleTracking';
import { formatDate } from '../../utils/dateUtils';
import type { NewsDataArticle } from '../../types/newsData';

interface NewsCardProps {
  article: NewsDataArticle;
  featured?: boolean;
}

export function NewsCard({ article, featured = false }: NewsCardProps) {
  const [showChat, setShowChat] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const { trackArticleClick, isTracking } = useArticleTracking();

  const handleArticleClick = async () => {
    await trackArticleClick(article);
    window.open(article.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <article className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        <div className="relative">
          {article.category?.[0] && (
            <CategoryTag category={article.category[0]} />
          )}
          <ImageSection imageUrl={article.image_url} title={article.title} />
        </div>

        <div className="p-6">
          {/* Source & Date */}
          <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
            <span className="font-medium text-blue-600">
              {article.source_name || article.source_id}
            </span>
            <span className="text-gray-300">•</span>
            <time className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {formatDate(article.pubDate)}
            </time>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            <button 
              onClick={handleArticleClick}
              disabled={isTracking}
              className="text-left"
            >
              {article.title}
            </button>
          </h2>

          {/* Description */}
          <p className="text-gray-600 mb-6 line-clamp-3">
            {article.description || article.content || "No description available"}
          </p>

          <CardActions
            onRead={handleArticleClick}
            onDiscuss={() => setShowChat(true)}
            onSummary={() => setShowSummary(true)}
            isLoading={isTracking}
          />
        </div>
      </article>

      {/* Overlays */}
      <ChatOverlay
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        articleTitle={article.title}
        articleContent={article.description || article.content || ''}
      />

      <SummaryOverlay
        isOpen={showSummary}
        onClose={() => setShowSummary(false)}
        content={`${article.title}\n\n${article.description || article.content || ''}`}
      />
    </>
  );
}