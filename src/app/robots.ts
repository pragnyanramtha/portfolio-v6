import { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
            },
            {
                userAgent: ["GPTBot", "Claude-Web", "PerplexityBot", "Googlebot", "CCBot"],
                allow: "/",
            }
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
