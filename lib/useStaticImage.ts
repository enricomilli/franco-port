// useStaticImage.ts - Hook for using static images from the CMS
import { useEffect, useState } from "react";

// Global cache to store fetched images and avoid duplicate requests
const staticImageCache: Record<
	string,
	{
		src: string;
		alt: string;
		timestamp: number;
	}
> = {};

// Cache expiration time in milliseconds (30 minutes)
const CACHE_EXPIRATION = 30 * 60 * 1000;

type StaticImageOptions = {
	defaultSrc?: string;
	category?: string;
	skipFetch?: boolean;
};

type StaticImageResult = {
	src: string;
	alt: string;
	isLoading: boolean;
	error: string | null;
};

/**
 * Hook to fetch and use static images from the CMS
 * @param imageName - The name of the image to fetch
 * @param options - Optional configuration
 * @returns Object with image data and loading state
 */
export function useStaticImage(
	imageName: string,
	options: StaticImageOptions = {},
): StaticImageResult {
	const { defaultSrc = "", skipFetch = false } = options;

	const [imageData, setImageData] = useState<StaticImageResult>({
		src: defaultSrc,
		alt: imageName,
		isLoading: !skipFetch,
		error: null,
	});

	useEffect(() => {
		if (skipFetch) return;

		// Check if we have a valid cached version of this image
		const cachedImage = staticImageCache[imageName];
		const now = Date.now();
		if (cachedImage && now - cachedImage.timestamp < CACHE_EXPIRATION) {
			// Use cached image data
			setImageData({
				src: cachedImage.src,
				alt: cachedImage.alt,
				isLoading: false,
				error: null,
			});
			return;
		}

		const fetchImage = async () => {
			try {
				setImageData((prev) => ({ ...prev, isLoading: true, error: null }));

				const response = await fetch(
					`/endpoints/static-images/${encodeURIComponent(imageName)}`,
				);

				if (!response.ok) {
					if (response.status === 404) {
						throw new Error(`Image "${imageName}" not found`);
					}
					throw new Error(`Failed to fetch image: ${response.status}`);
				}

				const data = await response.json();

				if (!data || !data.image || !data.image.url) {
					throw new Error("Invalid image data received");
				}

				const imageData = {
					src: data.image.url,
					alt: data.image.alt || imageName,
					isLoading: false,
					error: null,
				};

				// Update the component state
				setImageData(imageData);

				// Store in cache
				staticImageCache[imageName] = {
					src: data.image.url,
					alt: data.image.alt || imageName,
					timestamp: Date.now(),
				};
			} catch (error) {
				console.error(`Error loading static image "${imageName}":`, error);
				setImageData((prev) => ({
					...prev,
					isLoading: false,
					error: error instanceof Error ? error.message : "Unknown error",
				}));
			}
		};

		fetchImage();
	}, [imageName, skipFetch]);

	return imageData;
}

// Function to manually clear the cache if needed
export function clearStaticImageCache(specificKey?: string) {
	if (specificKey) {
		delete staticImageCache[specificKey];
	} else {
		// Clear all entries
		Object.keys(staticImageCache).forEach((key) => {
			delete staticImageCache[key];
		});
	}
}
