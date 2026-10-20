import { Router } from "express";
import { GeoController } from "./geo.controller.js";

const router = Router();

router.post("/add-location", GeoController.addLocation);
router.get("/distance", GeoController.getDistance);
router.get("/nearby", GeoController.findNearby);

export const GeoRoutes = router;
