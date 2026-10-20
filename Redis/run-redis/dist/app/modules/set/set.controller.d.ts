import type { Request, Response } from "express";
declare const updateOnlineStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getOnlineUsers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const checkUserOnline: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const addUserInterests: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getMutualInterests: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const SetController: {
    updateOnlineStatus: typeof updateOnlineStatus;
    getOnlineUsers: typeof getOnlineUsers;
    checkUserOnline: typeof checkUserOnline;
    addUserInterests: typeof addUserInterests;
    getMutualInterests: typeof getMutualInterests;
};
export {};
//# sourceMappingURL=set.controller.d.ts.map