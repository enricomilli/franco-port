"use client";

import { useStaticImage } from "@/lib/useStaticImage";
import clsx from "clsx";
import { useEffect, useState } from "react";

interface DynamicBackgroundProps {
	imageName?: string; // If provided, use this specific image
	defaultUrl?: string; // Fallback URL if the CMS image is not found
	className?: string;
	children?: React.ReactNode;
	overlay?: boolean; // Add a dark overlay for better content visibility
	overlayOpacity?: number; // 0 to 100
}

export default function DynamicBackground({
	imageName,
	defaultUrl = "/tron-image-2.png",
	className,
	children,
	overlay = false,
	overlayOpacity = 40,
}: DynamicBackgroundProps) {
	// If a specific image name is provided, use it
	const specificImage = useStaticImage(imageName || "", {
		defaultSrc: defaultUrl,
		skipFetch: !imageName, // Don't fetch if no name provided
	});

	// Otherwise, get all background images
	// const { images, isLoading } = useStaticImagesByCategory("background", true);

	// State to hold the current background
	const [background, setBackground] = useState<string>(defaultUrl);
	const [alt, setAlt] = useState<string>("Background image");

	useEffect(() => {
		// If using a specific image and it's loaded, use it
		if (imageName && specificImage.src) {
			setBackground(specificImage.src);
			setAlt(specificImage.alt);
			return;
		}

		// Otherwise, if we have background images from the category, use the first one
		// if (!imageName && images.length > 0) {
		// 	setBackground(images[0].url);
		// 	setAlt(images[0].alt || "Background image");
		// }
	}, [specificImage.src, specificImage.alt, imageName]);

	return (
		<div
			className={clsx(
				"relative w-full h-full bg-cover bg-center bg-no-repeat",
				className,
			)}
			style={{
				backgroundImage: `url("${background}")`,
				backgroundSize: "cover", // This ensures the image covers the entire area
			}}
			aria-label={alt}
		>
			{/* Optional overlay for better content visibility */}
			{overlay && (
				<div
					className="absolute inset-0 bg-black z-0"
					style={{ opacity: overlayOpacity / 100 }}
				/>
			)}

			{/* Content container */}
			<div className="relative z-10">{children}</div>
		</div>
	);
}
