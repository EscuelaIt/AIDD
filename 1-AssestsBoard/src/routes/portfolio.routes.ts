import { Router } from 'express';
import { PortfolioController } from '../controllers/portfolio.controller.ts';

const router = Router();

// TODO: Add portfolio routes

router.post('/', PortfolioController.createPortfolio);

export { router as portfolioRoutes };

