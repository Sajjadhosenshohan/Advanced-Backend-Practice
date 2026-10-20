import type { Request, Response } from "express";
declare const runPipelineDemo: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const executeWalletTransfer: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const BatchController: {
    runPipelineDemo: typeof runPipelineDemo;
    executeWalletTransfer: typeof executeWalletTransfer;
};
export {};
//# sourceMappingURL=batch.controller.d.ts.map