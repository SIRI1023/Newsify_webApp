import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRecommendations } from '../../hooks/useRecommendations';
import { FeaturedArticle } from './FeaturedArticle';

export function RecommendationBar() {
  const { recommendations, loading, error } = useRecommendations();
  const sliderRef = useRef<HTMLDivElement>(null); // Always call hooks at the top level

  if (loading) {
    return (
      <div className="h-72 flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-72 flex items-center justify-center bg-gray-50 text-gray-600">
        Failed to load recommendations
      </div>
    );
  }

  // Default content when there are no recommendations
  if (!recommendations || !recommendations.length) {
    return (
      <div className="h-72 flex items-center justify-center bg-gray-50 text-gray-600">
        please sign in to get your news recommendations
      </div>
    );
  }

  const scrollLeft = () => {
    sliderRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    sliderRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Recommended for You
        </h2>
        <div className="relative">
          {/* Slider Controls */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:shadow-lg z-10"
          >
            <ChevronLeft className="h-5 w-5 text-gray-700" />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow hover:shadow-lg z-10"
          >
            <ChevronRight className="h-5 w-5 text-gray-700" />
          </button>

          {/* Slider Content */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide"
          >
            {recommendations.map((article, index) => (
              <div key={index} className="flex-shrink-0 w-full md:w-[500px]">
                <FeaturedArticle article={article} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
