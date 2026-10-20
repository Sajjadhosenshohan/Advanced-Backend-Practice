import type { Request, Response } from "express";
declare const pushTaskToQueue: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const popTaskFromQueue: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const addRecentActivity: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getRecentActivities: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const ListController: {
    pushTaskToQueue: typeof pushTaskToQueue;
    popTaskFromQueue: typeof popTaskFromQueue;
    addRecentActivity: typeof addRecentActivity;
    getRecentActivities: typeof getRecentActivities;
};
export {};
//# sourceMappingURL=list.controller.d.ts.map