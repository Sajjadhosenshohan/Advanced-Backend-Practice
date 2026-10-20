import type { Request, Response } from "express";
import { CacheService } from "./cache.service.js";

const getProducts = async (req: Request, res: Response) => {
  try {
    const result = await CacheService.getProducts();
    return res.status(200).json({
      success: true,
      source: result.source,
      responseTime: result.responseTime,
      totalProducts: result.products.length,
      data: result.products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error fetching products", error });
  }
};

const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, category } = req.body;

    if (!name || !price) {
      return res.status(400).json({ success: false, message: "Name and price are required" });
    }

    const product = await CacheService.createProduct({ name, price, category });

    return res.status(201).json({
      success: true,
      message: "New product created and Redis cache invalidated successfully!",
      product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error creating product", error });
  }
};

const clearCache = async (req: Request, res: Response) => {
  try {
    const { key } = req.query;
    const result = await CacheService.clearCache(key as string);

    return res.status(200).json({
      success: true,
      message: `Cache key '${result.targetKey}' cleared successfully`,
      keysDeleted: result.deletedCount,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Error clearing cache", error });
  }
};

export const CacheController = {
  getProducts,
  createProduct,
  clearCache,
};
