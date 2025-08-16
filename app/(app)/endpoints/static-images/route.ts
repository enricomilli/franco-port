import { getPayloadClient } from "@/lib/get-payload";
import { NextResponse } from "next/server";

// GET /api/static-images
// Returns all static images or filtered by category
export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const category = searchParams.get("category");
		const isActive = searchParams.get("active") !== "false"; // Default to active images

		const payload = await getPayloadClient();

		if (!payload) {
			return NextResponse.json(
				{ error: "CMS not initialized" },
				{ status: 500 },
			);
		}

		// @ts-nocheck
		const query: Record<
			string,
			string | number | Record<string, { equals: string | boolean }>
		> = {
			collection: "staticImages",
			depth: 1,
		};

		// Build where clause
		const whereConditions: Record<string, { equals: string | boolean }> = {};

		if (category) {
			whereConditions.category = {
				equals: category,
			};
		}

		// Filter by active status (if specified)
		whereConditions.isActive = {
			equals: isActive,
		};

		// Add where clause if conditions exist
		if (Object.keys(whereConditions).length > 0) {
			query.where = whereConditions;
		}

		// Sort by priority (higher numbers first)
		query.sort = "-priority";

		// @ts-expect-error cannot find type
		const images = await payload.find(query);

		return NextResponse.json(images);
	} catch (error) {
		console.error("Error fetching static images:", error);
		return NextResponse.json(
			{ error: "Error fetching static images" },
			{ status: 500 },
		);
	}
}

// // GET /api/static-images/[key]
// // Get a specific static image by name/key
// export async function getImageByKey(key: string) {
// 	try {
// 		const payload = await getPayloadClient();

// 		if (!payload) {
// 			throw new Error("CMS not initialized");
// 		}

// 		const images = await payload.find({
// 			collection: "staticImages",
// 			where: {
// 				name: {
// 					equals: key,
// 				},
// 				isActive: {
// 					equals: true,
// 				},
// 			},
// 			limit: 1,
// 		});

// 		if (images.docs.length === 0) {
// 			return null;
// 		}

// 		return images.docs[0];
// 	} catch (error) {
// 		console.error(`Error fetching static image with key ${key}:`, error);
// 		return null;
// 	}
// }
