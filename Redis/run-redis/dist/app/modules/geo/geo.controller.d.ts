import type { Request, Response } from "express";
declare const addLocation: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getDistance: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const findNearby: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const GeoController: {
    addLocation: typeof addLocation;
    getDistance: typeof getDistance;
    findNearby: typeof findNearby;
};
export {};
//# sourceMappingURL=geo.controller.d.ts.map