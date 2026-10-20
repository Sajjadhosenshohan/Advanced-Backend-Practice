import type { Request, Response } from "express";
import { LockService } from "./lock.service.js";

const bookTicket = async (req: Request, res: Response) => {
  try {
    const { ticketId, userId } = req.body;

    if (!ticketId || !userId) {
      return res.status(400).json({ success: false, message: "ticketId and userId are required" });
    }

    const result = await LockService.bookTicket(String(ticketId), String(userId));

    if (result.status === "ALREADY_BOOKED") {
      return res.status(400).json({ success: false, message: result.message });
    }

    if (result.status === "LOCK_ACQUISITION_FAILED") {
      return res.status(409).json({ success: false, message: result.message });
    }

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error booking ticket", error });
  }
};

const getTicketStatus = async (req: Request, res: Response) => {
  try {
    const ticketId = String(req.params.ticketId || "");
    const result = await LockService.getTicketStatus(ticketId);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error getting ticket status", error });
  }
};

export const LockController = {
  bookTicket,
  getTicketStatus,
};
