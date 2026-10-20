import { redis } from "../../redis/index.js";
/**
 * =========================================================================
 * USE CASE 3: ATOMIC COUNTERS & METRICS (INCR, DECR, INCRBY)
 * =========================================================================
 * কেন ব্যবহার করব?
 * - ট্র্যাডিশনাল SQL বা NoSQL ডাটাবেসে `count = count + 1` করতে গেলে
 *   concurrency issue (race condition) তৈরি হয়।
 * - Redis-এর `INCR` এবং `DECR` কমান্ড পুরোপুরি Single-threaded ও Atomic!
 * - ১০,০০০ মানুষ একসাথে ক্লিক করলেও ১টি কাউন্টও মিস হবে না।
 *
 * রিয়েল-ওয়ার্ল্ড উদাহরণ:
 * ১. ইউটিউব/ব্লগ ভিডিও বা পেজ ভিউজ কাউন্টার
 * ২. ফেসবুক পোস্টের লাইক/রিঅ্যাকশন কাউন্টার
 * ৩. ফ্ল্যাশ সেল এ স্টক ডিক্রিমেন্ট করা (Inventory Counter)
 */
// POST /api/counter/page-view
export const IncrementPageViewCounterController = async (req, res) => {
    try {
        const { pageId } = req.body;
        const targetPage = pageId || "home";
        const key = `counter:pageview:${targetPage}`;
        // Redis Command: INCR key
        // কি যদি আগে থেকে না থাকে তবে 0 ধরে নিয়ে 1 করে দিবে।
        const views = await redis.incr(key);
        return res.status(200).json({
            success: true,
            message: `Page view incremented for '${targetPage}'`,
            pageId: targetPage,
            totalViews: views,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error incrementing page view", error });
    }
};
// POST /api/counter/like
export const ToggleLikeCounterController = async (req, res) => {
    try {
        const { postId, action } = req.body; // action: "like" | "unlike"
        if (!postId) {
            return res.status(400).json({ success: false, message: "postId is required" });
        }
        const key = `counter:post:${postId}:likes`;
        let currentLikes;
        if (action === "unlike") {
            // Redis Command: DECR key (কমে ১ বিয়োগ হবে)
            currentLikes = await redis.decr(key);
            if (currentLikes < 0) {
                // লাইক ০ এর নিচে যাতে না যায়
                await redis.set(key, 0);
                currentLikes = 0;
            }
        }
        else {
            // Redis Command: INCR key (বেড়ে ১ যোগ হবে)
            currentLikes = await redis.incr(key);
        }
        return res.status(200).json({
            success: true,
            message: `Post ${action === "unlike" ? "unliked" : "liked"} successfully!`,
            postId,
            totalLikes: currentLikes,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error updating like count", error });
    }
};
// GET /api/counter/stats
export const GetCounterStatsController = async (req, res) => {
    try {
        const { key } = req.query;
        if (!key) {
            return res.status(400).json({
                success: false,
                message: "Query parameter 'key' is required (e.g. ?key=counter:pageview:home)",
            });
        }
        // Redis Command: GET key
        const value = await redis.get(key);
        return res.status(200).json({
            success: true,
            key,
            value: value ? Number(value) : 0,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching counter stats", error });
    }
};
//# sourceMappingURL=counter-redis.js.map