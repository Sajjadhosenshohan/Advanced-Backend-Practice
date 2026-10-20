import type { Request, Response } from "express";
declare const saveUserProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getUserProfile: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const addToCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const HashController: {
    saveUserProfile: typeof saveUserProfile;
    getUserProfile: typeof getUserProfile;
    addToCart: typeof addToCart;
    getCart: typeof getCart;
};
export {};
//# sourceMappingURL=hash.controller.d.ts.map