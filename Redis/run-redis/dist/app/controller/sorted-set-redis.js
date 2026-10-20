import { redis } from "../../redis/index.js";
/**
 * =========================================================================
 * USE CASE 7: REDIS SORTED SETS / ZSET (Leaderboards & Rankings)
 * =========================================================================
 * কেন Sorted Set (ZSET) ব্যবহার করব?
 * - প্রতিটি মেম্বারের সাথে একটি `score` যুক্ত থাকে।
 * - স্কোর অনুযায়ী ডেটা স্বয়ংক্রিয়ভাবে সাজানো (Sorted) থাকে O(log N) কমপ্লেক্সিটিতে।
 * - ১০ লক্ষ ইউজারের মধ্যেও তাৎক্ষণিকভাবে "Top 10 Player" এবং "ইউজারের র‍্যাংক কত"
 *   বের করা যায়।
 *
 * রিয়েল-ওয়ার্ল্ড উদাহরণ:
 * ১. গেমিং / কুইজ লিডারবোর্ড (Top 10 Players with Scores)
 * ২. ট্রেন্ডিং হ্যাশট্যাগ / সার্চ কি-ওয়ার্ডস
 * ৩. প্রায়োরিটি কিউ (Priority Queue)
 */
// POST /api/leaderboard/submit-score (Add or update player score)
export const SubmitScoreController = async (req, res) => {
    try {
        const { username, score, leaderboardName } = req.body;
        if (!username || score === undefined) {
            return res.status(400).json({ success: false, message: "username and score are required" });
        }
        const key = `leaderboard:${leaderboardName || "global"}`;
        // Redis Command: ZADD key score member
        // যদি মেম্বার আগে থেকে থাকে তবে স্কোর আপডেট হবে, না থাকলে নতুন যুক্ত হবে
        await redis.zadd(key, Number(score), username);
        // ইউজারের বর্তমান র‍্যাংক বের করা (০-ইন্ডেক্সড, তাই ১ যোগ করব)
        // Redis Command: ZREVRANK key member (Highest score = Rank 1)
        const rank = await redis.zrevrank(key, username);
        return res.status(200).json({
            success: true,
            message: `Score updated for ${username}`,
            leaderboard: key,
            username,
            score: Number(score),
            currentRank: rank !== null ? rank + 1 : null,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error submitting score", error });
    }
};
// POST /api/leaderboard/increment-score (Increment score e.g. player gained +50 points)
export const IncrementScoreController = async (req, res) => {
    try {
        const { username, points, leaderboardName } = req.body;
        if (!username || points === undefined) {
            return res.status(400).json({ success: false, message: "username and points are required" });
        }
        const key = `leaderboard:${leaderboardName || "global"}`;
        // Redis Command: ZINCRBY key increment member
        const newScore = await redis.zincrby(key, Number(points), username);
        const rank = await redis.zrevrank(key, username);
        return res.status(200).json({
            success: true,
            message: `Score incremented by ${points} for ${username}`,
            username,
            newScore: Number(newScore),
            currentRank: rank !== null ? rank + 1 : null,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error incrementing score", error });
    }
};
// GET /api/leaderboard/top (Get top N players)
export const GetTopPlayersController = async (req, res) => {
    try {
        const { limit, leaderboardName } = req.query;
        const topLimit = limit ? Math.min(Number(limit), 100) : 10;
        const key = `leaderboard:${leaderboardName || "global"}`;
        // Redis Command: ZREVRANGE key start stop WITHSCORES
        // 0 থেকে (topLimit - 1) পর্যন্ত রিভার্স অর্ডারে (হাইয়েস্ট স্কোর আগে) আনবে
        const results = await redis.zrevrange(key, 0, topLimit - 1, "WITHSCORES");
        // ioredis ফলাফল দেয় এভাবে: [ "player1", "1000", "player2", "950" ]
        // আমরা একে সুন্দর অ্যারে অব অবজেক্টসে রূপান্তর করব
        const leaderboard = [];
        for (let i = 0; i < results.length; i += 2) {
            const username = results[i];
            const score = results[i + 1];
            if (username !== undefined && score !== undefined) {
                leaderboard.push({
                    rank: Math.floor(i / 2) + 1,
                    username,
                    score: Number(score),
                });
            }
        }
        return res.status(200).json({
            success: true,
            leaderboard: key,
            totalReturned: leaderboard.length,
            topPlayers: leaderboard,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching top players", error });
    }
};
// GET /api/leaderboard/player-rank/:username
export const GetPlayerRankController = async (req, res) => {
    try {
        const username = String(req.params.username || "");
        const { leaderboardName } = req.query;
        const key = `leaderboard:${leaderboardName || "global"}`;
        // Redis Command: ZSCORE key member
        const score = await redis.zscore(key, username);
        // Redis Command: ZREVRANK key member
        const rank = await redis.zrevrank(key, username);
        if (score === null || rank === null) {
            return res.status(404).json({
                success: false,
                message: `Player '${username}' not found in leaderboard`,
            });
        }
        return res.status(200).json({
            success: true,
            username,
            score: Number(score),
            rank: rank + 1,
        });
    }
    catch (error) {
        return res.status(500).json({ success: false, message: "Error fetching player rank", error });
    }
};
//# sourceMappingURL=sorted-set-redis.js.map