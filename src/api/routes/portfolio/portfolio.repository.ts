import { randomUUID } from "crypto";
import { promises as fs } from "fs";
import { join } from "path";

/**
 * Parámetros para el repositorio de creación de portafolios.
 * @typedef {Object} CreatePortfolioRepositoryParams
 * @property {string} email - Email del usuario.
 * @property {number} cash - Saldo inicial.
 */
export type CreatePortfolioRepositoryParams = {
  email: string;
  cash: number;
};

/**
 * Datos persistidos de un portafolio.
 * @typedef {Object} PortfolioData
 * @property {string} id - Identificador único.
 * @property {string} email - Email del usuario.
 * @property {number} cash - Saldo disponible.
 * @property {string} createdAt - Fecha de creación ISO.
 */
export type PortfolioData = {
  id: string;
  email: string;
  cash: number;
  createdAt: string;
};

/**
 * Crea y persiste un portafolio en el sistema de archivos.
 * @param {CreatePortfolioRepositoryParams} params - Parámetros de entrada.
 * @returns {Promise<PortfolioData>} Portafolio persistido.
 * @throws {Error} Si ocurre un error de persistencia.
 */
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