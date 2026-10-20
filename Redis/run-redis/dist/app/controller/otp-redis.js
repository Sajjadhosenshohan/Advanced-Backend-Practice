import { redis } from "../../redis/index.js";
/**
 * =========================================================================
 * USE CASE 1: OTP GENERATION & VERIFICATION (Strings + TTL Expiration)
 * =========================================================================
 * কেন ব্যবহার করব?
 * - OTP খুব কম সময়ের জন্য ভ্যালিড থাকে (যেমন ৫ মিনিট)।
 * - MongoDB বা SQL ডেটাবেসে OTP রাখলে ক্রন জব দিয়ে ডিলিট করতে হয়।
 * - Redis-এ `EX` (Expire in seconds) দিলে নির্দিষ্ট সময় পর স্বয়ংক্রিয়ভাবে মুছে যায়।
 */
// POST /api/otp/send-otp
export const SendOTPController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ success: false, message: "Email is required" });
        }
        // ৪ ডিজিটের র্যান্ডম OTP তৈরি
        const otp = Math.floor(1000 + Math.random() * 9000).toString();
        // Redis Command: SET key value EX seconds
        // otp:user@example.com কি-তে OTP সেভ হবে এবং ৩০০ সেকেন্ড (৫ মিনিট) পর অটো ডিলিট হবে
        const TTL_SECONDS = 300;
        await redis.set(`otp:${email}`, otp, "EX", TTL_SECONDS);
        return res.status(200).json({
            success: true,
            message: `OTP sent successfully. Valid for ${TTL_SECONDS} seconds.`,
            email,
            otp, // ভিডিওতে টেস্ট করার সুবিধার্থে রেসপন্সে পাঠানো হচ্ছে
            expiresInSeconds: TTL_SECONDS,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error sending OTP", error });
    }
};
// POST /api/otp/verify-otp
export const VerifyOTPController = async (req, res) => {
    try {
        const { email, otp } = req.body;
        if (!email || !otp) {
            return res.status(400).json({ success: false, message: "Email and OTP are required" });
        }
        // Redis Command: GET key
        const storedOTP = await redis.get(`otp:${email}`);
        // Redis Command: TTL key (Remaining time to live in seconds)
        const ttl = await redis.ttl(`otp:${email}`);
        // যদি কি না থাকে (অথবা এক্সপায়ার হয়ে যায়)
        if (!storedOTP) {
            return res.status(400).json({
                success: false,
                message: "OTP expired or not found. Please request a new one.",
            });
        }
        // OTP চেক করা
        if (storedOTP !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP! Please enter correct OTP.",
                remainingTtlSeconds: ttl,
            });
        }
        // ওটিপি ভেরিফাই হয়ে গেলে Redis থেকে সাথে সাথে মুছে ফেলা (One-time use)
        // Redis Command: DEL key
        await redis.del(`otp:${email}`);
        return res.status(200).json({
            success: true,
            message: "OTP verified successfully! Account/Action authenticated.",
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error verifying OTP", error });
    }
};
//# sourceMappingURL=otp-redis.js.map