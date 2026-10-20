import type { Request, Response } from "express";
/**
 * =========================================================================
 * USE CASE 7: REDIS SORTED SETS / ZSET (Leaderboards & Rankings)
 * =========================================================================
 * কেন Sorted Set (ZSET) ব্যবহার করব?
 * - প্রতিটি মেম্বারের সাথে একটি `score` যুক্ত থাকে।
 * - স্কোর অনুযায়ী ডেটা স্বয়ংক্রিয়ভাবে সাজানো (Sorted) থাকে O(log N) কমপ্লেক্সিটিতে।
 * - ১০ লক্ষ ইউজারের মধ্যেও তাৎক্ষণিকভাবে "Top 10 Player" এবং "ইউজারের র‍্যাংক কত"
 *   বের করা যায়।
 *
 * রিয়েল-ওয়ার্ল্ড উদাহরণ:
 * ১. গেমিং / কুইজ লিডারবোর্ড (Top 10 Players with Scores)
 * ২. ট্রেন্ডিং হ্যাশট্যাগ / সার্চ কি-ওয়ার্ডস
 * ৩. প্রায়োরিটি কিউ (Priority Queue)
 */
export declare const SubmitScoreController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const IncrementScoreController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetTopPlayersController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetPlayerRankController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=sorted-set-redis.d.ts.map