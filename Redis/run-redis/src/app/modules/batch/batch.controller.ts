import type { Request, Response } from "express";
import { BatchService } from "./batch.service.js";

const runPipelineDemo = async (req: Request, res: Response) => {
  try {
    const { totalItems } = req.body;
    const count = totalItems ? Math.min(Number(totalItems), 1000) : 50;

    const result = await BatchService.runPipelineDemo(count);

    return res.status(200).json({
      success: true,
      message: `Executed ${count} SET commands in a single network round-trip using Redis Pipeline!`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error in pipeline execution", error });
  }
};

const executeWalletTransfer = async (req: Request, res: Response) => {
  try {
    const { fromUser, toUser, amount } = req.body;

    if (!fromUser || !toUser || !amount) {
      return res.status(400).json({
        success: false,
        message: "fromUser, toUser, and amount are required",
      });
    }

    const result = await BatchService.executeWalletTransfer(String(fromUser), String(toUser), Number(amount));

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json({
      success: true,
      message: `Successfully transferred ${amount} credits atomically!`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error executing transaction", error });
  }
};

export const BatchController = {
  runPipelineDemo,
  executeWalletTransfer,
};
