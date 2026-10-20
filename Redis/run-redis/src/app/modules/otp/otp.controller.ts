import type { Request, Response } from "express";
import { OtpService } from "./otp.service.js";

const sendOTP = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const result = await OtpService.sendOTP(email);

    return res.status(200).json({
      success: true,
      message: `OTP sent successfully. Valid for ${result.expiresInSeconds} seconds.`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error sending OTP", error });
  }
};

const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: "Email and OTP are required" });
    }

    const result = await OtpService.verifyOTP(email, otp);

    if (!result.isValid) {
      return res.status(400).json({ success: false, ...result });
    }

    return res.status(200).json({ success: true, ...result });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error verifying OTP", error });
  }
};

export const OtpController = {
  sendOTP,
  verifyOTP,
};
