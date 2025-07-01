import type { CreatePortfolioDto } from '../dtos/portfolio.dto.ts';
import { PortfolioRepository } from '../repositories/portfolio.repository.ts';
import type { Portfolio } from '../types/index.ts';

export class PortfolioService {
  static async createPortfolio(dto: CreatePortfolioDto): Promise<Portfolio> {
    // Validación básica
    if (!dto.email || typeof dto.email !== 'string' || !dto.email.includes('@')) {
      throw new Error('Invalid email');
    }
    if (typeof dto.cash !== 'number' || dto.cash < 0) {
      throw new Error('Invalid cash amount');
    }
    // Guardar en repositorio
    return PortfolioRepository.save({ email: dto.email, cash: dto.cash });
  }
} 