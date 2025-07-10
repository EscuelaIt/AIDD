export type TransactionType = "buy" | "sell";

export type TradeRequest = {
  portfolioId: string;
  assetSymbol: string;
  type: TransactionType;
  quantity: number;
  price: number;
};

export type Transaction = {
  id: string;
  portfolioId: string;
  assetSymbol: string;
  type: TransactionType;
  quantity: number;
  price: number;
  timestamp: string;
};

export type TradeResponse = {
  transaction: Transaction;
  portfolioUpdated: {
    id: string;
    cashRemaining: number;
    totalValue: number;
  };
};

export type Asset = {
  symbol: string;
  name: string;
  currentPrice: number;
};

export type Portfolio = {
  id: string;
  email: string;
  cash: number;
  createdAt: string;
  transactions: Transaction[];
};
