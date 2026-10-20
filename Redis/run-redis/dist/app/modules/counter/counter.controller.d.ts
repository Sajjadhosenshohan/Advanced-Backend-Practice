import type { Request, Response } from "express";
declare const incrementPageView: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const toggleLike: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getCounterStats: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const CounterController: {
    incrementPageView: typeof incrementPageView;
    toggleLike: typeof toggleLike;
    getCounterStats: typeof getCounterStats;
};
export {};
//# sourceMappingURL=counter.controller.d.ts.map