import express from "express";
import { useApiRoutes } from "./api.routes.ts";
import { logMiddleware } from "./middleware/log.middleware.ts";

/**
 * Configuración de la API principal.
 * @typedef {Object} ApiConfig
 * @property {number} port - Puerto en el que se inicia el servidor.
 */
export type ApiConfig = {
  port: number;
};

/**
 * Inicializa el servidor Express, configura middlewares y registra rutas.
 * @param {ApiConfig} config - Configuración de la API.
 * @returns {void}
 * @example
 * bootstrap({ port: 3000 });
 */
export function bootstrap(config: ApiConfig) {
  const app = express();
  
  // Middleware for parsing JSON bodies
  app.use(express.json());
  
  app.use(logMiddleware);
	useApiRoutes(app);
  app.listen(config.port, () => {
    console.log("Server is running, check the health endpoint:");
		console.log(`http://localhost:${config.port}/health`);
  });
}