import type { Request, Response } from "express";
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
export declare const RecordUniqueVisitorHLLController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetUniqueVisitorCountHLLController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const MarkUserActiveBitmapController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetUserActiveStatusBitmapController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=analytics-redis.d.ts.map