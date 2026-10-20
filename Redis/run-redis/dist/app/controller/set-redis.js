import { redis } from "../../redis/index.js";
/**
 * =========================================================================
 * USE CASE 6: REDIS SETS (Unique Items, Online Users, Mutual Interests)
 * =========================================================================
 * কেন Set ব্যবহার করব?
 * - Set-এ ডুপ্লিকেট ভ্যালু কখনো স্টোর হয় না (Automatically Unique)।
 * - কোনো আইটেম আছে কি না তা চেক করা (SISMEMBER) মাত্র O(1) টাইম কমপ্লেক্সিটি!
 * - গাণিতিক সেট অপারেশন যেমন Intersection (কমন ফ্রেন্ডস/ইন্টারেস্ট), Union, Difference সাপোর্ট করে।
 *
 * রিয়েল-ওয়ার্ল্ড উদাহরণ:
 * ১. একটিভ/অনলাইন ইউজার ট্র্যাক করা (SADD, SREM, SMEMBERS)
 * ২. দুই ইউজারের মধ্যে কমন ফ্রেন্ড বা মিউচুয়াল ইন্টারেস্ট বের করা (SINTER)
 */
// POST /api/set/online-status (User connected or disconnected)
export const UpdateOnlineStatusController = async (req, res) => {
    try {
        const { userId, status } = req.body; // status: "online" | "offline"
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId is required" });
        }
        const key = "app:online_users";
        if (status === "offline") {
            // Redis Command: SREM key member (Remove user from set)
            await redis.srem(key, String(userId));
        }
        else {
            // Redis Command: SADD key member (Add user to set, ignores if already exists)
            await redis.sadd(key, String(userId));
        }
        // Redis Command: SCARD key (Returns count of set members)
        const onlineCount = await redis.scard(key);
        return res.status(200).json({
            success: true,
            message: `User ${userId} marked as ${status === "offline" ? "offline" : "online"}`,
            userId,
            currentTotalOnline: onlineCount,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error updating online status", error });
    }
};
// GET /api/set/online-users
export const GetOnlineUsersController = async (req, res) => {
    try {
        const key = "app:online_users";
        // Redis Command: SMEMBERS key (Returns all unique members)
        const onlineUsers = await redis.smembers(key);
        return res.status(200).json({
            success: true,
            totalOnline: onlineUsers.length,
            users: onlineUsers,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error getting online users", error });
    }
};
// GET /api/set/is-online/:userId
export const CheckUserOnlineController = async (req, res) => {
    try {
        const { userId } = req.params;
        const key = "app:online_users";
        // Redis Command: SISMEMBER key member (Returns 1 if member exists, else 0)
        const isOnline = await redis.sismember(key, String(userId));
        return res.status(200).json({
            success: true,
            userId,
            isOnline: isOnline === 1,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error checking user online status", error });
    }
};
// POST /api/set/interests (Add interests for a user)
export const AddUserInterestsController = async (req, res) => {
    try {
        const { userId, interests } = req.body; // interests: ["coding", "gaming", "football"]
        if (!userId || !Array.isArray(interests) || interests.length === 0) {
            return res.status(400).json({
                success: false,
                message: "userId and array of interests are required",
            });
        }
        const key = `user:${userId}:interests`;
        // Redis Command: SADD key member1 member2 ...
        await redis.sadd(key, ...interests);
        const allInterests = await redis.smembers(key);
        return res.status(200).json({
            success: true,
            message: "Interests saved",
            userId,
            interests: allInterests,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error adding interests", error });
    }
};
// GET /api/set/mutual-interests (Find common interests between two users using SINTER)
export const GetMutualInterestsController = async (req, res) => {
    try {
        const { user1, user2 } = req.query;
        if (!user1 || !user2) {
            return res.status(400).json({
                success: false,
                message: "Query params 'user1' and 'user2' are required (e.g. ?user1=1&user2=2)",
            });
        }
        const key1 = `user:${user1}:interests`;
        const key2 = `user:${user2}:interests`;
        // Redis Command: SINTER key1 key2 (Returns the intersection of multiple sets)
        const mutualInterests = await redis.sinter(key1, key2);
        return res.status(200).json({
            success: true,
            user1,
            user2,
            totalMutual: mutualInterests.length,
            mutualInterests,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error finding mutual interests", error });
    }
};
//# sourceMappingURL=set-redis.js.map