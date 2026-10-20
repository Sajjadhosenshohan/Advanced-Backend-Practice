import { redis } from "../../../redis/index.js";

const incrementPageView = async (pageId: string) => {
  const key = `counter:pageview:${pageId}`;
  // Redis Command: INCR key (Atomic)
  const views = await redis.incr(key);
  return { pageId, views };
};

const toggleLike = async (postId: string, action: "like" | "unlike") => {
  const key = `counter:post:${postId}:likes`;
  let currentLikes: number;

  if (action === "unlike") {
    // Redis Command: DECR key
    currentLikes = await redis.decr(key);
    if (currentLikes < 0) {
      await redis.set(key, 0);
      currentLikes = 0;
    }
  } else {
    // Redis Command: INCR key
    currentLikes = await redis.incr(key);
  }

  return { postId, currentLikes, action };
};

const getCounterStats = async (key: string) => {
  const value = await redis.get(key);
  return { key, value: value ? Number(value) : 0 };
};

export const CounterService = {
  incrementPageView,
  toggleLike,
  getCounterStats,
};
