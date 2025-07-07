import type { Request, Response } from "express";
import { 
  createUserLogic, 
  getUserLogic, 
  updateUserLogic, 
  deleteUserLogic,
  getAllUsersLogic 
} from "./user.logic.ts";

export function createUserController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Bad Request",
        message: "Email and password are required",
      });
    }

    const data = createUserLogic({ email, password });
    
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

export function getUserController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Bad Request",
        message: "User ID is required",
      });
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
      return res.status(404).json({
        error: "Not Found",
        message: error.message,
      });
    }
    
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export function updateUserController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { email, password } = req.body;

    if (!id) {
      return res.status(400).json({
        error: "Bad Request",
        message: "User ID is required",
      });
    }

    if (!email && !password) {
      return res.status(400).json({
        error: "Bad Request",
        message: "At least email or password must be provided",
      });
    }

    const data = updateUserLogic({ id, email, password });
    
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
      return res.status(404).json({
        error: "Not Found",
        message: error.message,
      });
    }
    
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export function deleteUserController(req: Request, res: Response) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: "Bad Request",
        message: "User ID is required",
      });
    }

    deleteUserLogic({ id });
    
    res.status(204).send();
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      return res.status(404).json({
        error: "Not Found",
        message: error.message,
      });
    }
    
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

export function getAllUsersController(req: Request, res: Response) {
  try {
    const data = getAllUsersLogic();
    
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
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
} 