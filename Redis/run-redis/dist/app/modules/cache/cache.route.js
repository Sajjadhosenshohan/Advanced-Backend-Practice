import { Router } from "express";
import { CacheController } from "./cache.controller.js";
const router = Router();
router.get("/products", CacheController.getProducts);
router.post("/products", CacheController.createProduct);
router.delete("/clear", CacheController.clearCache);
export const CacheRoutes = router;
//# sourceMappingURL=cache.route.js.map