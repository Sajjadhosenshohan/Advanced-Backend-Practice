import { Router } from "express";
import { ListController } from "./list.controller.js";

const router = Router();

router.post("/queue/push", ListController.pushTaskToQueue);
router.post("/queue/pop", ListController.popTaskFromQueue);
router.post("/recent-activities", ListController.addRecentActivity);
router.get("/recent-activities/:userId", ListController.getRecentActivities);

export const ListRoutes = router;
