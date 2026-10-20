import type { Request, Response } from "express";
import { LeaderboardService } from "./leaderboard.service.js";

const submitScore = async (req: Request, res: Response) => {
  try {
    const { username, score, leaderboardName } = req.body;

    if (!username || score === undefined) {
      return res.status(400).json({ success: false, message: "username and score are required" });
    }

    const result = await LeaderboardService.submitScore(String(username), Number(score), leaderboardName);

    return res.status(200).json({
      success: true,
      message: `Score updated for ${username}`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error submitting score", error });
  }
};

const incrementScore = async (req: Request, res: Response) => {
  try {
    const { username, points, leaderboardName } = req.body;

    if (!username || points === undefined) {
      return res.status(400).json({ success: false, message: "username and points are required" });
    }

    const result = await LeaderboardService.incrementScore(String(username), Number(points), leaderboardName);

    return res.status(200).json({
      success: true,
      message: `Score incremented by ${points} for ${username}`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error incrementing score", error });
  }
};

const getTopPlayers = async (req: Request, res: Response) => {
  try {
    const { limit, leaderboardName } = req.query;
    const topLimit = limit ? Math.min(Number(limit), 100) : 10;

    const result = await LeaderboardService.getTopPlayers(topLimit, leaderboardName as string);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching top players", error });
  }
};

const getPlayerRank = async (req: Request, res: Response) => {
  try {
    const username = String(req.params.username || "");
    const { leaderboardName } = req.query;

    const result = await LeaderboardService.getPlayerRank(username, leaderboardName as string);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: `Player '${username}' not found in leaderboard`,
      });
    }

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching player rank", error });
  }
};

export const LeaderboardController = {
  submitScore,
  incrementScore,
  getTopPlayers,
  getPlayerRank,
};
