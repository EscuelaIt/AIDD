import type { Request, Response } from "express";
import { healthLogic } from "./health.logic.ts";

export function healthController(req: Request, res: Response) {
	const data = healthLogic();
	res.json({
		data,
		request: {
			method: req.method,
			url: req.originalUrl,
			host: req.hostname,
			port: req.socket.localPort,
		},
	});
}
