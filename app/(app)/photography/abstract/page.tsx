"use client";
import GalleryComponent, {
	imageInGallery,
} from "@/components/gallery/gallery-comp";
//  id: string;
// 	alt: string;
// 	caption: string;
// 	src: string;
const abstractImages: imageInGallery[] = [
	{
		id: (Math.random() * 10000).toString(),
		alt: "Fallen Angel",
		caption: "Fallen Angel In Miami",
		src: "/photography/abstract/fallen-angel-1.jpg",
	},
	{
		id: (Math.random() * 10000).toString(),
		alt: "",
		caption: "",
		src: "/photography/abstract/goodbye-1.jpg",
	},
	{
		id: (Math.random() * 10000).toString(),
		alt: "",
		caption: "",
		src: "/photography/abstract/helicopter-1.JPG",
	},
	{
		id: (Math.random() * 10000).toString(),
		alt: "",
		caption: "",
		src: "/photography/abstract/light-beam-1.jpg",
	},
	{
		id: (Math.random() * 10000).toString(),
		alt: "",
		caption: "",
		src: "/photography/abstract/london-1.jpg",
	},
	{
		id: (Math.random() * 10000).toString(),
		alt: "",
		caption: "",
		src: "/photography/abstract/mcclaren-1.jpg",
	},
	{
		id: (Math.random() * 10000).toString(),
		alt: "",
		caption: "",
		src: "/photography/abstract/miami-2.jpg",
	},
	{
		id: (Math.random() * 10000).toString(),
		alt: "",
		caption: "",
		src: "/photography/abstract/miami-3.jpg",
	},
	{
		id: (Math.random() * 10000).toString(),
		alt: "",
		caption: "",
		src: "/photography/abstract/oxford-1.jpg",
	},
	{
		id: (Math.random() * 10000).toString(),
		alt: "",
		caption: "",
		src: "/photography/abstract/palm-tree-1.jpg",
	},
	{
		id: (Math.random() * 10000).toString(),
		alt: "",
		caption: "",
		src: "/photography/abstract/paris-1.jpg",
	},
	{
		id: (Math.random() * 10000).toString(),
		alt: "",
		caption: "",
		src: "/photography/abstract/signature-1.jpg",
	},
	{
		id: (Math.random() * 10000).toString(),
		alt: "",
		caption: "",
		src: "/photography/abstract/venus-1.jpg",
	},
	{
		id: (Math.random() * 10000).toString(),
		alt: "",
		caption: "",
		src: "/photography/abstract/woosh-1.jpg",
	},
];

export default function AbstractPage() {
	return <GalleryComponent imageGallery={abstractImages} />;
}
