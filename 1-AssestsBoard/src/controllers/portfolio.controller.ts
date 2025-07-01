import type { Request, Response } from 'express';
import { PortfolioService } from '../services/portfolio.service.ts';

export class PortfolioController {
  // TODO: Implement portfolio endpoints

  static async createPortfolio(req: Request, res: Response) {
    try {
      const portfolio = await PortfolioService.createPortfolio(req.body);
      res.status(201).json(portfolio);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
} 