import { Router } from "express";
import { LockController } from "./lock.controller.js";

const router = Router();

router.post("/book-ticket", LockController.bookTicket);
router.get("/ticket-status/:ticketId", LockController.getTicketStatus);

export const LockRoutes = router;
