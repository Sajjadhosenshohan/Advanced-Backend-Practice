import { redis } from "../../../redis/index.js";

const checkRateLimit = async (identifier: string, windowSeconds: number, maxRequests: number, prefix = "rl") => {
  const key = `${prefix}:${identifier}`;

  // Redis Command: INCR key
  const currentRequests = await redis.incr(key);

  // Set window TTL on first request
  if (currentRequests === 1) {
    await redis.expire(key, windowSeconds);
  }

  const ttl = await redis.ttl(key);

  return {
    isBlocked: currentRequests > maxRequests,
    currentRequests,
    maxRequests,
    windowSeconds,
    remainingRequests: Math.max(0, maxRequests - currentRequests),
    retryAfterSeconds: ttl,
  };
};

export const RateLimiterService = {
  checkRateLimit,
};
