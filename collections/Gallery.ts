import type { CollectionConfig } from "payload";

export const Gallery: CollectionConfig = {
	slug: "galleries",
	admin: {
		useAsTitle: "name",
		group: "Portfolio Content",
	},
	access: {
		read: () => true,
	},
	fields: [
		{
			name: "name",
			type: "text",
			required: true,
			label: "Gallery Name",
		},
		{
			name: "description",
			type: "textarea",
			label: "Gallery Description",
		},
		{
			name: "images",
			type: "array",
			required: true,
			label: "Gallery Images",
			minRows: 1,
			admin: {
				description: "Add images to this gallery",
			},
			fields: [
				{
					name: "image",
					type: "upload",
					relationTo: "media",
					required: true,
				},
				{
					name: "caption",
					type: "text",
					label: "Caption",
				},
				{
					name: "alt",
					type: "text",
					label: "Alt Text",
					admin: {
						description: "Important for accessibility and SEO",
					},
				},
				{
					name: "featured",
					type: "checkbox",
					label: "Featured Image",
					defaultValue: false,
				},
				{
					name: "order",
					type: "number",
					defaultValue: 0,
					admin: {
						description: "Lower numbers appear first",
					},
				},
			],
		},
		{
			name: "layout",
			type: "select",
			options: [
				{
					label: "Grid",
					value: "grid",
				},
				{
					label: "Masonry",
					value: "masonry",
				},
				{
					label: "Carousel",
					value: "carousel",
				},
			],
			defaultValue: "grid",
			required: true,
		},
	],
};
