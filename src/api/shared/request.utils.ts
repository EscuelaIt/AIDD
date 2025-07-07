import type { Request } from "express";

export function getIpFrom(req: Request): string {
	const forwardedFor = req.headers["x-forwarded-for"] as string;
	if (!forwardedFor) {
		return "127.0.0.1";
	}
	if (Array.isArray(forwardedFor)) {
		return forwardedFor[0];
	}
	return forwardedFor;
}

export function getSourceFrom(req: Request): string {
	const source = req.headers["user-agent"] as string;
	if (!source) {
		return "unknown source";
	}
	return source;
}
