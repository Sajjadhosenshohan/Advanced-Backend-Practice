import type { Request, Response } from "express";
declare const recordUniqueVisitor: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getUniqueVisitorCount: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const markUserActive: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getUserActiveStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const AnalyticsController: {
    recordUniqueVisitor: typeof recordUniqueVisitor;
    getUniqueVisitorCount: typeof getUniqueVisitorCount;
    markUserActive: typeof markUserActive;
    getUserActiveStatus: typeof getUserActiveStatus;
};
export {};
//# sourceMappingURL=analytics.controller.d.ts.map