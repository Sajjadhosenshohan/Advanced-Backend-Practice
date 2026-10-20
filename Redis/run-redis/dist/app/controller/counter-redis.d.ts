import type { Request, Response } from "express";
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
export declare const IncrementPageViewCounterController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const ToggleLikeCounterController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetCounterStatsController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=counter-redis.d.ts.map