import type { Payload } from "payload";
import { getPayload } from "payload";
import config from "../payload.config";

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const cached: {
	client: Payload | null;
	promise: Promise<Payload> | null;
	// @ts-expect-error global cache errors
} = global.payload || {
	client: null,
	promise: null,
};

// Handle server shutdown gracefully
if (process.env.NODE_ENV === "development") {
	process.on("SIGTERM", () => {
		console.log("Server is shutting down");
	});

	process.on("SIGINT", () => {
		console.log("Server is shutting down");
	});
}

export const getPayloadClient = async (): Promise<Payload> => {
	if (cached.client) {
		return cached.client;
	}

	if (!cached.promise) {
		const creatingPayload = getPayload({
			config,
		});

		// Handle errors during initialization
		cached.promise = creatingPayload.catch((err) => {
			console.error("Error initializing Payload:", err);
			cached.promise = null;
			throw err;
		});
	}

	try {
		cached.client = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.client;
};

// In development, clean up the global variable when the module is hot reloaded
if (process.env.NODE_ENV === "development") {
	// @ts-expect-error global cache errors
	global.payload = cached;
}
