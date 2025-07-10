import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import { join } from "path";
import type { Portfolio, TradeRequest, Transaction } from "./trading.types.ts";
const PORTFOLIOS_DATA_PATH = join(process.cwd(), "data", "portfolios");

/**
 * Crea y persiste una transacción de trading en el portafolio correspondiente.
 * @param {TradeRequest & { timestamp: string }} tradeData - Datos de la transacción.
 * @returns {Promise<Transaction>} Transacción creada y persistida.
 * @throws {Error} Si ocurre un error de persistencia.
 */
export async function createTransactionRepository(
  tradeData: TradeRequest & { timestamp: string }
): Promise<Transaction> {
  const transaction: Transaction = {
    id: randomUUID(),
    portfolioId: tradeData.portfolioId,
    assetSymbol: tradeData.assetSymbol,
    type: tradeData.type,
    quantity: tradeData.quantity,
    price: tradeData.price,
    timestamp: tradeData.timestamp,
  };

  try {
    await ensureDirectoryExists(PORTFOLIOS_DATA_PATH);
    const portfolioFilePath = join(
      PORTFOLIOS_DATA_PATH,
      `${transaction.portfolioId}.json`
    );
    const portfolioData = await fs.readFile(portfolioFilePath, "utf-8");
    const portfolio = JSON.parse(portfolioData) as Portfolio;
    portfolio.transactions = portfolio.transactions || [];
    portfolio.transactions.push(transaction);
    await fs.writeFile(
      portfolioFilePath,
      JSON.stringify(portfolio, null, 2)
    );

    return transaction;
  } catch (error) {
    throw new Error(
      `Failed to create transaction: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function getPortfolioRepository(
  portfolioId: string
): Promise<Portfolio | null> {
  try {
    const portfolioFilePath = join(PORTFOLIOS_DATA_PATH, `${portfolioId}.json`);
    const portfolioData = await fs.readFile(portfolioFilePath, "utf-8");
    const portfolio = JSON.parse(portfolioData) as Portfolio;
    portfolio.transactions = portfolio.transactions || [];
    return portfolio;
  } catch (error) {
    if (error instanceof Error && error.message.includes("ENOENT")) {
      return null;
    }
    throw new Error(
      `Failed to read portfolio: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function updatePortfolioRepository(
  portfolioId: string,
  portfolioData: Portfolio
): Promise<Portfolio> {
  try {
    const portfolioFilePath = join(PORTFOLIOS_DATA_PATH, `${portfolioId}.json`);
    await fs.writeFile(
      portfolioFilePath,
      JSON.stringify(portfolioData, null, 2)
    );
    return portfolioData;
  } catch (error) {
    throw new Error(
      `Failed to update portfolio: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function getPortfolioHoldingsRepository(
  portfolioId: string
): Promise<Array<{ symbol: string; quantity: number; averagePrice: number }>> {
  try {
    const portfolio = await getPortfolioRepository(portfolioId);
    if (!portfolio) return [];
    const portfolioTransactions = portfolio.transactions;

    // Calculate holdings by symbol
    const holdingsMap = new Map<
      string,
      { totalQuantity: number; totalCost: number; transactions: Transaction[] }
    >();

    for (const transaction of portfolioTransactions) {
      const symbol = transaction.assetSymbol;
      const existing = holdingsMap.get(symbol) || {
        totalQuantity: 0,
        totalCost: 0,
        transactions: [],
      };

      if (transaction.type === "buy") {
        existing.totalQuantity += transaction.quantity;
        existing.totalCost += transaction.quantity * transaction.price;
      } else if (transaction.type === "sell") {
        existing.totalQuantity -= transaction.quantity;
        // For sell transactions, reduce cost proportionally
        const sellCost = transaction.quantity * transaction.price;
        const avgCostPerUnit =
          existing.totalCost / (existing.totalQuantity + transaction.quantity);
        existing.totalCost -= transaction.quantity * avgCostPerUnit;
      }

      existing.transactions.push(transaction);
      holdingsMap.set(symbol, existing);
    }

    // Convert to array and filter out zero holdings
    const holdings = Array.from(holdingsMap.entries())
      .filter(([, data]) => data.totalQuantity > 0)
      .map(([symbol, data]) => ({
        symbol,
        quantity: data.totalQuantity,
        averagePrice:
          data.totalQuantity > 0 ? data.totalCost / data.totalQuantity : 0,
      }));

    return holdings;
  } catch (error) {
    if (error instanceof Error && error.message.includes("ENOENT")) {
      return []; // No transactions directory or no transactions
    }
    throw new Error(
      `Failed to read portfolio holdings: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function getTransactionsByPortfolioRepository(
  portfolioId: string
): Promise<Transaction[]> {
  try {
    const portfolio = await getPortfolioRepository(portfolioId);
    if (!portfolio) return [];
    const portfolioTransactions = portfolio.transactions;

    // Sort by timestamp (newest first)
    return portfolioTransactions.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    if (error instanceof Error && error.message.includes("ENOENT")) {
      return []; // No transactions directory
    }
    throw new Error(
      `Failed to read transactions: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

async function ensureDirectoryExists(dirPath: string): Promise<void> {
  try {
    await fs.access(dirPath);
  } catch (error) {
    if (error instanceof Error && error.message.includes("ENOENT")) {
      await fs.mkdir(dirPath, { recursive: true });
    } else {
      throw error;
    }
  }
}
