import "dotenv/config";
import { Redis } from "ioredis";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Primary Redis client for normal commands (GET, SET, HASH, ZSET, etc.)
export const redis = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 100, 3000);
    return delay;
  },
  lazyConnect: false,
});

// Dedicated Redis client for Pub/Sub subscriber (Redis requires a separate connection for SUBSCRIBE)
export const redisSub = new Redis(REDIS_URL, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 100, 3000);
    return delay;
  },
});

redis.on("connect", () => {
  console.log("⚡ [Redis] Primary client connected successfully!");
});

redis.on("error", (err) => {
  console.error("❌ [Redis Error]:", err.message);
});

redisSub.on("connect", () => {
  console.log("📢 [Redis Pub/Sub] Subscriber client connected successfully!");
});

redisSub.on("error", (err) => {
  console.error("❌ [Redis Pub/Sub Error]:", err.message);
});