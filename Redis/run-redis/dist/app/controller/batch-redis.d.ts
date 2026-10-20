import type { Request, Response } from "express";
/**
 * =========================================================================
 * USE CASE 13: PIPELINING & TRANSACTIONS (Batching & Atomic Execution)
 * =========================================================================
 * ১. Redis Pipelining:
 * - সাধারণত প্রতি কমান্ডে ১টি করে Network Round-trip (RTT) হয়।
 * - যদি ১০০টি কমান্ড রান করতে হয়, পাইপলাইনের মাধ্যমে সব কমান্ড একসাথে এক প্যাকেট হিসেবে
 *   Redis-এ পাঠিয়ে একবারে রেজাল্ট নিয়ে আসা যায়।
 * - নেটওয়ার্ক ল্যাটেন্সি ১০-২০ গুণ কমে যায়!
 *
 * ২. Redis Transactions (MULTI / EXEC):
 * - একাধিক কমান্ডকে একটি সিঙ্গেল অ্যাটমিক ব্লকে রান করা।
 * - উদাহরণ: ওয়ালেট ট্রান্সফার (ইউজার ১ এর ব্যালেন্স থেকে -১০০ টাকা, এবং ইউজার ২ এর ব্যালেন্সে +১০০ টাকা)।
 * - মাঝপথে কোনো এরর না হলে দুটি কাজই শতভাগ নিশ্চয়তার সাথে ঘটবে।
 */
export declare const PipelineBatchDemoController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const AtomicWalletTransferController: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=batch-redis.d.ts.map