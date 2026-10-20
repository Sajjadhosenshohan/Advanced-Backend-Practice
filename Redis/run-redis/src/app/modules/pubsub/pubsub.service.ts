import { redis, redisSub } from "../../../redis/index.js";

interface PublishedMessage {
  channel: string;
  message: any;
  receivedAt: string;
}

const receivedMessagesLog: PublishedMessage[] = [];
const DEFAULT_CHANNEL = "notifications:live";

// Hook background subscription to connect event
redisSub.on("connect", () => {
  redisSub.subscribe(DEFAULT_CHANNEL, (err, count) => {
    if (err) {
      console.error("❌ Failed to subscribe to channel:", err.message);
    } else {
      console.log(`📢 Subscribed successfully to channel '${DEFAULT_CHANNEL}'. Channel count: ${count}`);
    }
  });
});

redisSub.on("message", (channel, rawMessage) => {
  let parsed: any;
  try {
    parsed = JSON.parse(rawMessage);
  } catch {
    parsed = rawMessage;
  }

  const logEntry: PublishedMessage = {
    channel,
    message: parsed,
    receivedAt: new Date().toISOString(),
  };

  receivedMessagesLog.unshift(logEntry);
  if (receivedMessagesLog.length > 20) {
    receivedMessagesLog.pop();
  }

  console.log(`📩 [PubSub Message Received on '${channel}']:`, parsed);
});

const publishMessage = async (channel: string, message: any) => {
  const targetChannel = channel || DEFAULT_CHANNEL;
  const payload = typeof message === "object" ? JSON.stringify(message) : String(message);

  // Redis Command: PUBLISH channel message
  const subscriberCount = await redis.publish(targetChannel, payload);

  return {
    channel: targetChannel,
    payload: message,
    subscriberCount,
  };
};

const getReceivedMessages = () => {
  return {
    channel: DEFAULT_CHANNEL,
    totalMessagesReceived: receivedMessagesLog.length,
    messages: receivedMessagesLog,
  };
};

export const PubSubService = {
  publishMessage,
  getReceivedMessages,
};
