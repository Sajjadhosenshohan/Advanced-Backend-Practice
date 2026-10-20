import { redis, redisSub } from "../../redis/index.js";
const receivedMessagesLog = [];
const DEFAULT_CHANNEL = "notifications:live";
// Redis কানেক্ট হলে ব্যাকগ্রাউন্ডে চ্যানেলে সাবস্ক্রাইব করে রাখা
redisSub.on("connect", () => {
    redisSub.subscribe(DEFAULT_CHANNEL, (err, count) => {
        if (err) {
            console.error("❌ Failed to subscribe to channel:", err.message);
        }
        else {
            console.log(`📢 Subscribed successfully to channel '${DEFAULT_CHANNEL}'. Channel count: ${count}`);
        }
    });
});
redisSub.on("message", (channel, rawMessage) => {
    let parsed;
    try {
        parsed = JSON.parse(rawMessage);
    }
    catch {
        parsed = rawMessage;
    }
    const logEntry = {
        channel,
        message: parsed,
        receivedAt: new Date().toISOString(),
    };
    receivedMessagesLog.unshift(logEntry);
    // সর্বোচ্চ ২০টি মেসেজ লগ রাখব
    if (receivedMessagesLog.length > 20) {
        receivedMessagesLog.pop();
    }
    console.log(`📩 [PubSub Message Received on '${channel}']:`, parsed);
});
// POST /api/pubsub/publish
export const PublishMessageController = async (req, res) => {
    try {
        const { channel, message } = req.body;
        if (!message) {
            return res.status(400).json({ success: false, message: "message payload is required" });
        }
        const targetChannel = channel || DEFAULT_CHANNEL;
        const payload = typeof message === "object" ? JSON.stringify(message) : String(message);
        // Redis Command: PUBLISH channel message
        // রিটার্ন করে কতজন সাবস্ক্রাইবার এই মুহূর্তে মেসেজটি পেল
        const subscriberCount = await redis.publish(targetChannel, payload);
        return res.status(200).json({
            success: true,
            message: `Message broadcasted to channel '${targetChannel}'`,
            channel: targetChannel,
            payload: message,
            activeSubscribersReceived: subscriberCount,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error publishing message", error });
    }
};
// GET /api/pubsub/messages
export const GetReceivedMessagesController = async (req, res) => {
    return res.status(200).json({
        success: true,
        channel: DEFAULT_CHANNEL,
        totalMessagesReceived: receivedMessagesLog.length,
        messages: receivedMessagesLog,
    });
};
//# sourceMappingURL=pubsub-redis.js.map