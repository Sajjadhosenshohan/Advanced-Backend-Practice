import type { Request, Response } from "express";
declare const sendOTP: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const verifyOTP: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const OtpController: {
    sendOTP: typeof sendOTP;
    verifyOTP: typeof verifyOTP;
};
export {};
//# sourceMappingURL=otp.controller.d.ts.map