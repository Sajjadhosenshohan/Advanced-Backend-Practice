declare const runPipelineDemo: (totalItems: number) => Promise<{
    totalOperations: number;
    timeTakenMs: number;
    sampleResultStatus: string;
}>;
declare const executeWalletTransfer: (fromUser: string, toUser: string, amount: number) => Promise<{
    success: boolean;
    message: string;
    transferAmount?: never;
    sender?: never;
    receiver?: never;
    execResults?: never;
} | {
    message?: never;
    success: boolean;
    transferAmount: number;
    sender: {
        userId: string;
        newBalance: number;
    };
    receiver: {
        userId: string;
        newBalance: number;
    };
    execResults: [error: Error | null, result: unknown][] | null;
}>;
export declare const BatchService: {
    runPipelineDemo: typeof runPipelineDemo;
    executeWalletTransfer: typeof executeWalletTransfer;
};
export {};
//# sourceMappingURL=batch.service.d.ts.map