import type { Request, Response } from "express";
declare const publishMessage: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getReceivedMessages: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const PubSubController: {
    publishMessage: typeof publishMessage;
    getReceivedMessages: typeof getReceivedMessages;
};
export {};
//# sourceMappingURL=pubsub.controller.d.ts.map