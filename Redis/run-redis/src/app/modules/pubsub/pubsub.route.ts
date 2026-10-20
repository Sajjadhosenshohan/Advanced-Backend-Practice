import { Router } from "express";
import { PubSubController } from "./pubsub.controller.js";

const router = Router();

router.post("/publish", PubSubController.publishMessage);
router.get("/messages", PubSubController.getReceivedMessages);

export const PubSubRoutes = router;
