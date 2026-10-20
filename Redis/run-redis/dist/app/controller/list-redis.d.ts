import type { Request, Response } from "express";
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
export declare const PushTaskToQueueController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const PopTaskFromQueueController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const AddRecentActivityController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetRecentActivitiesController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=list-redis.d.ts.map