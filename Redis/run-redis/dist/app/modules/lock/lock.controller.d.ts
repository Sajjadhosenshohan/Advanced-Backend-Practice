import type { Request, Response } from "express";
declare const bookTicket: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getTicketStatus: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const LockController: {
    bookTicket: typeof bookTicket;
    getTicketStatus: typeof getTicketStatus;
};
export {};
//# sourceMappingURL=lock.controller.d.ts.map