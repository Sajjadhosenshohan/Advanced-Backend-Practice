import { redis } from "../../../redis/index.js";

// 1. HyperLogLog
const recordUniqueVisitor = async (page: string, visitorId: string) => {
  const hllKey = `hll:visitors:${page || "site"}`;
  // Redis Command: PFADD key element
  const added = await redis.pfadd(hllKey, visitorId);
  // Redis Command: PFCOUNT key
  const count = await redis.pfcount(hllKey);

  return {
    page: page || "site",
    visitorId,
    isNewUniqueEstimate: added === 1,
    totalEstimatedUniqueVisitors: count,
    memoryUsedApprox: "~12 KB fixed!",
  };
};

const getUniqueVisitorCount = async (page: string) => {
  const hllKey = `hll:visitors:${page || "site"}`;
  const count = await redis.pfcount(hllKey);
  return { page: page || "site", uniqueVisitorsCount: count };
};

// 2. Bitmaps
const markUserActive = async (userId: number, date: string) => {
  const targetDate = date || new Date().toISOString().split("T")[0];
  const bitmapKey = `dau:${targetDate}`;

  // Redis Command: SETBIT key offset value (offset = userId)
  await redis.setbit(bitmapKey, userId, 1);
  // Redis Command: BITCOUNT key
  const totalActive = await redis.bitcount(bitmapKey);

  return { userId, date: targetDate, totalDailyActiveUsers: totalActive };
};

const getUserActiveStatus = async (userId: number | null, date: string) => {
  const targetDate = date || new Date().toISOString().split("T")[0];
  const bitmapKey = `dau:${targetDate}`;

  const totalActiveUsers = await redis.bitcount(bitmapKey);
  let wasActive = null;

  if (userId !== null) {
    // Redis Command: GETBIT key offset
    const bit = await redis.getbit(bitmapKey, userId);
    wasActive = bit === 1;
  }

  return {
    date: targetDate,
    totalActiveUsers,
    ...(userId !== null ? { userId, wasActive } : {}),
  };
};

export const AnalyticsService = {
  recordUniqueVisitor,
  getUniqueVisitorCount,
  markUserActive,
  getUserActiveStatus,
};
