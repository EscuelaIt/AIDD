import { randomUUID } from 'crypto';
import type { Portfolio } from '../types/index.ts';
import { FileUtils } from '../utils/file.utils.ts';

const PORTFOLIOS_FILE = 'portfolios.json';

export class PortfolioRepository {
  static async getAll(): Promise<Portfolio[]> {
    return FileUtils.readJsonFile<Portfolio>(PORTFOLIOS_FILE);
  }

  static async save(portfolio: Omit<Portfolio, 'id'>): Promise<Portfolio> {
    const all = await this.getAll();
    const newPortfolio: Portfolio = { ...portfolio, id: randomUUID() };
    all.push(newPortfolio);
    await FileUtils.writeJsonFile(PORTFOLIOS_FILE, all);
    return newPortfolio;
  }
} 