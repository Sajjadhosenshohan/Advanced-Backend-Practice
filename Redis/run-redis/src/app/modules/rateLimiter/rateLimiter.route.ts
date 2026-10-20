import { Router } from "express";
import {
  RateLimiterController,
  createRateLimitMiddleware,
} from "./rateLimiter.controller.js";

const router = Router();

// Limit 5 requests per 30 seconds
router.get(
  "/test",
  createRateLimitMiddleware({ windowSeconds: 30, maxRequests: 5, prefix: "rl:demo" }),
  RateLimiterController.demoRateLimitEndpoint
);

export const RateLimiterRoutes = router;
