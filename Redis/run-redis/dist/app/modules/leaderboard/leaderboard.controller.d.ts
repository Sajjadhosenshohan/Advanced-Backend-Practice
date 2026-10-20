import type { Request, Response } from "express";
declare const submitScore: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const incrementScore: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getTopPlayers: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
declare const getPlayerRank: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const LeaderboardController: {
    submitScore: typeof submitScore;
    incrementScore: typeof incrementScore;
    getTopPlayers: typeof getTopPlayers;
    getPlayerRank: typeof getPlayerRank;
};
export {};
//# sourceMappingURL=leaderboard.controller.d.ts.map