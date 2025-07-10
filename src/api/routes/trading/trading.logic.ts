import {
    createTransactionRepository,
    getPortfolioHoldingsRepository,
    getPortfolioRepository,
    updatePortfolioRepository,
} from "./trading.repository.ts";
import type { TradeRequest, TradeResponse } from "./trading.types.ts";

const MINIMUM_CASH_THRESHOLD = 0;

/**
 * Lógica de negocio para comprar un activo.
 * @param {TradeRequest} tradeRequest - Datos de la operación de compra.
 * @returns {Promise<TradeResponse>} Resultado de la operación.
 * @throws {Error} Si los parámetros son inválidos o el portafolio no existe.
 */
export async function buyAssetLogic(
  tradeRequest: TradeRequest
): Promise<TradeResponse> {
  // Early return validation
  if (!tradeRequest.portfolioId) {
    throw new Error("Portfolio ID is required");
  }

  if (!tradeRequest.assetSymbol) {
    throw new Error("Asset symbol is required");
  }

  if (tradeRequest.quantity <= 0) {
    throw new Error("Quantity must be positive");
  }

  if (tradeRequest.price <= 0) {
    throw new Error("Price must be positive");
  }

  if (tradeRequest.type !== "buy") {
    throw new Error("Invalid transaction type for buy operation");
  }

  // Get portfolio data
  const portfolio = await getPortfolioRepository(tradeRequest.portfolioId);
  if (!portfolio) {
    throw new Error(`Portfolio with ID ${tradeRequest.portfolioId} not found`);
  }

  // Calculate transaction total
  const transactionTotal = calculateTransactionTotal(
    tradeRequest.quantity,
    tradeRequest.price
  );

  // Validate sufficient cash
  if (portfolio.cash < transactionTotal) {
    throw new Error(
      `Insufficient cash. Required: ${transactionTotal}, Available: ${portfolio.cash}`
    );
  }

  // Calculate new cash amount
  const updatedCash = portfolio.cash - transactionTotal;

  if (updatedCash < MINIMUM_CASH_THRESHOLD) {
    throw new Error("Transaction would result in negative cash balance");
  }

  // Create transaction record
  const transaction = await createTransactionRepository({
    ...tradeRequest,
    timestamp: new Date().toISOString(),
  });

  // Reload portfolio to include new transaction and update cash
  const portfolioWithTransactions = await getPortfolioRepository(portfolio.id);
  if (!portfolioWithTransactions) {
    throw new Error(`Portfolio ${portfolio.id} no encontrado tras crear transacción`);
  }
  portfolioWithTransactions.cash = updatedCash;
  const updatedPortfolio = await updatePortfolioRepository(
    portfolio.id,
    portfolioWithTransactions
  );

  // Get current holdings for total value calculation
  const holdings = await getPortfolioHoldingsRepository(portfolio.id);
  const totalValue = calculatePortfolioTotalValue(
    updatedPortfolio.cash,
    holdings
  );

  return {
    transaction,
    portfolioUpdated: {
      id: updatedPortfolio.id,
      cashRemaining: updatedPortfolio.cash,
      totalValue,
    },
  };
}

/**
 * Lógica de negocio para vender un activo.
 * @param {TradeRequest} tradeRequest - Datos de la operación de venta.
 * @returns {Promise<TradeResponse>} Resultado de la operación.
 * @throws {Error} Si los parámetros son inválidos o el portafolio no existe.
 */
export async function sellAssetLogic(
  tradeRequest: TradeRequest
): Promise<TradeResponse> {
  // Early return validation
  if (!tradeRequest.portfolioId) {
    throw new Error("Portfolio ID is required");
  }

  if (!tradeRequest.assetSymbol) {
    throw new Error("Asset symbol is required");
  }

  if (tradeRequest.quantity <= 0) {
    throw new Error("Quantity must be positive");
  }

  if (tradeRequest.price <= 0) {
    throw new Error("Price must be positive");
  }

  if (tradeRequest.type !== "sell") {
    throw new Error("Invalid transaction type for sell operation");
  }

  // Get portfolio data
  const portfolio = await getPortfolioRepository(tradeRequest.portfolioId);
  if (!portfolio) {
    throw new Error(`Portfolio with ID ${tradeRequest.portfolioId} not found`);
  }

  // Get current holdings to validate asset availability
  const holdings = await getPortfolioHoldingsRepository(portfolio.id);
  const assetHolding = holdings.find(
    (holding) => holding.symbol === tradeRequest.assetSymbol
  );

  if (!assetHolding || assetHolding.quantity < tradeRequest.quantity) {
    const availableQuantity = assetHolding ? assetHolding.quantity : 0;
    throw new Error(
      `Insufficient assets. Required: ${tradeRequest.quantity}, Available: ${availableQuantity} ${tradeRequest.assetSymbol}`
    );
  }

  // Calculate transaction total
  const transactionTotal = calculateTransactionTotal(
    tradeRequest.quantity,
    tradeRequest.price
  );

  // Calculate new cash amount
  const updatedCash = portfolio.cash + transactionTotal;

  // Create transaction record
  const transaction = await createTransactionRepository({
    ...tradeRequest,
    timestamp: new Date().toISOString(),
  });

  // Update portfolio cash
  const updatedPortfolio = await updatePortfolioRepository(portfolio.id, {
    ...portfolio,
    cash: updatedCash,
  });

  // Get updated holdings for total value calculation
  const updatedHoldings = await getPortfolioHoldingsRepository(portfolio.id);
  const totalValue = calculatePortfolioTotalValue(
    updatedPortfolio.cash,
    updatedHoldings
  );

  return {
    transaction,
    portfolioUpdated: {
      id: updatedPortfolio.id,
      cashRemaining: updatedPortfolio.cash,
      totalValue,
    },
  };
}

function calculateTransactionTotal(quantity: number, price: number): number {
  return quantity * price;
}

function calculatePortfolioTotalValue(
  cash: number,
  holdings: Array<{ symbol: string; quantity: number; averagePrice: number }>
): number {
  const holdingsValue = holdings.reduce((total, holding) => {
    return total + holding.quantity * holding.averagePrice;
  }, 0);

  return cash + holdingsValue;
}
