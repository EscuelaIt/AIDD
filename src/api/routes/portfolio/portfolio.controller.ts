import type { Request, Response } from "express";
import { createPortfolioLogic } from "./portfolio.logic.ts";

/**
 * Crea un nuevo portafolio.
 * @function
 * @name postPortfolioController
 * @route {POST} /portfolios
 * @param {import('express').Request} req - Request con email y cash en el body.
 * @param {import('express').Response} res - Response con el portafolio creado o error.
 * @returns {Promise<void>}
 * @example
 * // Request body: { email: "user@mail.com", cash: 1000 }
 * // Response: { data: { id, email, cash, createdAt }, request: {...} }
 */
export async function postPortfolioController(req: Request, res: Response): Promise<void> {
  try {
    const { email, cash } = req.body;

    if (!email || cash === undefined) {
      res.status(400).json({
        error: "Bad Request",
        message: "Email and cash are required",
      });
      return;
    }

    if (typeof cash !== "number" || cash < 0) {
      res.status(400).json({
        error: "Bad Request",
        message: "Cash must be a non-negative number",
      });
      return;
    }

    const data = await createPortfolioLogic({ email, cash });

    res.status(201).json({
      data,
      request: {
        method: req.method,
        url: req.originalUrl,
        host: req.hostname,
        port: req.socket.localPort,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}