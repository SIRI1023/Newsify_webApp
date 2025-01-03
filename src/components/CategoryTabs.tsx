import { CATEGORIES } from '../config/newsDataApi';
import type { NewsCategory } from '../config/newsDataApi';

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: NewsCategory) => void;
}

export function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  return (
    <div className="sticky top-16 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <nav className="-mb-px flex space-x-4 overflow-x-auto py-4 scrollbar-hide">
            {Object.keys(CATEGORIES).map((category) => (
              <button
                key={category}
                onClick={() => onCategoryChange(category as NewsCategory)}
                className={`
                  whitespace-nowrap px-5 py-2 text-sm font-semibold rounded-full transition-all
                  ${
                    activeCategory === category
                      ? 'bg-gray-800 text-[#FF8C42] shadow-md'
                      : 'text-gray-500 hover:text-[#FF8C42] hover:bg-gray-800'
                  }
                `}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
