interface RetryOptions {
  maxAttempts?: number;
  delay?: number;
  backoff?: boolean;
}

export const withRetry = async <T>(
  fn: () => Promise<T>,
  options: RetryOptions = {}
): Promise<T> => {
  const { maxAttempts = 3, delay = 1000, backoff = true } = options;
  
  let lastError: Error;
  
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt === maxAttempts) {
        throw lastError;
      }
      
      const waitTime = backoff ? delay * Math.pow(2, attempt - 1) : delay;
      await new Promise(resolve => setTimeout(resolve, waitTime));
    }
  }
  
  throw lastError!;
};

export const isNetworkError = (error: unknown): boolean => {
  return error instanceof Error && 
    (error.message.includes('fetch') || 
     error.message.includes('network') || 
     error.message.includes('timeout'));
};