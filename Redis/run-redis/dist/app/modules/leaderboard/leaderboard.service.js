import { redis } from "../../../redis/index.js";
const submitScore = async (username, score, leaderboardName) => {
    const key = `leaderboard:${leaderboardName || "global"}`;
    // Redis Command: ZADD key score member
    await redis.zadd(key, score, username);
    // Redis Command: ZREVRANK key member (Highest score = Rank 0)
    const rank = await redis.zrevrank(key, username);
    return {
        key,
        username,
        score,
        currentRank: rank !== null ? rank + 1 : null,
    };
};
const incrementScore = async (username, points, leaderboardName) => {
    const key = `leaderboard:${leaderboardName || "global"}`;
    // Redis Command: ZINCRBY key increment member
    const newScore = await redis.zincrby(key, points, username);
    const rank = await redis.zrevrank(key, username);
    return {
        key,
        username,
        newScore: Number(newScore),
        currentRank: rank !== null ? rank + 1 : null,
    };
};
const getTopPlayers = async (limit, leaderboardName) => {
    const key = `leaderboard:${leaderboardName || "global"}`;
    // Redis Command: ZREVRANGE key 0 (limit - 1) WITHSCORES
    const results = await redis.zrevrange(key, 0, limit - 1, "WITHSCORES");
    const topPlayers = [];
    for (let i = 0; i < results.length; i += 2) {
        const user = results[i];
        const score = results[i + 1];
        if (user !== undefined && score !== undefined) {
            topPlayers.push({
                rank: Math.floor(i / 2) + 1,
                username: user,
                score: Number(score),
            });
        }
    }
    return { key, totalReturned: topPlayers.length, topPlayers };
};
const getPlayerRank = async (username, leaderboardName) => {
    const key = `leaderboard:${leaderboardName || "global"}`;
    // Redis Commands: ZSCORE, ZREVRANK
    const score = await redis.zscore(key, username);
    const rank = await redis.zrevrank(key, username);
    if (score === null || rank === null) {
        return null;
    }
    return {
        key,
        username,
        score: Number(score),
        rank: rank + 1,
    };
};
export const LeaderboardService = {
    submitScore,
    incrementScore,
    getTopPlayers,
    getPlayerRank,
};
//# sourceMappingURL=leaderboard.service.js.map