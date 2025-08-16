import { getPayloadClient } from "@/lib/get-payload";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

// GET /api/galleries/[id]
// Returns a specific gallery by ID
export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    try {
		const id = params.id;

		const payload = await getPayloadClient();

		if (!payload) {
			return NextResponse.json(
				{ error: "CMS not initialized" },
				{ status: 500 },
			);
		}

		const gallery = await payload.findByID({
			collection: "galleries",
			id,
			depth: 2, // Include media relationships
		});

		if (!gallery) {
			return notFound();
		}

		// Sort the images by order if they exist
		if (gallery.images && Array.isArray(gallery.images)) {
			gallery.images.sort((a, b) => {
				const orderA = typeof a.order === "number" ? a.order : 0;
				const orderB = typeof b.order === "number" ? b.order : 0;
				return orderA - orderB;
			});
		}

		return NextResponse.json({ gallery });
	} catch (error) {
		console.error(`Error fetching gallery with ID ${params.id}:`, error);
		return NextResponse.json(
			{ error: "Error fetching gallery" },
			{ status: 500 },
		);
	}
}
