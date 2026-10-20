import { Router } from "express";
import { BatchController } from "./batch.controller.js";

const router = Router();

router.post("/pipeline-demo", BatchController.runPipelineDemo);
router.post("/wallet-transfer", BatchController.executeWalletTransfer);

export const BatchRoutes = router;
