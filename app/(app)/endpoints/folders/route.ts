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
      where: {
        parentFolder: {
          exists: false,
        }
      },
    });

    console.log("folders found:", folders)

    return NextResponse.json(folders);
  } catch (error) {
    console.error("Error fetching folders:", error);
    return NextResponse.json(
      { error: "Error fetching folders" },
      { status: 500 },
    );
  }
}
