import { Router } from "express";
import { postPortfolioController } from "./portfolio.controller.ts";

const portfolioRouter = Router();

portfolioRouter.post("/", postPortfolioController);

export { portfolioRouter }; 