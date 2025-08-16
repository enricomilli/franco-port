"use client";
import { useStaticImage } from "@/lib/useStaticImage";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";

export default function SiteLogo() {
	const { src, alt, isLoading, error } = useStaticImage("Site Logo");

	if (error) {
		return (
			<div className="fixed font-semibold text-xl w-full left-0 right-0 top-10 flex items-center justify-center">
				Gianfranco Milli
			</div>
		);
	}

	return (
		<div className="fixed w-full left-0 right-0 top-10 flex items-center justify-center">
			{isLoading && <Skeleton className="w-20 h-6 rounded-xl" />}
			{!isLoading && <Image src={src} alt={alt} width={200} height={80} />}
		</div>
	);
}
