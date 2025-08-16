import { ImageGallery } from "react-image-grid-gallery";

export type ImageInGallery = {
	id: string;
	alt: string;
	caption?: string;
	src: string;
};

interface GalleryComponentProps {
	imageGallery: ImageInGallery[];
}

export default function GalleryComponent({
	imageGallery,
}: GalleryComponentProps) {
	return <ImageGallery imagesInfoArray={imageGallery} />;
}
