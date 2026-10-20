import type { NextFunction, Request, Response } from "express";
export declare const createRateLimitMiddleware: (options: {
    windowSeconds: number;
    maxRequests: number;
    prefix?: string;
}) => (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
declare const demoRateLimitEndpoint: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const RateLimiterController: {
    demoRateLimitEndpoint: typeof demoRateLimitEndpoint;
};
export {};
//# sourceMappingURL=rateLimiter.controller.d.ts.map