import type { NewsDataArticle } from '../../types/newsData';
import { RecommendationCard } from './RecommendationCard';

interface RecommendationGridProps {
  articles: NewsDataArticle[];
}

export function RecommendationGrid({ articles }: RecommendationGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article, index) => (
        <RecommendationCard
          key={`${article.link}-${index}`}
          article={article}
        />
      ))}
    </div>
  );
}