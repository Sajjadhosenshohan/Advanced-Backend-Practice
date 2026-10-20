import { Router } from "express";
import { SetController } from "./set.controller.js";
const router = Router();
router.post("/online-status", SetController.updateOnlineStatus);
router.get("/online-users", SetController.getOnlineUsers);
router.get("/is-online/:userId", SetController.checkUserOnline);
router.post("/interests", SetController.addUserInterests);
router.get("/mutual-interests", SetController.getMutualInterests);
export const SetRoutes = router;
//# sourceMappingURL=set.route.js.map