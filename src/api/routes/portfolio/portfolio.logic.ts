import { createPortfolioRepository as defaultCreatePortfolioRepository } from "./portfolio.repository.ts";

export type CreatePortfolioParams = {
  email: string;
  cash: number;
};

export type Portfolio = {
  id: string;
  email: string;
  cash: number;
  createdAt: string;
};

// Mutable repository reference for injection
let createRepo = defaultCreatePortfolioRepository;

/**
 * Override the default repository function (for testing purposes)
 */
export function overrideCreatePortfolioRepository(fn: typeof defaultCreatePortfolioRepository): void {
  createRepo = fn;
}

/**
 * Reset the repository function to default implementation
 */
export function resetCreatePortfolioRepository(): void {
  createRepo = defaultCreatePortfolioRepository;
}

export async function createPortfolioLogic(params: CreatePortfolioParams): Promise<Portfolio> {
  // Early return for validation
  if (!params.email || params.email.trim().length === 0) {
    throw new Error("Email is required and cannot be empty");
  }

  if (typeof params.cash !== "number" || params.cash < 0) {
    throw new Error("Cash must be a non-negative number");
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(params.email)) {
    throw new Error("Invalid email format");
  }

  // Call repository (injected or default)
  const result = await createRepo(params);

  // Transform and return business data
  return {
    id: result.id,
    email: result.email,
    cash: result.cash,
    createdAt: result.createdAt,
  };
}