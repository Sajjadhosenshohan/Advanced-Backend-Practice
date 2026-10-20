import type { Request, Response } from "express";
/**
 * =========================================================================
 * USE CASE 1: OTP GENERATION & VERIFICATION (Strings + TTL Expiration)
 * =========================================================================
 * কেন ব্যবহার করব?
 * - OTP খুব কম সময়ের জন্য ভ্যালিড থাকে (যেমন ৫ মিনিট)।
 * - MongoDB বা SQL ডেটাবেসে OTP রাখলে ক্রন জব দিয়ে ডিলিট করতে হয়।
 * - Redis-এ `EX` (Expire in seconds) দিলে নির্দিষ্ট সময় পর স্বয়ংক্রিয়ভাবে মুছে যায়।
 */
export declare const SendOTPController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const VerifyOTPController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=otp-redis.d.ts.map