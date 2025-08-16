import { getPayloadClient } from "@/lib/get-payload";
import { notFound } from "next/navigation";
import { NextResponse } from "next/server";

// GET /api/folders/[path]
// Returns a specific folder by path
export async function GET(
	request: Request,
	props: { params: Promise<{ path: string }> },
) {
	const params = await props.params;
	try {
		let path: string;
		if (Array.isArray(params.path)) {
			path = params.path.join("/");
		} else {
			path = params.path as string;
		}

		const payload = await getPayloadClient();

		if (!payload) {
			return NextResponse.json(
				{ error: "CMS not initialized" },
				{ status: 500 },
			);
		}

		// Fetch folder by path
		const folders = await payload.find({
			collection: "folders",
			where: {
				path: {
					equals: path,
				},
			},
			depth: 2, // Include relationships 2 levels deep
		});

		if (folders.docs.length === 0) {
			return notFound();
		}

		const folder = folders.docs[0];

		// If folder contains subfolders, fetch them
		if (folder.folderType === "folders") {
			const subfolders = await payload.find({
				collection: "folders",
				where: {
					parentFolder: {
						equals: folder.id,
					},
				},
				sort: "order",
				depth: 1,
			});

			return NextResponse.json({
				folder,
				subfolders: subfolders.docs,
			});
		}

		// If folder contains a gallery, fetch it
		if (folder.folderType === "gallery" && folder.gallery) {
			let gallery = folder.gallery;

			if (typeof folder.gallery === "number") {
				gallery = await payload.findByID({
					collection: "galleries",
					id: folder.gallery,
					depth: 2,
				});
			}

			return NextResponse.json({
				folder,
				gallery,
			});
		}

		return NextResponse.json({ folder });
	} catch (error) {
		console.error(`Error fetching folder with path ${params.path}:`, error);
		return NextResponse.json(
			{ error: "Error fetching folder" },
			{ status: 500 },
		);
	}
}
