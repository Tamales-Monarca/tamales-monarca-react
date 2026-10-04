import { site } from "@/lib/site";
import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${site.url}/`,
			changeFrequency: "monthly",
			priority: 1,
		},
	];
}
