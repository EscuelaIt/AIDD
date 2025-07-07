import type { NextFunction, Request, Response } from "express";
import { getIpFrom, getSourceFrom } from "../shared/request.utils.ts";

/**
 * Middleware to log the request and response
 * @requires request.utils to get the ip and source of the request
 */
export function logMiddleware(
	req: Request,
	_res: Response,
	next: NextFunction,
) {
	const message = `${req.method} ${req.url}`;
	const ip = getIpFrom(req);
	const source = getSourceFrom(req);
	console.log(message, { ip, source });
	next();
}
