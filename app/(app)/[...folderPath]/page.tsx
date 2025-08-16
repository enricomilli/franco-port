"use client";

import GalleryComponent, {
	ImageInGallery,
} from "@/components/gallery/gallery-comp";
import FolderComponent from "@/components/landing/folder-comp";
import { Button } from "@/components/ui/button";
import LandingSkeleton from "@/components/ui/loading/landing-loading";
import { getFolderByPath, transformGalleryImages } from "@/lib/api";
import { Folder, Gallery, Media } from "@/payload-types";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DynamicFolderPage() {
	const params = useParams();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [folderData, setFolderData] = useState<Folder | null>(null);
	const [subfolders, setSubfolders] = useState<Folder[]>([]);
	const [gallery, setGallery] = useState<Gallery | null>(null);
	const [galleryImages, setGalleryImages] = useState<ImageInGallery[] | null>(
		null,
	);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				setError(null);

				// Convert the path parameter to a string
				let pathString: string;
				if (Array.isArray(params.folderPath)) {
					pathString = params.folderPath.join("/");
				} else {
					pathString = params.folderPath as string;
				}

				// Fetch folder data from the API
				const data = await getFolderByPath(pathString);

				if (!data || !data.folder) {
					throw new Error(`No data found for path: ${pathString}`);
				}

				setFolderData(data.folder);

				// If the folder has subfolders, set them
				if (data.subfolders && Array.isArray(data.subfolders)) {
					// Sort subfolders by order
					const sortedSubfolders = [...data.subfolders].sort((a, b) => {
						const orderA = typeof a.order === "number" ? a.order : 0;
						const orderB = typeof b.order === "number" ? b.order : 0;
						return orderA - orderB;
					});
					setSubfolders(sortedSubfolders);
				} else {
					setSubfolders([]);
				}

				// If the folder has a gallery, set it
				if (data.gallery) {
					setGallery(data.gallery);
					setGalleryImages(transformGalleryImages(data.gallery as Gallery));
				} else {
					setGallery(null);
					setGalleryImages(null);
				}
			} catch (err) {
				console.error("Error fetching folder data:", err);
				setError("Failed to load content. Please try again later.");
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [params.folderPath]);

	// Transform gallery images to the format expected by GalleryComponent

	return (
		<>
			{loading ? (
				// <div className="flex flex-col items-center justify-center">
				// 	<Loader2 className="size-12 animate-spin text-white" />
				// 	<p className="mt-4 text-white">Loading...</p>
				// </div>
				<LandingSkeleton />
			) : error ? (
				<div className="mx-auto max-w-md rounded-lg bg-red-500/20 p-4 text-center text-white">
					<h2 className="text-xl font-bold">Error</h2>
					<p>{error}</p>
					<button
						onClick={() => window.location.reload()}
						className="mt-4 rounded bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-100"
					>
						Try Again
					</button>
				</div>
			) : (
				<>
					{/* Subfolders */}
					{subfolders && subfolders.length > 0 && (
						<>
							<div className="mb-3 flex flex-row gap-2 items-center text-center">
								<Button
									variant={"outline"}
									size={"sm"}
									className="rounded-full backdrop-blur-2xl cursor-pointer"
									onClick={() => router.back()}
								>
									<ArrowLeft />
								</Button>

								<h1 className="text-2xl font-bold text-primary">
									{folderData?.name}
								</h1>
								<div className="w-2"></div>
							</div>

							<div className="flex flex-row flex-wrap justify-center gap-4">
								{subfolders.map((subfolder) => (
									<FolderComponent
										key={subfolder.id}
										href={`/${subfolder.path}`}
										hoverImgSrc={subfolder.previewImage as Media}
										folderName={subfolder.name || "Unnamed Folder"}
									/>
								))}
							</div>
						</>
					)}

					{/* Gallery */}
					{gallery && galleryImages && galleryImages.length > 0 && (
						<div className="mx-auto w-full max-w-[1200px] p-4">
							<div className="flex flex-row gap-2">
								<Button
									variant={"outline"}
									size={"sm"}
									className="rounded-full backdrop-blur-2xl cursor-pointer"
									onClick={() => router.back()}
								>
									<ArrowLeft />
								</Button>

								{gallery.name && (
									<h2 className="mb-4 text-xl font-semibold text-white">
										{gallery.name}
									</h2>
								)}
							</div>
							{gallery.description && (
								<p className="mb-6 text-white">{gallery.description}</p>
							)}
							{galleryImages?.length > 0 ? (
								<GalleryComponent imageGallery={galleryImages} />
							) : (
								<p className="text-white text-center">
									No images in this gallery.
								</p>
							)}
						</div>
					)}

					{/* Show message if neither subfolders nor gallery */}
					{(!subfolders || subfolders.length === 0) &&
						(!gallery || !galleryImages || galleryImages.length === 0) && (
							<div className="text-center p-8">
								<p className="text-white">
									No content available in this section.
								</p>
								<p className="text-white text-sm mt-2">
									This folder has no subfolders or gallery images.
								</p>
							</div>
						)}
				</>
			)}
		</>
	);
}
