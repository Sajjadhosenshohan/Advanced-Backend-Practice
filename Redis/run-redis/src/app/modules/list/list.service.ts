import { redis } from "../../../redis/index.js";

const pushTaskToQueue = async (queueName: string, task: any) => {
  const queueKey = `queue:${queueName || "default"}`;
  const payload = typeof task === "object" ? JSON.stringify(task) : String(task);

  // Redis Command: LPUSH key value
  const queueLength = await redis.lpush(queueKey, payload);
  return { queueKey, queueLength, task };
};

const popTaskFromQueue = async (queueName: string) => {
  const queueKey = `queue:${queueName || "default"}`;

  // Redis Command: RPOP key (FIFO)
  const rawTask = await redis.rpop(queueKey);

  if (!rawTask) {
    return { queueKey, task: null, remainingPendingInQueue: 0 };
  }

  let parsedTask: any;
  try {
    parsedTask = JSON.parse(rawTask);
  } catch {
    parsedTask = rawTask;
  }

  const remainingPendingInQueue = await redis.llen(queueKey);
  return { queueKey, task: parsedTask, remainingPendingInQueue };
};

const addRecentActivity = async (userId: string, activity: string) => {
  const key = `activities:user:${userId}`;
  const entry = JSON.stringify({
    activity,
    timestamp: new Date().toISOString(),
  });

  // Redis Command: LPUSH key value
  await redis.lpush(key, entry);

  // Redis Command: LTRIM key 0 9 (Keep only last 10 entries)
  await redis.ltrim(key, 0, 9);

  // Redis Command: LRANGE key 0 -1
  const rawList = await redis.lrange(key, 0, -1);
  const activities = rawList.map((item) => JSON.parse(item));

  return { userId, activities };
};

const getRecentActivities = async (userId: string) => {
  const key = `activities:user:${userId}`;
  const rawList = await redis.lrange(key, 0, -1);
  const activities = rawList.map((item) => JSON.parse(item));
  return { userId, count: activities.length, activities };
};

export const ListService = {
  pushTaskToQueue,
  popTaskFromQueue,
  addRecentActivity,
  getRecentActivities,
};
