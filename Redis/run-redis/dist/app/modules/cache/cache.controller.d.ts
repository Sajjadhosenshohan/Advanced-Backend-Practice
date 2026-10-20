import type { Request, Response } from "express";
declare const getProducts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const createProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const clearCache: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const CacheController: {
    getProducts: typeof getProducts;
    createProduct: typeof createProduct;
    clearCache: typeof clearCache;
};
export {};
//# sourceMappingURL=cache.controller.d.ts.map