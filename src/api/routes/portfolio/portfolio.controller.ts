import type { Request, Response } from "express";
import { createPortfolioLogic } from "./portfolio.logic.ts";

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