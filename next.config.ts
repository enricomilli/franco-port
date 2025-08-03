import { withPayload } from "@payloadcms/next/withPayload";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [new URL("https://picsum.photos/**")],
	},
};

export default withPayload(nextConfig);
