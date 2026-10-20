import type { NextFunction, Request, Response } from "express";
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
export declare const redisRateLimiter: (options: {
    windowSeconds: number;
    maxRequests: number;
    keyPrefix?: string;
}) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
export declare const RateLimitDemoController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=rate-limiter-redis.d.ts.map