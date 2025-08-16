// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Folder } from "./collections/Folder";
import { Gallery } from "./collections/Gallery";
import { Media } from "./collections/Media";
import { StaticImages } from "./collections/StaticImages";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
	admin: {
		user: Users.slug,
		importMap: {
			baseDir: path.resolve(dirname),
		},
	},
	collections: [Users, Media, Folder, Gallery, StaticImages],
	editor: lexicalEditor(),
	secret: process.env.PAYLOAD_SECRET || "",
	typescript: {
		outputFile: path.resolve(dirname, "payload-types.ts"),
	},
	db: vercelPostgresAdapter({
		pool: {
			connectionString: process.env.POSTGRES_URL || "",
		},
	}),
	sharp,
	plugins: [
		payloadCloudPlugin(),
		vercelBlobStorage({
			token: process.env.BLOB_READ_WRITE_TOKEN!,
			enabled: true,
			collections: {
				media: true,
				staticImages: true,
			},
		}),
	],
});
