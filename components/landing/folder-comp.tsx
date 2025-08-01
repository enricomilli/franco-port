"use client";
import { FolderClosed, FolderOpen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../ui/hover-card";

interface FolderComponentProps {
	folderName: string;
	hoverImgSrc: string;
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
	return (
		<HoverCard openDelay={100} closeDelay={0}>
			<HoverCardTrigger className="w-full h-full" href={href}>
				<Button
					onMouseEnter={() => setImageHovered(true)}
					onMouseLeave={() => setImageHovered(false)}
					variant={"ghost"}
					className="flex flex-col cursor-pointer min-w-22 max-w-30 h-full w-full p-0 "
				>
					{!imageHovered && <FolderClosed className="size-12" />}
					{imageHovered && <FolderOpen className="size-12" />}

					<h2 className="min-w-10 max-w-[80px] text-wrap">{folderName}</h2>
				</Button>
			</HoverCardTrigger>
			<HoverCardContent className="w-fit">
				<Image
					width={300}
					height={300}
					src={hoverImgSrc ?? "https://picsum.photos/400/300"}
					alt={hoverImgAlt ?? "hoverable image popup"}
				/>
			</HoverCardContent>
		</HoverCard>
	);
}
