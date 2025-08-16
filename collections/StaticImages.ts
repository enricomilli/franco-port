import { CollectionConfig } from "payload";

export const StaticImages: CollectionConfig = {
	slug: "staticImages",
	admin: {
		useAsTitle: "name",
		group: "Site Settings",
		description: "Manage static images like backgrounds and logos",
	},
	access: {
		read: () => true,
	},
	upload: {
		staticDir: "../public/static",
		mimeTypes: [
			"image/png",
			"image/jpeg",
			"image/jpg",
			"image/svg+xml",
			"image/gif",
			"image/webp",
		],
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			label: "Image Name",
			admin: {
				description:
					"A descriptive name for this image (e.g., 'Main Background', 'Site Logo')",
			},
		},
		{
			name: "alt",
			type: "text",
			required: true,
			label: "Alt Text",
			admin: {
				description: "Alternative text for accessibility",
			},
		},
	],
	timestamps: true,
};
