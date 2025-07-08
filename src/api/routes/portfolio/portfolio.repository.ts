import { promises as fs } from "fs";
import { join } from "path";
import { randomUUID } from "crypto";

export type CreatePortfolioRepositoryParams = {
  email: string;
  cash: number;
};

export type PortfolioData = {
  id: string;
  email: string;
  cash: number;
  createdAt: string;
};

const PORTFOLIOS_DIR = join(process.cwd(), "data", "portfolios");

export async function createPortfolioRepository(params: CreatePortfolioRepositoryParams): Promise<PortfolioData> {
  // Ensure portfolios directory exists
  await ensurePortfoliosDirectory();

  // Generate unique ID and timestamp
  const id = randomUUID();
  const createdAt = new Date().toISOString();

  // Create portfolio data
  const portfolioData: PortfolioData = {
    id,
    email: params.email,
    cash: params.cash,
    createdAt,
  };

  // Save to filesystem
  const filePath = join(PORTFOLIOS_DIR, `${id}.json`);
  await fs.writeFile(filePath, JSON.stringify(portfolioData, null, 2), "utf-8");

  return portfolioData;
}

async function ensurePortfoliosDirectory(): Promise<void> {
  try {
    await fs.mkdir(PORTFOLIOS_DIR, { recursive: true });
  } catch (error) {
    console.error("Error creating portfolios directory:", error);
    throw new Error("Failed to create portfolios directory");
  }
} 