import { Router } from "express";
import { postPortfolioController } from "./portfolio.controller.ts";

/**
 * Router para la gestión de portafolios.
 * @route POST /portfolios
 * @see postPortfolioController
 */
const portfolioRouter = Router();

portfolioRouter.post("/", postPortfolioController);

export { portfolioRouter };
