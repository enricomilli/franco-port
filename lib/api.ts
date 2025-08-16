// API utility functions for fetching portfolio data

import { Folder, Gallery, Media } from "@/payload-types";

/**
 * Fetches all folders
 */
export async function getAllFolders() {
	try {
		const response = await fetch("/endpoints/folders", {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => ({}));
			throw new Error(
				errorData.error || `Failed to fetch folders: ${response.status}`,
			);
		}

		return response.json();
	} catch (error) {
		console.error("API Error in getAllFolders:", error);
		throw error;
	}
}

/**
 * Fetches a specific folder by its path
 * @param path - The folder path (e.g., "photography" or "photography/abstract")
 */
export async function getFolderByPath(path: string) {
	try {
		const response = await fetch(`/endpoints/folders/${path}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			if (response.status === 404) {
				throw new Error(`Folder not found: ${path}`);
			}
			const errorData = await response.json().catch(() => ({}));
			throw new Error(
				errorData.error ||
					`Failed to fetch folder: ${path} (${response.status})`,
			);
		}

		const data: { folder: Folder; subfolders?: Folder[]; gallery?: Gallery } =
			await response.json();

		return data;
	} catch (error) {
		console.error(`API Error in getFolderByPath(${path}):`, error);
		throw error;
	}
}

/**
 * Fetches a gallery by its ID
 * @param id - The gallery ID
 */
export async function getGalleryById(id: string) {
	try {
		const response = await fetch(`/endpoints/galleries/${id}`, {
			method: "GET",
			headers: { "Content-Type": "application/json" },
		});

		if (!response.ok) {
			if (response.status === 404) {
				throw new Error(`Gallery not found: ${id}`);
			}
			const errorData = await response.json().catch(() => ({}));
			throw new Error(
				errorData.error ||
					`Failed to fetch gallery: ${id} (${response.status})`,
			);
		}

		return response.json();
	} catch (error) {
		console.error(`API Error in getGalleryById(${id}):`, error);
		throw error;
	}
}

/**
 * Transforms gallery images from CMS format to the format expected by the GalleryComponent
 * @param images - The images array from the CMS
 */
export function transformGalleryImages(images: Gallery) {
	console.log("images:", images.images);
	if (!images || !Array.isArray(images.images)) return [];

	return images.images
		.filter((img) => typeof img.image !== "number")
		.map((img, idx) => {
			console.log("image in gallery", img);
			return {
				id: img.id || `img-${Math.random().toString(36).substr(2, 9)}`,
				src: (img.image as Media).url as string,
				alt: img.alt ?? `image-${idx}`,
				caption: img.caption as string | undefined,
			};
		});
}

/**
 * Gets the full URL for a media item
 * @param media - The media object from Payload CMS
 */
export function getMediaUrl(
	media:
		| Media
		| {
				url: string;
				alt?: string;
		  },
): string {
	// Handle null/undefined case
	if (!media) return "";

	// If media is a string, treat it as a URL
	if (typeof media === "string") return media;

	// Handle case where media is an object but doesn't have a URL
	if (!media.url) {
		// Try to extract URL from other common properties
		const possibleUrls = [media.url];
		for (const url of possibleUrls) {
			if (typeof url === "string" && url) return normalizeUrl(url);
		}
		return "";
	}

	return normalizeUrl(media.url);
}

// Helper function to normalize URLs
function normalizeUrl(url: string): string {
	// If the URL already starts with http or //, it's already a full URL
	if (url.startsWith("http") || url.startsWith("//")) {
		return url;
	}

	// Otherwise, ensure it starts with a slash and return
	return url.startsWith("/") ? url : `/${url}`;
}
