import { healthRepository } from "./health.repository.ts";

export function healthLogic() {
	const message = healthRepository();
	return {
		message,
		timestamp: new Date().toISOString(),
	};
}
