import { useState } from 'react';
import { Calendar, ExternalLink, Newspaper, MessageSquare } from 'lucide-react';
import { NewsDataArticle } from '../types/newsData';
import { ArticleSummary } from './Summary';
import { formatDate } from '../utils/dateUtils';
import { useArticleTracking } from '../hooks/useArticleTracking';
import { ChatOverlay } from './Chat/ChatOverlay';

interface NewsCardProps {
  article: NewsDataArticle;
}

export function NewsCard({ article }: NewsCardProps) {
  const { trackArticleClick, isTracking } = useArticleTracking();
  const [showChat, setShowChat] = useState(false);

  const handleArticleClick = async () => {
    await trackArticleClick(article);
    window.open(article.link, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <article className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
        <div className="aspect-video relative overflow-hidden bg-gray-100">
          {article.image_url ? (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Newspaper className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
            <Calendar className="w-4 h-4" />
            <time>{formatDate(article.pubDate)}</time>
            <span className="text-gray-400">•</span>
            <span>{article.source_name || article.source_id}</span>
            {article.category?.[0] && (
              <>
                <span className="text-gray-400">•</span>
                <span className="capitalize">{article.category[0]}</span>
              </>
            )}
          </div>
          
          <h2 className="text-xl font-semibold mb-2 line-clamp-2">
            <button 
              onClick={handleArticleClick}
              disabled={isTracking}
              className="hover:text-[#FF8C42] transition-colors text-left disabled:opacity-50"
            >
              {article.title}
            </button>
          </h2>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {article.description || article.content || "No description available"}
          </p>
          
          <div className="flex items-center justify-between">
            <button
              onClick={handleArticleClick}
              disabled={isTracking}
              className="inline-flex items-center gap-2 text-[#FF8C42] hover:text-orange-600 transition-colors disabled:opacity-50"
            >
              Read more <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={() => setShowChat(true)}
              className="inline-flex items-center gap-2 text-gray-600 hover:text-[#FF8C42] transition-colors"
            >
              Discuss with AI <MessageSquare className="w-4 h-4" />
            </button>
          </div>

          <ArticleSummary 
            content={`${article.title}\n\n${article.description || article.content || ''}`}
          />
        </div>
      </article>

      <ChatOverlay
        isOpen={showChat}
        onClose={() => setShowChat(false)}
        articleTitle={article.title}
        articleContent={article.description || article.content || ''}
      />
    </>
  );
}
