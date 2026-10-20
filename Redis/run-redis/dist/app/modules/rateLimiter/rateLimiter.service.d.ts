declare const checkRateLimit: (identifier: string, windowSeconds: number, maxRequests: number, prefix?: string) => Promise<{
    isBlocked: boolean;
    currentRequests: number;
    maxRequests: number;
    windowSeconds: number;
    remainingRequests: number;
    retryAfterSeconds: number;
}>;
export declare const RateLimiterService: {
    checkRateLimit: typeof checkRateLimit;
};
export {};
//# sourceMappingURL=rateLimiter.service.d.ts.map