import { redis } from "../../redis/index.js";
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
// POST /api/batch/pipeline-demo
export const PipelineBatchDemoController = async (req, res) => {
    try {
        const { totalItems } = req.body;
        const count = totalItems ? Math.min(Number(totalItems), 1000) : 50;
        const startTime = Date.now();
        // Redis Pipeline শুরু করা
        const pipeline = redis.pipeline();
        for (let i = 1; i <= count; i++) {
            pipeline.set(`temp:item:${i}`, `value_${i}`, "EX", 120);
        }
        // সব কমান্ড একসাথে পাঠানো ও এক্সিকিউট করা
        const results = await pipeline.exec();
        const duration = Date.now() - startTime;
        return res.status(200).json({
            success: true,
            message: `Executed ${count} SET commands in a single network round-trip using Redis Pipeline!`,
            totalOperations: count,
            timeTakenMs: duration,
            sampleResultStatus: results ? "All succeeded" : "Failed",
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error in pipeline execution", error });
    }
};
// POST /api/batch/wallet-transfer (Atomic Transaction using MULTI/EXEC)
export const AtomicWalletTransferController = async (req, res) => {
    try {
        const { fromUser, toUser, amount } = req.body;
        if (!fromUser || !toUser || !amount) {
            return res.status(400).json({
                success: false,
                message: "fromUser, toUser, and amount are required",
            });
        }
        const transferAmount = Number(amount);
        const fromKey = `wallet:user:${fromUser}`;
        const toKey = `wallet:user:${toUser}`;
        // প্রাথমিক ব্যালেন্স নিশ্চিত করা (না থাকলে ১০০ টাকা করে ইনিশিয়াল ক্রেডিট)
        const senderBal = await redis.get(fromKey);
        if (senderBal === null) {
            await redis.set(fromKey, 500); // 500 initial demo balance
        }
        const receiverBal = await redis.get(toKey);
        if (receiverBal === null) {
            await redis.set(toKey, 100); // 100 initial demo balance
        }
        const currentSenderBal = Number(await redis.get(fromKey));
        if (currentSenderBal < transferAmount) {
            return res.status(400).json({
                success: false,
                message: `Insufficient balance! Current balance: ${currentSenderBal}, required: ${transferAmount}`,
            });
        }
        // Redis Transaction (MULTI ... EXEC)
        // MULTI কমান্ডের পর সব কমান্ড কিউতে জমা থাকে, EXEC কল করলে অ্যাটমিকালি রান হয়
        const transaction = redis.multi();
        transaction.decrby(fromKey, transferAmount);
        transaction.incrby(toKey, transferAmount);
        const execResults = await transaction.exec();
        const newSenderBal = await redis.get(fromKey);
        const newReceiverBal = await redis.get(toKey);
        return res.status(200).json({
            success: true,
            message: `Successfully transferred ${transferAmount} credits from ${fromUser} to ${toUser} atomically!`,
            transferAmount,
            sender: { userId: fromUser, newBalance: Number(newSenderBal) },
            receiver: { userId: toUser, newBalance: Number(newReceiverBal) },
            execResults,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error executing transaction", error });
    }
};
//# sourceMappingURL=batch-redis.js.map