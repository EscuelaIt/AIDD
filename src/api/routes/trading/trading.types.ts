/**
 * Tipo de operación de trading.
 * @typedef {('buy'|'sell')} TransactionType
 */
export type TransactionType = "buy" | "sell";

/**
 * Solicitud de operación de trading.
 * @typedef {Object} TradeRequest
 * @property {string} portfolioId - ID del portafolio.
 * @property {string} assetSymbol - Símbolo del activo.
 * @property {TransactionType} type - Tipo de operación.
 * @property {number} quantity - Cantidad de activos.
 * @property {number} price - Precio unitario.
 */
export type TradeRequest = {
  portfolioId: string;
  assetSymbol: string;
  type: TransactionType;
  quantity: number;
  price: number;
};

/**
 * Transacción de trading registrada.
 * @typedef {Object} Transaction
 * @property {string} id - ID único de la transacción.
 * @property {string} portfolioId - ID del portafolio.
 * @property {string} assetSymbol - Símbolo del activo.
 * @property {TransactionType} type - Tipo de operación.
 * @property {number} quantity - Cantidad de activos.
 * @property {number} price - Precio unitario.
 * @property {string} timestamp - Fecha y hora ISO.
 */
export type Transaction = {
  id: string;
  portfolioId: string;
  assetSymbol: string;
  type: TransactionType;
  quantity: number;
  price: number;
  timestamp: string;
};

/**
 * Respuesta de una operación de trading.
 * @typedef {Object} TradeResponse
 * @property {Transaction} transaction - Transacción realizada.
 * @property {Object} portfolioUpdated - Estado actualizado del portafolio.
 * @property {string} portfolioUpdated.id - ID del portafolio.
 * @property {number} portfolioUpdated.cashRemaining - Saldo restante.
 * @property {number} portfolioUpdated.totalValue - Valor total del portafolio.
 */
export type TradeResponse = {
  transaction: Transaction;
  portfolioUpdated: {
    id: string;
    cashRemaining: number;
    totalValue: number;
  };
};

/**
 * Activo disponible para trading.
 * @typedef {Object} Asset
 * @property {string} symbol - Símbolo del activo.
 * @property {string} name - Nombre del activo.
 * @property {number} currentPrice - Precio actual.
 */
export type Asset = {
  symbol: string;
  name: string;
  currentPrice: number;
};

/**
 * Portafolio de usuario.
 * @typedef {Object} Portfolio
 * @property {string} id - ID único.
 * @property {string} email - Email del usuario.
 * @property {number} cash - Saldo disponible.
 * @property {string} createdAt - Fecha de creación ISO.
 */
export type Portfolio = {
  id: string;
  email: string;
  cash: number;
  createdAt: string;
  transactions: Transaction[];
};
