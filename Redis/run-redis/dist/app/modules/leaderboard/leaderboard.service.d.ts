declare const submitScore: (username: string, score: number, leaderboardName?: string) => Promise<{
    key: string;
    username: string;
    score: number;
    currentRank: number | null;
}>;
declare const incrementScore: (username: string, points: number, leaderboardName?: string) => Promise<{
    key: string;
    username: string;
    newScore: number;
    currentRank: number | null;
}>;
declare const getTopPlayers: (limit: number, leaderboardName?: string) => Promise<{
    key: string;
    totalReturned: number;
    topPlayers: {
        rank: number;
        username: string;
        score: number;
    }[];
}>;
declare const getPlayerRank: (username: string, leaderboardName?: string) => Promise<{
    key: string;
    username: string;
    score: number;
    rank: number;
} | null>;
export declare const LeaderboardService: {
    submitScore: typeof submitScore;
    incrementScore: typeof incrementScore;
    getTopPlayers: typeof getTopPlayers;
    getPlayerRank: typeof getPlayerRank;
};
export {};
//# sourceMappingURL=leaderboard.service.d.ts.map