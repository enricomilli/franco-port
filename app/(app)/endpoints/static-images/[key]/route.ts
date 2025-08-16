import { getPayloadClient } from "@/lib/get-payload";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

// GET /api/static-images/[key]
// Returns a specific static image by key
export async function GET(
	request: Request,
	props: { params: Promise<{ key: string }> },
) {
	const params = await props.params;
	try {
		const key = params.key;
		const payload = await getPayloadClient();

		if (!payload) {
			return NextResponse.json(
				{ error: "CMS not initialized" },
				{ status: 500 },
			);
		}

		// Find the static image by name
		const images = await payload.find({
			collection: "staticImages",
			where: {
				name: {
					equals: key,
				},
			},
			limit: 1,
		});

		if (images.docs.length === 0) {
			return notFound();
		}

		return NextResponse.json({ image: images.docs[0] });
	} catch (error) {
		console.error(`Error fetching static image with key ${params.key}:`, error);
		return NextResponse.json(
			{ error: "Error fetching static image" },
			{ status: 500 },
		);
	}
}
