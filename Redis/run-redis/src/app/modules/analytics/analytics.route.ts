import { Router } from "express";
import { AnalyticsController } from "./analytics.controller.js";

const router = Router();

router.post("/hll/visit", AnalyticsController.recordUniqueVisitor);
router.get("/hll/count", AnalyticsController.getUniqueVisitorCount);
router.post("/bitmap/active", AnalyticsController.markUserActive);
router.get("/bitmap/status", AnalyticsController.getUserActiveStatus);

export const AnalyticsRoutes = router;
