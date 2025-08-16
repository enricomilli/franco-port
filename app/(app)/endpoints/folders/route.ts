import { getPayloadClient } from "@/lib/get-payload";
import { NextResponse } from "next/server";

// GET /api/folders
// Returns all folders
export async function GET() {
	try {
		const payload = await getPayloadClient();

		if (!payload) {
			return NextResponse.json(
				{ error: "CMS not initialized" },
				{ status: 500 },
			);
		}

		const folders = await payload.find({
			collection: "folders",
			depth: 2, // Include relationships 2 levels deep
		});

		return NextResponse.json(folders);
	} catch (error) {
		console.error("Error fetching folders:", error);
		return NextResponse.json(
			{ error: "Error fetching folders" },
			{ status: 500 },
		);
	}
}
