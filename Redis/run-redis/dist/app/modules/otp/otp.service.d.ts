/**
 * OTP Service - All Redis interactions for OTP logic
 */
declare const sendOTP: (email: string) => Promise<{
    email: string;
    otp: string;
    expiresInSeconds: number;
}>;
declare const verifyOTP: (email: string, otp: string) => Promise<{
    isValid: boolean;
    message: string;
    remainingTtlSeconds?: never;
} | {
    isValid: boolean;
    message: string;
    remainingTtlSeconds: number;
}>;
export declare const OtpService: {
    sendOTP: typeof sendOTP;
    verifyOTP: typeof verifyOTP;
};
export {};
//# sourceMappingURL=otp.service.d.ts.map