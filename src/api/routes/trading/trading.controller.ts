import type { Request, Response } from "express";
import { buyAssetLogic, sellAssetLogic } from "./trading.logic.ts";

/**
 * Realiza una operación de compra de un activo.
 * @function
 * @name postBuyController
 * @route {POST} /trading/buy
 * @param {import('express').Request} req - Request con los datos de la operación.
 * @param {import('express').Response} res - Response con la transacción o error.
 * @returns {Promise<void>}
 * @example
 * // Request body: { portfolioId, assetSymbol, quantity, price, type: "buy" }
 * // Response: { data: { transaction, portfolioUpdated } }
 */
export async function postBuyController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { portfolioId, assetSymbol, quantity, price } = req.body;

    // Validate required fields
    if (
      !portfolioId ||
      !assetSymbol ||
      quantity === undefined ||
      price === undefined
    ) {
      res.status(400).json({
        error: "Bad Request",
        message: "portfolioId, assetSymbol, quantity, and price are required",
      });
      return;
    }

    // Validate data types and ranges
    if (typeof portfolioId !== "string" || portfolioId.trim().length === 0) {
      res.status(400).json({
        error: "Bad Request",
        message: "portfolioId must be a non-empty string",
      });
      return;
    }

    if (typeof assetSymbol !== "string" || assetSymbol.trim().length === 0) {
      res.status(400).json({
        error: "Bad Request",
        message: "assetSymbol must be a non-empty string",
      });
      return;
    }

    if (
      typeof quantity !== "number" ||
      quantity <= 0 ||
      !Number.isInteger(quantity)
    ) {
      res.status(400).json({
        error: "Bad Request",
        message: "quantity must be a positive integer",
      });
      return;
    }

    if (typeof price !== "number" || price <= 0) {
      res.status(400).json({
        error: "Bad Request",
        message: "price must be a positive number",
      });
      return;
    }

    const data = await buyAssetLogic({
      portfolioId: portfolioId.trim(),
      assetSymbol: assetSymbol.trim().toUpperCase(),
      type: "buy",
      quantity,
      price,
    });

    res.status(201).json({
      data,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      res.status(404).json({
        error: "Not Found",
        message: error.message,
      });
      return;
    }

    if (error instanceof Error && error.message.includes("insufficient")) {
      res.status(400).json({
        error: "Bad Request",
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

/**
 * Realiza una operación de venta de un activo.
 * @function
 * @name postSellController
 * @route {POST} /trading/sell
 * @param {import('express').Request} req - Request con los datos de la operación.
 * @param {import('express').Response} res - Response con la transacción o error.
 * @returns {Promise<void>}
 * @example
 * // Request body: { portfolioId, assetSymbol, quantity, price, type: "sell" }
 * // Response: { data: { transaction, portfolioUpdated } }
 */
export async function postSellController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { portfolioId, assetSymbol, quantity, price } = req.body;

    // Validate required fields
    if (
      !portfolioId ||
      !assetSymbol ||
      quantity === undefined ||
      price === undefined
    ) {
      res.status(400).json({
        error: "Bad Request",
        message: "portfolioId, assetSymbol, quantity, and price are required",
      });
      return;
    }

    // Validate data types and ranges
    if (typeof portfolioId !== "string" || portfolioId.trim().length === 0) {
      res.status(400).json({
        error: "Bad Request",
        message: "portfolioId must be a non-empty string",
      });
      return;
    }

    if (typeof assetSymbol !== "string" || assetSymbol.trim().length === 0) {
      res.status(400).json({
        error: "Bad Request",
        message: "assetSymbol must be a non-empty string",
      });
      return;
    }

    if (
      typeof quantity !== "number" ||
      quantity <= 0 ||
      !Number.isInteger(quantity)
    ) {
      res.status(400).json({
        error: "Bad Request",
        message: "quantity must be a positive integer",
      });
      return;
    }

    if (typeof price !== "number" || price <= 0) {
      res.status(400).json({
        error: "Bad Request",
        message: "price must be a positive number",
      });
      return;
    }

    const data = await sellAssetLogic({
      portfolioId: portfolioId.trim(),
      assetSymbol: assetSymbol.trim().toUpperCase(),
      type: "sell",
      quantity,
      price,
    });

    res.status(201).json({
      data,
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      res.status(404).json({
        error: "Not Found",
        message: error.message,
      });
      return;
    }

    if (error instanceof Error && error.message.includes("insufficient")) {
      res.status(400).json({
        error: "Bad Request",
        message: error.message,
      });
      return;
    }

    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
