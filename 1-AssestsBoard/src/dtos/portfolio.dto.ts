export interface CreatePortfolioDto {
  email: string;
  cash: number;
}

export interface PortfolioResponseDto {
  id: string;
  email: string;
  cash: number;
  assets: Array<{
    symbol: string;
    amount: number;
    price: number;
  }>;
} 