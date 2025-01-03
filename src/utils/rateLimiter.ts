interface RateLimiter {
  timestamp: number;
  count: number;
  resetTime: number;
}

const RATE_LIMIT = 15; // Reduced limit to be more conservative
const RATE_WINDOW = 60 * 1000; // 1 minute window
const rateLimiters = new Map<string, RateLimiter>();

export function checkRateLimit(key: string): boolean {
  const now = Date.now();
  const limiter = rateLimiters.get(key);

  if (!limiter || now - limiter.timestamp > RATE_WINDOW) {
    rateLimiters.set(key, { 
      timestamp: now,
      count: 1,
      resetTime: now + RATE_WINDOW
    });
    return true;
  }

  if (limiter.count >= RATE_LIMIT) {
    return false;
  }

  limiter.count++;
  return true;
}

export function getRateLimitResetTime(key: string): number {
  const limiter = rateLimiters.get(key);
  return limiter?.resetTime || 0;
}