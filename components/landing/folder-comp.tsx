"use client";
import { getMediaUrl } from "@/lib/api";
import { useStaticImage } from "@/lib/useStaticImage";
import { Media } from "@/payload-types";
import { FolderClosed, FolderOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../ui/hover-card";

interface FolderComponentProps {
	folderName: string;
	hoverImgSrc: string | Media;
	href: string;
	hoverImgAlt?: string;
}
export default function FolderComponent({
	folderName,
	hoverImgSrc,
	hoverImgAlt,
	href,
}: FolderComponentProps) {
	const [imageHovered, setImageHovered] = useState(false);

	// Get folder icons from static images - only fetch the one we need based on hover state
	const folderIcon = useStaticImage("Closed Folder Icon", {
		skipFetch: false, // Skip fetch when we're showing the open icon
	});

	const folderOpenIcon = useStaticImage("Opened Folder Icon", {
		skipFetch: false, // Skip fetch when we're showing the closed icon
	});

	return (
		<Link href={href}>
			<HoverCard openDelay={100} closeDelay={0}>
				<HoverCardTrigger
					asChild
					role="div"
					href={undefined}
					className="w-full h-full"
				>
					<Button
						onMouseEnter={() => setImageHovered(true)}
						onMouseLeave={() => setImageHovered(false)}
						variant={"ghost"}
						className="flex flex-col cursor-pointer min-w-22 max-w-32 min-h-24 h-full w-full p-0 "
					>
						{!imageHovered &&
							(folderIcon.src ? (
								<Image
									src={folderIcon.src}
									alt="Folder"
									width={60}
									height={60}
									className="object-contain stroke-primary [&>svg]:stroke-primary"
								/>
							) : (
								<FolderClosed className="size-12" />
							))}
						{imageHovered &&
							(folderOpenIcon.src ? (
								<Image
									src={folderOpenIcon.src}
									alt="Open Folder"
									width={60}
									height={60}
									className="object-contain [&>svg]:stroke-primary"
								/>
							) : (
								<FolderOpen className="size-12" />
							))}

						<h2 className="min-w-10 max-w-[80px] text-wrap">{folderName}</h2>
					</Button>
				</HoverCardTrigger>
				<HoverCardContent className="w-fit">
					<Image
						width={200}
						height={200}
						src={
							typeof hoverImgSrc === "string"
								? hoverImgSrc
								: getMediaUrl(hoverImgSrc) || "https://picsum.photos/400/300"
						}
						alt={hoverImgAlt ?? "hoverable image popup"}
					/>
				</HoverCardContent>
			</HoverCard>
		</Link>
	);
}
