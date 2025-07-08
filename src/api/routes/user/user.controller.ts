import type { Request, Response } from "express";
import {
  createUserLogic,
  deleteUserLogic,
  getAllUsersLogic,
  getUserLogic,
  updateUserLogic,
} from "./user.logic.ts";

export function postUserController(req: Request, res: Response): void {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        error: "Bad Request",
        message: "Email and password are required",
      });
      return;
    }

    const data = createUserLogic({ email, password });

    res.status(201).json({
      data
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export function getUserController(req: Request, res: Response): void {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        error: "Bad Request",
        message: "User ID is required",
      });
      return;
    }

    const data = getUserLogic({ id });

    res.json({
      data,
      request: {
        method: req.method,
        url: req.originalUrl,
        host: req.hostname,
        port: req.socket.localPort,
      },
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      res.status(404).json({
        error: "Not Found",
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

export function putUserController(req: Request, res: Response): void {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    if (!id) {
      res.status(400).json({
        error: "Bad Request",
        message: "User ID is required",
      });
      return;
    }

    if (!email && !password) {
      res.status(400).json({
        error: "Bad Request",
        message: "At least email or password must be provided",
      });
      return;
    }

    const data = updateUserLogic({ id, email, password });

    res.json({
      data
    });
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      res.status(404).json({
        error: "Not Found",
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

export function deleteUserController(req: Request, res: Response): void {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({
        error: "Bad Request",
        message: "User ID is required",
      });
      return;
    }

    deleteUserLogic({ id });

    res.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      res.status(404).json({
        error: "Not Found",
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

export function getAllUsersController(req: Request, res: Response): void {
  try {
    const data = getAllUsersLogic();

    res.json({
      data,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
