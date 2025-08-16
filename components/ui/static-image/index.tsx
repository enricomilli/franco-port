"use client";

import { useStaticImage } from "@/lib/useStaticImage";
import Image from "next/image";

interface StaticImageProps {
	imageName: string;
	alt?: string;
	width?: number;
	height?: number;
	priority?: boolean;
	fallbackSrc?: string;
	className?: string;
	fill?: boolean;
}

export default function StaticImage({
	imageName,
	alt,
	width,
	height,
	priority = false,
	fallbackSrc = "",
	className = "",
	fill = false,
}: StaticImageProps) {
	const {
		src,
		alt: fetchedAlt,
		isLoading,
		error,
	} = useStaticImage(imageName, {
		defaultSrc: fallbackSrc,
	});

	// Maintain aspect ratio if only one dimension is provided
	const imageProps = {
		src: src || fallbackSrc,
		alt: alt || fetchedAlt || imageName,
		className: `${isLoading ? "animate-pulse" : ""} ${className}`,
		priority,
	};

	if (fill) {
		return (
			<div className="relative h-full w-full">
				<Image
					{...imageProps}
					alt={imageProps.alt}
					fill
					style={{ objectFit: "cover" }}
					sizes="100vw"
				/>
				{error && !src && !fallbackSrc && (
					<div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-sm text-gray-500">
						{error}
					</div>
				)}
			</div>
		);
	}

	return (
		<>
			<Image
				{...imageProps}
				width={width || 0}
				height={height || 0}
				sizes={`${width ? width + "px" : "100vw"}`}
				alt={alt ?? `alt-${Math.random().toString(36).substr(2, 9)}`}
			/>
			{error && !src && !fallbackSrc && (
				<div className="text-xs text-red-500">{error}</div>
			)}
		</>
	);
}
