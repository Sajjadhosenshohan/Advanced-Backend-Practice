import { redis } from "../../../redis/index.js";

/**
 * OTP Service - All Redis interactions for OTP logic
 */
const sendOTP = async (email: string) => {
  const otp = Math.floor(10000 + Math.random() * 90000).toString();
  const ttl_in_sec = 300;

  await redis.set(`otp:${email}`, otp, "EX", ttl_in_sec);

  return {
    email,
    otp,
    expiresInSeconds: ttl_in_sec,
  };
};

const verifyOTP = async (email: string, otp: string) => {
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
