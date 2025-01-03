interface RetryOptions {
  initialDelay?: number;
  maxDelay?: number;
  factor?: number;
}

const DEFAULT_OPTIONS: RetryOptions = {
  initialDelay: 1000,
  maxDelay: 10000,
  factor: 2,
};

export async function retryWithBackoff<T>(
  operation: () => Promise<T>,
  maxRetries: number,
  options: RetryOptions = DEFAULT_OPTIONS
): Promise<T> {
  const { initialDelay, maxDelay, factor } = { ...DEFAULT_OPTIONS, ...options };
  
  let lastError: Error;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // Don't retry if it's a client error
      if (error.status >= 400 && error.status < 500) {
        throw error;
      }
      
      // Calculate delay with exponential backoff
      const delay = Math.min(
        initialDelay * Math.pow(factor, attempt),
        maxDelay
      );
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}