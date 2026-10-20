import { redis } from "../../redis/index.js";
/**
 * =========================================================================
 * USE CASE 8: API RATE LIMITING (Fixed Window / Throttling with Redis)
 * =========================================================================
 * কেন Redis দিয়ে Rate Limiting করব?
 * - কোনো হ্যাকার বা বট যেন আমাদের সার্ভারে প্রতি সেকেন্ডে হাজার হাজার রিকোয়েস্ট
 *   পাঠিয়ে সার্ভার ক্র্যাশ (DDoS) না করতে পারে।
 * - মাল্টিপল সার্ভার ইন্সট্যান্স থাকলে ইন-মেমোরি কাউন্ট কাজ করে না,
 *   কিন্তু সেন্ট্রালাইজড Redis সব সার্ভার ইনস্ট্যান্সের জন্য একটাই লিমিট ট্র্যাক করতে পারে।
 *
 * কীভাবে কাজ করে?
 * ১. ইউজারের আইপি বা ইউজার আইডি অনুযায়ী কি তৈরি হয়: `ratelimit:<ip>:<endpoint>`
 * ২. `INCR` কমান্ড দিয়ে কাউন্টার বাড়ানো হয়।
 * ৩. প্রথম রিকোয়েস্টে `EXPIRE` দিয়ে উইন্ডো টাইম (যেমন ৩০ সেকেন্ড) সেট করা হয়।
 * ৪. রিকোয়েস্ট সংখ্যা লিমিট (যেমন ৫টি) অতিক্রম করলে HTTP 429 Too Many Requests রিটার্ন করে।
 */
// Rate Limiter Reusable Middleware Factory
export const redisRateLimiter = (options) => {
    return async (req, res, next) => {
        try {
            const { windowSeconds, maxRequests, keyPrefix = "rl" } = options;
            // Client IP বের করা
            const clientIp = req.ip || req.socket.remoteAddress || "127.0.0.1";
            const key = `${keyPrefix}:${clientIp}`;
            // Redis Command: INCR key
            const currentRequests = await redis.incr(key);
            // প্রথম রিকোয়েস্টে উইন্ডোর মেয়াদ (TTL) সেট করা
            if (currentRequests === 1) {
                await redis.expire(key, windowSeconds);
            }
            // বাকি সময় কত সেকেন্ড বাকি আছে দেখা
            const ttl = await redis.ttl(key);
            // Response Headers সেট করা (Standard HTTP Rate Limit Headers)
            res.setHeader("X-RateLimit-Limit", maxRequests);
            res.setHeader("X-RateLimit-Remaining", Math.max(0, maxRequests - currentRequests));
            res.setHeader("X-RateLimit-Reset", ttl);
            // যদি অনুমোদিত সংখ্যা অতিক্রম করে
            if (currentRequests > maxRequests) {
                return res.status(429).json({
                    success: false,
                    message: `Too many requests! Maximum ${maxRequests} requests per ${windowSeconds}s allowed.`,
                    retryAfterSeconds: ttl,
                });
            }
            return next();
        }
        catch (error) {
            console.error("Rate limiter error:", error);
            // Redis ডাউন থাকলেও রিকোয়েস্ট ব্লক না করে সামনে পাস করে দেওয়া বেস্ট প্র্যাকটিস
            return next();
        }
    };
};
// GET /api/rate-limit/test (Demo Endpoint: 5 requests per 30 seconds)
export const RateLimitDemoController = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Request allowed! You are within the rate limit threshold.",
        timestamp: new Date().toISOString(),
    });
};
//# sourceMappingURL=rate-limiter-redis.js.map