import { Router } from "express";
import { OtpController } from "./otp.controller.js";
const router = Router();
router.post("/send-otp", OtpController.sendOTP);
router.post("/verify-otp", OtpController.verifyOTP);
export const OtpRoutes = router;
//# sourceMappingURL=otp.route.js.map