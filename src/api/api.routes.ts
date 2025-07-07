import type { Application } from "express";
import { healthController } from "./routes/health/health.controller.ts";
import { userRouter } from "./routes/user.router.ts";

export function useApiRoutes(app: Application) {
	app.use("/health", healthController);
	app.use("/users", userRouter);
}
