import type { Application } from "express";
import { healthController } from "./routes/health/health.controller.ts";

export function useApiRoutes(app: Application) {
	app.use("/health", healthController);
}
