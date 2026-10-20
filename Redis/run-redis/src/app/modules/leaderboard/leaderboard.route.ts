import { Router } from "express";
import { LeaderboardController } from "./leaderboard.controller.js";

const router = Router();

router.post("/submit-score", LeaderboardController.submitScore);
router.post("/increment-score", LeaderboardController.incrementScore);
router.get("/top", LeaderboardController.getTopPlayers);
router.get("/player-rank/:username", LeaderboardController.getPlayerRank);

export const LeaderboardRoutes = router;
