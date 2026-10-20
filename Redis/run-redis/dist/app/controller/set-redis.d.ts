import type { Request, Response } from "express";
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
export declare const UpdateOnlineStatusController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetOnlineUsersController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const CheckUserOnlineController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const AddUserInterestsController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetMutualInterestsController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=set-redis.d.ts.map