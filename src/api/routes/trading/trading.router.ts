import { Router } from "express";
import { postBuyController, postSellController } from "./trading.controller.ts";

export const tradingRouter = Router();

tradingRouter.post("/buy", postBuyController);
tradingRouter.post("/sell", postSellController);
