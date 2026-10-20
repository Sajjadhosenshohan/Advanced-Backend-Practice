import { redis } from "../../../redis/index.js";

const ONLINE_SET_KEY = "app:online_users";

const updateOnlineStatus = async (userId: string, status: "online" | "offline") => {
  if (status === "offline") {
    // Redis Command: SREM key member
    await redis.srem(ONLINE_SET_KEY, String(userId));
  } else {
    // Redis Command: SADD key member
    await redis.sadd(ONLINE_SET_KEY, String(userId));
  }

  // Redis Command: SCARD key
  const onlineCount = await redis.scard(ONLINE_SET_KEY);
  return { userId, status, onlineCount };
};

const getOnlineUsers = async () => {
  // Redis Command: SMEMBERS key
  const users = await redis.smembers(ONLINE_SET_KEY);
  return { totalOnline: users.length, users };
};

const checkUserOnline = async (userId: string) => {
  // Redis Command: SISMEMBER key member (O(1))
  const isOnline = await redis.sismember(ONLINE_SET_KEY, String(userId));
  return { userId, isOnline: isOnline === 1 };
};

const addUserInterests = async (userId: string, interests: string[]) => {
  const key = `user:${userId}:interests`;
  // Redis Command: SADD key member1 member2 ...
  await redis.sadd(key, ...interests);
  const allInterests = await redis.smembers(key);
  return { userId, interests: allInterests };
};

const getMutualInterests = async (user1: string, user2: string) => {
  const key1 = `user:${user1}:interests`;
  const key2 = `user:${user2}:interests`;

  // Redis Command: SINTER key1 key2
  const mutual = await redis.sinter(key1, key2);
  return { user1, user2, totalMutual: mutual.length, mutualInterests: mutual };
};

export const SetService = {
  updateOnlineStatus,
  getOnlineUsers,
  checkUserOnline,
  addUserInterests,
  getMutualInterests,
};
