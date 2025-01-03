// Available news categories
export const CATEGORIES = {
  top: 'top',
  business: 'business',
  entertainment: 'entertainment',
  environment: 'environment',
  food: 'food',
  health: 'health',
  politics: 'politics',
  science: 'science',
  sports: 'sports',
  technology: 'technology',
  world: 'world'
} as const;

export type NewsCategory = keyof typeof CATEGORIES;