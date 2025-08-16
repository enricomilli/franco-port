import { getPayload, Payload } from "payload";
import config from "../payload.config";

// Create a singleton instance of Payload
// This ensures we don't re-initialize Payload on every API call
let cachedPayload: Payload | null;

export async function initPayload() {
	if (!cachedPayload) {
		if (process.env.PAYLOAD_SECRET) {
			cachedPayload = await getPayload({
				// Pass any initialization options as needed
				config,
			});
		}
	}

	return cachedPayload;
}

// Helper function to get the Payload instance
export async function getPayloadClient() {
	return initPayload();
}
