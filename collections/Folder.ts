import type { CollectionConfig } from "payload";

export const Folder: CollectionConfig = {
	slug: "folders",
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
			label: "Folder Name",
		},
		{
			name: "path",
			type: "text",
			required: true,
			label: "URL Path",
			unique: true,
			admin: {
				description:
					"The URL path for this folder (e.g., 'photography' or 'photography/abstract')",
			},
		},
		{
			name: "previewImage",
			type: "upload",
			relationTo: "media",
			required: true,
			label: "Preview Image",
			admin: {
				description: "Image shown when hovering over this folder",
			},
		},
		{
			name: "parentFolder",
			type: "relationship",
			relationTo: "folders",
			hasMany: false,
			label: "Parent Folder",
			admin: {
				description: "Leave empty if this is a top-level folder",
			},
		},
		{
			name: "folderType",
			type: "radio",
			options: [
				{
					label: "Contains Subfolders",
					value: "folders",
				},
				{
					label: "Contains Gallery",
					value: "gallery",
				},
			],
			defaultValue: "folders",
			required: true,
		},
		{
			name: "gallery",
			type: "relationship",
			relationTo: "galleries",
			hasMany: false,
			admin: {
				description:
					"Select a gallery to display (only needed if folder type is 'Contains Gallery')",
				condition: (data) => data?.folderType === "gallery",
			},
		},

		{
			name: "order",
			type: "number",
			defaultValue: 0,
			admin: {
				description:
					"Determines the order of display (lower numbers appear first)",
			},
		},
	],
};
