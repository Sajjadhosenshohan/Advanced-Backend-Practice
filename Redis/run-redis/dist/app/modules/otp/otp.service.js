import { redis } from "../../../redis/index.js";
/**
 * OTP Service - All Redis interactions for OTP logic
 */
const sendOTP = async (email) => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const TTL_SECONDS = 300; // 5 minutes
    // Redis Command: SET key value EX seconds
    await redis.set(`otp:${email}`, otp, "EX", TTL_SECONDS);
    return {
        email,
        otp,
        expiresInSeconds: TTL_SECONDS,
    };
};
const verifyOTP = async (email, otp) => {
    const key = `otp:${email}`;
    // Redis Commands: GET key, TTL key
    const storedOTP = await redis.get(key);
    const ttl = await redis.ttl(key);
    if (!storedOTP) {
        return {
            isValid: false,
            message: "OTP expired or not found. Please request a new one.",
        };
    }
    if (storedOTP !== otp) {
        return {
            isValid: false,
            message: "Invalid OTP! Please enter the correct OTP.",
            remainingTtlSeconds: ttl,
        };
    }
    // Redis Command: DEL key (One-time use)
    await redis.del(key);
    return {
        isValid: true,
        message: "OTP verified successfully! Account/Action authenticated.",
    };
};
export const OtpService = {
    sendOTP,
    verifyOTP,
};
//# sourceMappingURL=otp.service.js.map