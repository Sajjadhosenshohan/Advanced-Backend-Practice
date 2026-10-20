import { redis } from "../../redis/index.js";
/**
 * =========================================================================
 * USE CASE 12: BIG DATA ANALYTICS (HyperLogLog & Bitmaps)
 * =========================================================================
 * ১. HyperLogLog (HLL):
 * - ইউনিক ভিজিটর কাউন্ট করতে (Unique Visitors Count)।
 * - যদি ১ কোটি ইউনিক আইপি ট্র্যাক করতে হয়, Set ব্যবহার করলে শত শত মেগাবাইট র‍্যাম নষ্ট হয়।
 * - HyperLogLog মাত্র ১২ KB মেমোরি দিয়ে কোটি কোটি ইউনিক ইলিমেন্ট গণনা করতে পারে (0.81% error rate)।
 * - কমান্ডস: `PFADD`, `PFCOUNT`.
 *
 * ২. Bitmaps:
 * - বিট লেভেলে (0 অথবা 1) ডেটা রাখে।
 * - ইউজারদের Daily Active Users (DAU) বা স্ট্রিক/উপস্থিতি ট্র্যাক করতে ব্যবহৃত হয়।
 * - ১০ লক্ষ ইউজারের আজকের উপস্থিতি স্টোর করতে মাত্র ১২৫ KB মেমোরি লাগে!
 * - কমান্ডস: `SETBIT`, `GETBIT`, `BITCOUNT`.
 */
// POST /api/analytics/hll/visit (Record unique visitor with HyperLogLog)
export const RecordUniqueVisitorHLLController = async (req, res) => {
    try {
        const { page, visitorId } = req.body;
        if (!visitorId) {
            return res.status(400).json({ success: false, message: "visitorId (IP or User ID) is required" });
        }
        const hllKey = `hll:visitors:${page || "site"}`;
        // Redis Command: PFADD key element [element ...]
        // যদি আগে দেখা না হয়ে থাকে তবে 1 রিটার্ন করে
        const added = await redis.pfadd(hllKey, String(visitorId));
        // Redis Command: PFCOUNT key
        // আনুমানিক মোট ইউনিক ভিজিটর সংখ্যা
        const uniqueCount = await redis.pfcount(hllKey);
        return res.status(200).json({
            success: true,
            message: `Visitor recorded in HyperLogLog`,
            page: page || "site",
            visitorId,
            isNewUniqueEstimate: added === 1,
            totalEstimatedUniqueVisitors: uniqueCount,
            memoryUsedApprox: "~12 KB fixed!",
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error recording HLL visitor", error });
    }
};
// GET /api/analytics/hll/count
export const GetUniqueVisitorCountHLLController = async (req, res) => {
    try {
        const { page } = req.query;
        const hllKey = `hll:visitors:${page || "site"}`;
        const count = await redis.pfcount(hllKey);
        return res.status(200).json({
            success: true,
            page: page || "site",
            uniqueVisitorsCount: count,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error getting HLL count", error });
    }
};
// POST /api/analytics/bitmap/active (Mark user active for a date)
export const MarkUserActiveBitmapController = async (req, res) => {
    try {
        const { userId, date } = req.body;
        if (!userId) {
            return res.status(400).json({ success: false, message: "userId (number) is required" });
        }
        // তারিখ ফরম্যাট: YYYY-MM-DD
        const targetDate = date || new Date().toISOString().split("T")[0];
        const bitmapKey = `dau:${targetDate}`;
        // Redis Command: SETBIT key offset value (offset = userId, value = 1)
        // ইউজারের আইডিকে অফসেট হিসেবে ধরে তার বিট 1 করা হচ্ছে
        await redis.setbit(bitmapKey, Number(userId), 1);
        // Redis Command: BITCOUNT key (মোট কতজন ইউজারের বিট 1 আছে)
        const totalActiveUsers = await redis.bitcount(bitmapKey);
        return res.status(200).json({
            success: true,
            message: `User ${userId} marked active for date ${targetDate}`,
            userId,
            date: targetDate,
            totalDailyActiveUsers: totalActiveUsers,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error setting bitmap bit", error });
    }
};
// GET /api/analytics/bitmap/status (Check if user was active on date & total DAU)
export const GetUserActiveStatusBitmapController = async (req, res) => {
    try {
        const { userId, date } = req.query;
        const targetDate = date || new Date().toISOString().split("T")[0];
        const bitmapKey = `dau:${targetDate}`;
        // Redis Command: BITCOUNT key
        const totalActiveUsers = await redis.bitcount(bitmapKey);
        let isUserActive = null;
        if (userId) {
            // Redis Command: GETBIT key offset
            const bit = await redis.getbit(bitmapKey, Number(userId));
            isUserActive = bit === 1;
        }
        return res.status(200).json({
            success: true,
            date: targetDate,
            totalActiveUsers,
            ...(userId ? { userId: Number(userId), wasActive: isUserActive } : {}),
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error checking bitmap status", error });
    }
};
//# sourceMappingURL=analytics-redis.js.map