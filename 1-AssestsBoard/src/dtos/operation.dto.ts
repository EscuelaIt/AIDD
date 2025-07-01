export interface CreateOperationDto {
  portfolioId: string;
  type: 'buy' | 'sell';
  symbol: string;
  amount: number;
  price: number;
  date: string;
} 