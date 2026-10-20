import { Router } from "express";
import { CounterController } from "./counter.controller.js";

const router = Router();

router.post("/page-view", CounterController.incrementPageView);
router.post("/like", CounterController.toggleLike);
router.get("/stats", CounterController.getCounterStats);

export const CounterRoutes = router;
