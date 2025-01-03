// Simple in-memory cache for summaries
const summaryCache = new Map<string, { summary: string; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function getCachedSummary(key: string): string | null {
  const cached = summaryCache.get(key);
  if (!cached) return null;
  
  const isExpired = Date.now() - cached.timestamp > CACHE_DURATION;
  if (isExpired) {
    summaryCache.delete(key);
    return null;
  }
  
  return cached.summary;
}

export function cacheSummary(key: string, summary: string): void {
  summaryCache.set(key, {
    summary,
    timestamp: Date.now()
  });
}