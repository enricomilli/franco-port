import { ImageGallery } from "react-image-grid-gallery";

export type imageInGallery = {
	id: string;
	alt: string;
	caption: string;
	src: string;
};

interface GalleryComponentProps {
	imageGallery: imageInGallery[];
}

export default function GalleryComponent({
	imageGallery,
}: GalleryComponentProps) {
	return <ImageGallery imagesInfoArray={imageGallery} />;
}
