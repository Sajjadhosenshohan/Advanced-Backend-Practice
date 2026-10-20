import { redis } from "../../../redis/index.js";

// Lua Script for atomic release
const RELEASE_LOCK_LUA_SCRIPT = `
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end
`;

// In-memory dummy storage for finalized tickets
const bookedTickets: Record<string, string> = {};

const bookTicket = async (ticketId: string, userId: string) => {
  if (bookedTickets[ticketId]) {
    return {
      status: "ALREADY_BOOKED",
      message: `Ticket ${ticketId} is already booked by user ${bookedTickets[ticketId]}!`,
    };
  }

  const lockKey = `lock:ticket:${ticketId}`;
  const lockToken = `user_${userId}_${Date.now()}`;
  const LOCK_TTL_MS = 5000;

  // Redis Command: SET key token NX PX milliseconds
  const acquired = await redis.set(lockKey, lockToken, "PX", LOCK_TTL_MS, "NX");

  if (!acquired) {
    return {
      status: "LOCK_ACQUISITION_FAILED",
      message: `Could not acquire lock! Another booking is in progress for Ticket ${ticketId}. Try again shortly.`,
    };
  }

  try {
    // Simulate booking & payment work
    await new Promise((resolve) => setTimeout(resolve, 1500));
    bookedTickets[ticketId] = userId;

    return {
      status: "SUCCESS",
      message: `Ticket ${ticketId} successfully booked by User ${userId}!`,
      ticketId,
      userId,
      bookingTime: new Date().toISOString(),
    };
  } finally {
    // Safely release lock using Lua Script
    await redis.eval(RELEASE_LOCK_LUA_SCRIPT, 1, lockKey, lockToken);
  }
};

const getTicketStatus = async (ticketId: string) => {
  const lockKey = `lock:ticket:${ticketId}`;
  const isLocked = await redis.exists(lockKey);
  const bookedBy = bookedTickets[ticketId] ?? null;

  return {
    ticketId,
    isCurrentlyLocked: isLocked === 1,
    isBooked: Boolean(bookedBy),
    bookedBy,
  };
};

export const LockService = {
  bookTicket,
  getTicketStatus,
};
