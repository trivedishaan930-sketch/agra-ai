export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: Date;
};
export type RateLimitStore = {
  increment(
    key: string,
    windowMs: number,
  ): Promise<{ count: number; resetAt: Date }>;
};

export class InMemoryRateLimitStore implements RateLimitStore {
  private readonly buckets = new Map<
    string,
    { count: number; resetAt: number }
  >();

  async increment(key: string, windowMs: number) {
    const now = Date.now();
    const bucket = this.buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      const resetAt = now + windowMs;
      this.buckets.set(key, { count: 1, resetAt });
      return { count: 1, resetAt: new Date(resetAt) };
    }
    bucket.count += 1;
    return { count: bucket.count, resetAt: new Date(bucket.resetAt) };
  }
}

export function createRateLimiter(options: {
  limit: number;
  windowMs: number;
  store?: RateLimitStore;
}) {
  const store = options.store ?? new InMemoryRateLimitStore();
  return {
    async check(key: string): Promise<RateLimitResult> {
      const result = await store.increment(key, options.windowMs);
      const remaining = Math.max(options.limit - result.count, 0);
      return {
        allowed: result.count <= options.limit,
        limit: options.limit,
        remaining,
        resetAt: result.resetAt,
      };
    },
  };
}
