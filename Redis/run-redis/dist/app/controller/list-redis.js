import { redis } from "../../redis/index.js";
/**
 * =========================================================================
 * USE CASE 5: REDIS LISTS (Queues, Producer-Consumer, Recent Activities)
 * =========================================================================
 * কেন List ব্যবহার করব?
 * - Redis Lists হলো Doubly Linked List।
 * - শুরুতে (Head) বা শেষে (Tail) ডাটা পুশ বা পপ করার টাইম কমপ্লেক্সিটি O(1)!
 * - ডাটাবেসে ১০ কোটি রো থাকলেও পুশ করতে মাত্র ১ মিলি-সেকেন্ড লাগে।
 *
 * রিয়েল-ওয়ার্ল্ড উদাহরণ:
 * ১. ব্যাকগ্রাউন্ড জব/মেসেজ কিউ (যেমন: ইমেইল সেন্ডিং কিউ FIFO)
 * ২. রিসেন্ট অ্যাক্টিভিটি ফিড (যেমন: শেষ ১০টি নোটিফিকেশন LTRIM দিয়ে রাখা)
 */
// POST /api/list/queue/push (Producer: Add task to queue)
export const PushTaskToQueueController = async (req, res) => {
    try {
        const { queueName, task } = req.body;
        if (!task) {
            return res.status(400).json({ success: false, message: "Task payload is required" });
        }
        const queueKey = `queue:${queueName || "default"}`;
        const payload = typeof task === "object" ? JSON.stringify(task) : String(task);
        // Redis Command: LPUSH key value (Adds to the left / head of list)
        const queueLength = await redis.lpush(queueKey, payload);
        return res.status(200).json({
            success: true,
            message: `Task pushed to ${queueKey} (Producer)`,
            task,
            totalPendingInQueue: queueLength,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error pushing to queue", error });
    }
};
// POST /api/list/queue/pop (Consumer: Process oldest task from queue - FIFO)
export const PopTaskFromQueueController = async (req, res) => {
    try {
        const { queueName } = req.body;
        const queueKey = `queue:${queueName || "default"}`;
        // Redis Command: RPOP key (Pops from the right / tail of list -> FIFO Queue)
        const rawTask = await redis.rpop(queueKey);
        if (!rawTask) {
            return res.status(200).json({
                success: true,
                message: "Queue is empty! No pending tasks to process.",
                task: null,
            });
        }
        let parsedTask;
        try {
            parsedTask = JSON.parse(rawTask);
        }
        catch {
            parsedTask = rawTask;
        }
        const remainingCount = await redis.llen(queueKey);
        return res.status(200).json({
            success: true,
            message: `Task popped and ready to process (Consumer)`,
            task: parsedTask,
            remainingPendingInQueue: remainingCount,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error popping from queue", error });
    }
};
// POST /api/list/recent-activities (Add activity and cap list size with LTRIM)
export const AddRecentActivityController = async (req, res) => {
    try {
        const { userId, activity } = req.body;
        if (!userId || !activity) {
            return res.status(400).json({ success: false, message: "userId and activity are required" });
        }
        const key = `activities:user:${userId}`;
        const entry = JSON.stringify({
            activity,
            timestamp: new Date().toISOString(),
        });
        // ১. শুরুতে নতুন অ্যাক্টিভিটি যোগ করা
        // Redis Command: LPUSH key value
        await redis.lpush(key, entry);
        // ২. শুধুমাত্র শেষ ১০টি আইটেম রাখা (বাকি পুরনো ডাটা নিজে নিজেই ডিলিট হয়ে যাবে)
        // Redis Command: LTRIM key start stop (Keeping index 0 to 9 -> max 10 items)
        await redis.ltrim(key, 0, 9);
        // ৩. লিস্টের সব আইটেম রিড করা
        // Redis Command: LRANGE key start stop (0 to -1 means entire list)
        const rawList = await redis.lrange(key, 0, -1);
        const activities = rawList.map((item) => JSON.parse(item));
        return res.status(200).json({
            success: true,
            message: "Activity recorded. List capped at latest 10 entries.",
            userId,
            activities,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error logging activity", error });
    }
};
// GET /api/list/recent-activities/:userId
export const GetRecentActivitiesController = async (req, res) => {
    try {
        const { userId } = req.params;
        const key = `activities:user:${userId}`;
        // Redis Command: LRANGE key 0 -1
        const rawList = await redis.lrange(key, 0, -1);
        const activities = rawList.map((item) => JSON.parse(item));
        return res.status(200).json({
            success: true,
            userId,
            count: activities.length,
            activities,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching activities", error });
    }
};
//# sourceMappingURL=list-redis.js.map