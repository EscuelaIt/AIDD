export interface Portfolio {
  id: string;
  email: string;
  cash: number;
}

export interface Asset {
  symbol: string;
  amount: number;
  price: number;
}

export interface Operation {
  id: string;
  portfolioId: string;
  type: 'buy' | 'sell';
  symbol: string;
  amount: number;
  price: number;
  date: string;
}

export interface PortfolioState extends Portfolio {
  assets: Asset[];
} 