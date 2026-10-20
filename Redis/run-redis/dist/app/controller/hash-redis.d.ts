import type { Request, Response } from "express";
/**
 * =========================================================================
 * USE CASE 4: REDIS HASHES (Objects, User Profiles, Shopping Cart)
 * =========================================================================
 * কেন Hash ব্যবহার করব String (JSON) এর বদলে?
 * - JSON String রাখলে একটি ফিল্ড (যেমন: age) আপডেট করার জন্য পুরো অবজেক্ট fetch করে
 *   JSON.parse -> modify -> JSON.stringify -> save করতে হয়।
 * - Redis Hash হলো কি-ভ্যালু এর ভেতর আরেকটা অবজেক্ট (Field-Value pair)।
 * - কোনো একটি ফিল্ড একা আপডেট বা ফেচ করতে পারি (HSET, HGET, HINCRBY)।
 * - মেমোরি অনেক সাশ্রয় (Memory efficient) হয়।
 *
 * রিয়েল-ওয়ার্ল্ড উদাহরণ:
 * ১. ইউজার সেশন / প্রোফাইল স্টোরেজ
 * ২. ই-কমার্স শপিং কার্ট (Cart: CartId -> ProductId: Quantity)
 */
export declare const SaveUserProfileHashController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetUserProfileHashController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const AddToCartHashController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GetCartHashController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=hash-redis.d.ts.map