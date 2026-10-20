import type { Request, Response } from "express";
import { GeoService } from "./geo.service.js";

const addLocation = async (req: Request, res: Response) => {
  try {
    const { riderId, longitude, latitude } = req.body;

    if (!riderId || longitude === undefined || latitude === undefined) {
      return res.status(400).json({
        success: false,
        message: "riderId, longitude, and latitude are required",
      });
    }

    const result = await GeoService.addLocation(String(riderId), Number(longitude), Number(latitude));

    return res.status(200).json({
      success: true,
      message: `Location saved for rider ${riderId}`,
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error adding geo location", error });
  }
};

const getDistance = async (req: Request, res: Response) => {
  try {
    const { rider1, rider2, unit } = req.query;

    if (!rider1 || !rider2) {
      return res.status(400).json({
        success: false,
        message: "Query params 'rider1' and 'rider2' are required (e.g. ?rider1=101&rider2=102)",
      });
    }

    const result = await GeoService.getDistance(
      String(rider1),
      String(rider2),
      (unit as string) || "km"
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "One or both riders not found in geospatial index",
      });
    }

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error calculating distance", error });
  }
};

const findNearby = async (req: Request, res: Response) => {
  try {
    const { longitude, latitude, radiusKm } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({
        success: false,
        message: "Query params 'longitude' and 'latitude' are required",
      });
    }

    const radius = radiusKm ? Number(radiusKm) : 5;
    const result = await GeoService.findNearby(Number(longitude), Number(latitude), radius);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error searching nearby riders", error });
  }
};

export const GeoController = {
  addLocation,
  getDistance,
  findNearby,
};
