import { memo } from 'react';

const CATEGORY_COLORS = {
  business: 'bg-blue-100 text-blue-800',
  technology: 'bg-purple-100 text-purple-800',
  entertainment: 'bg-pink-100 text-pink-800',
  health: 'bg-green-100 text-green-800',
  science: 'bg-indigo-100 text-indigo-800',
  sports: 'bg-orange-100 text-orange-800',
  politics: 'bg-red-100 text-red-800',
  world: 'bg-teal-100 text-teal-800',
  default: 'bg-gray-100 text-gray-800'
} as const;

interface CategoryTagProps {
  category: string;
}

export const CategoryTag = memo(function CategoryTag({ category }: CategoryTagProps) {
  const colorClass = CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] || CATEGORY_COLORS.default;

  return (
    <span className={`absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-medium ${colorClass}`}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </span>
  );
});