import type { Request, Response } from "express";
import { AnalyticsService } from "./analytics.service.js";

const recordUniqueVisitor = async (req: Request, res: Response) => {
  try {
    const { page, visitorId } = req.body;

    if (!visitorId) {
      return res.status(400).json({ success: false, message: "visitorId is required" });
    }

    const result = await AnalyticsService.recordUniqueVisitor(String(page || "site"), String(visitorId));

    return res.status(200).json({
      success: true,
      message: "Visitor recorded in HyperLogLog",
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error recording HLL visitor", error });
  }
};

const getUniqueVisitorCount = async (req: Request, res: Response) => {
  try {
    const { page } = req.query;
    const result = await AnalyticsService.getUniqueVisitorCount(String(page || "site"));

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error getting HLL count", error });
  }
};

const markUserActive = async (req: Request, res: Response) => {
  try {
    const { userId, date } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "userId (number) is required" });
    }

    const targetDate = String(date || new Date().toISOString().split("T")[0]);
    const result = await AnalyticsService.markUserActive(Number(userId), targetDate);

    return res.status(200).json({
      success: true,
      message: `User ${userId} marked active for date ${targetDate}`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error setting bitmap bit", error });
  }
};

const getUserActiveStatus = async (req: Request, res: Response) => {
  try {
    const { userId, date } = req.query;
    const targetDate = String(date || new Date().toISOString().split("T")[0]);
    const uid = userId ? Number(userId) : null;

    const result = await AnalyticsService.getUserActiveStatus(uid, targetDate);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error checking bitmap status", error });
  }
};

export const AnalyticsController = {
  recordUniqueVisitor,
  getUniqueVisitorCount,
  markUserActive,
  getUserActiveStatus,
};
