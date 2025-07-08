import type { Application } from "express";
import { healthController } from "./routes/health/health.controller.ts";
import { userRouter } from "./routes/user/user.router.ts";
import { portfolioRouter } from "./routes/portfolio/portfolio.router.ts";

export function useApiRoutes(app: Application) {
	app.use("/health", healthController);
	app.use("/users", userRouter);
	app.use("/portfolios", portfolioRouter);
}
