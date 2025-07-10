import type { Application } from "express";
import { healthController } from "./routes/health/health.controller.ts";
import { portfolioRouter } from "./routes/portfolio/portfolio.router.ts";
import { tradingRouter } from "./routes/trading/trading.router.ts";
import { userRouter } from "./routes/user/user.router.ts";

/**
 * Registra los routers de las funcionalidades principales en la aplicación Express.
 * @param {import('express').Application} app - Instancia de Express.
 * @returns {void}
 */
export function useApiRoutes(app: Application) {
  app.use("/health", healthController);
  app.use("/users", userRouter);
  app.use("/portfolios", portfolioRouter);
  app.use("/trading", tradingRouter);
}
