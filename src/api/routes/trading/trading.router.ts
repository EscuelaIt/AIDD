import { Router } from "express";
import { postBuyController, postSellController } from "./trading.controller.ts";

/**
 * Router para operaciones de trading (compra y venta de activos).
 * @route POST /trading/buy
 * @route POST /trading/sell
 * @see postBuyController, postSellController
 */
export const tradingRouter = Router();

tradingRouter.post("/buy", postBuyController);
tradingRouter.post("/sell", postSellController);
