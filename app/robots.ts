import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://orwood.com/sitemap.xml",
    host: "https://orwood.com",
  };
}
