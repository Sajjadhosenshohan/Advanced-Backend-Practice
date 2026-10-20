import { Router } from "express";
import { HashController } from "./hash.controller.js";
const router = Router();
router.post("/user-profile", HashController.saveUserProfile);
router.get("/user-profile/:userId", HashController.getUserProfile);
router.post("/cart/add", HashController.addToCart);
router.get("/cart/:userId", HashController.getCart);
export const HashRoutes = router;
//# sourceMappingURL=hash.route.js.map