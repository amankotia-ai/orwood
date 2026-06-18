import type { MetadataRoute } from "next";
import { projects, sectors, journal } from "@/lib/content";

const base = "https://orwood.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/projects",
    "/services",
    "/industries",
    "/manufacturing",
    "/process",
    "/global-presence",
    "/journal",
    "/resources",
    "/careers",
    "/about",
    "/contact",
    "/sitemap",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/projects/${p.id}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  const industryRoutes: MetadataRoute.Sitemap = sectors.map((s) => ({
    url: `${base}/industries/${s.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const journalRoutes: MetadataRoute.Sitemap = journal.map((a) => ({
    url: `${base}/journal/${a.id}`,
    lastModified: now,
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...projectRoutes,
    ...industryRoutes,
    ...journalRoutes,
  ];
}
