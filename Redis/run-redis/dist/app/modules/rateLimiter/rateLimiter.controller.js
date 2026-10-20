import { RateLimiterService } from "./rateLimiter.service.js";
// Reusable Middleware
export const createRateLimitMiddleware = (options) => {
    return async (req, res, next) => {
        try {
            const clientIp = req.ip || req.socket.remoteAddress || "127.0.0.1";
            const result = await RateLimiterService.checkRateLimit(clientIp, options.windowSeconds, options.maxRequests, options.prefix);
            res.setHeader("X-RateLimit-Limit", result.maxRequests);
            res.setHeader("X-RateLimit-Remaining", result.remainingRequests);
            res.setHeader("X-RateLimit-Reset", result.retryAfterSeconds);
            if (result.isBlocked) {
                return res.status(429).json({
                    success: false,
                    message: `Too many requests! Maximum ${result.maxRequests} requests per ${result.windowSeconds}s allowed.`,
                    retryAfterSeconds: result.retryAfterSeconds,
                });
            }
            return next();
        }
        catch (error) {
            console.error("Rate limit middleware error:", error);
            return next();
        }
    };
};
const demoRateLimitEndpoint = async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Request allowed! You are within the rate limit threshold.",
        timestamp: new Date().toISOString(),
    });
};
export const RateLimiterController = {
    demoRateLimitEndpoint,
};
//# sourceMappingURL=rateLimiter.controller.js.map