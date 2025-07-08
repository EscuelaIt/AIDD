import express from "express";
import { logMiddleware } from "./middleware/log.middleware.ts";
import { useApiRoutes } from "./api.routes.ts";

export type ApiConfig = {
  port: number;
};

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