import { redis } from "../../redis/index.js";
/**
 * =========================================================================
 * USE CASE 9: DISTRIBUTED LOCKS (Concurrency Control & Race Condition Prevention)
 * =========================================================================
 * কেন Distributed Lock প্রয়োজন?
 * - ধরা যাক, একটি সিনেমার সিট বা ট্রেনের ১টি মাত্র টিকিট বাকি আছে।
 * - দুইজন ইউজার একই মিলি-সেকেন্ডে "Buy Now" বাটনে ক্লিক করল।
 * - সাধারণ ডাটাবেস কোয়েরিতে দুইজনই দেখবে সিট খালি এবং দুজনের টাকা কেটে টিকিট বুক হয়ে যাবে (Double Booking Bug!)
 * - Distributed Lock দিয়ে যেকোনো একজন আগে লক নিবে, অন্যজন ফেইল করবে বা অপেক্ষা করবে।
 *
 * কীভাবে নিরাপদে লক করবেন?
 * ১. `SET resource_key unique_token NX PX timeout_ms`
 *    - `NX`: Not eXists (শুধুমাত্র কি না থাকলে লক পাবে)
 *    - `PX`: Milliseconds TTL (প্রসেস ক্র্যাশ করলেও লক যেন আজীবন আটকে না থাকে - Deadlock Protection)
 * ২. লক রিলিজ করার সময় Lua Script ব্যবহার করা হয় যাতে নিজের টোকেন ছাড়া অন্যের লক ডিলিট না হয়।
 */
// Lua Script for atomic lock release (শুধুমাত্র যার টোকেন সে-ই আনলক করতে পারবে)
const RELEASE_LOCK_LUA_SCRIPT = `
if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
else
    return 0
end
`;
// ডামি বুকিং স্টোরেজ
const bookedTickets = {};
// POST /api/lock/book-ticket
export const BookTicketWithLockController = async (req, res) => {
    try {
        const { ticketId, userId } = req.body;
        if (!ticketId || !userId) {
            return res.status(400).json({ success: false, message: "ticketId and userId are required" });
        }
        // অলরেডি বুক হয়ে গেছে কিনা চেক
        if (bookedTickets[ticketId]) {
            return res.status(400).json({
                success: false,
                message: `Ticket ${ticketId} is already booked by user ${bookedTickets[ticketId]}!`,
            });
        }
        const lockKey = `lock:ticket:${ticketId}`;
        const lockToken = `user_${userId}_${Date.now()}`;
        const LOCK_TTL_MS = 5000; // ৫ সেকেন্ড পর লক অটো রিলিজ হবে
        // ১. লক নেওয়া চেষ্টা করা (Acquire Lock)
        // Redis Command: SET key token NX PX milliseconds
        const acquired = await redis.set(lockKey, lockToken, "PX", LOCK_TTL_MS, "NX");
        if (!acquired) {
            return res.status(409).json({
                success: false,
                message: `Could not acquire lock! Another booking is in progress for Ticket ${ticketId}. Try again shortly.`,
            });
        }
        try {
            console.log(`🔒 Lock acquired by User ${userId} for Ticket ${ticketId}`);
            // ২. বুকিং ও পেমেন্ট প্রসেসিং সিমুলেশন (Delay 1.5 seconds)
            await new Promise((resolve) => setTimeout(resolve, 1500));
            // টিকিট ফাইনাল বুক করা
            bookedTickets[ticketId] = userId;
            return res.status(200).json({
                success: true,
                message: `Ticket ${ticketId} successfully booked by User ${userId}!`,
                bookingDetails: {
                    ticketId,
                    bookedBy: userId,
                    time: new Date().toISOString(),
                },
            });
        }
        finally {
            // ৩. কাজ শেষ হলে নিরাপদে লক রিলিজ করা (Release Lock via Lua script)
            await redis.eval(RELEASE_LOCK_LUA_SCRIPT, 1, lockKey, lockToken);
            console.log(`🔓 Lock safely released for Ticket ${ticketId}`);
        }
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error booking ticket", error });
    }
};
// GET /api/lock/ticket-status/:ticketId
export const GetTicketStatusController = async (req, res) => {
    try {
        const ticketId = String(req.params.ticketId || "");
        const lockKey = `lock:ticket:${ticketId}`;
        const isLocked = await redis.exists(lockKey);
        const bookedBy = bookedTickets[ticketId] ?? null;
        return res.status(200).json({
            success: true,
            ticketId,
            isCurrentlyLocked: isLocked === 1,
            isBooked: Boolean(bookedBy),
            bookedBy,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error getting ticket status", error });
    }
};
//# sourceMappingURL=distributed-lock-redis.js.map