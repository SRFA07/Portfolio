import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { allPostSlugs } from "@/lib/blog";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://reebal.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ["", "/projects", "/blog"].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
  }));
  const projectRoutes = projects.map((p) => ({
    url: `${base}/projects/${p.slug}`,
    lastModified: now,
  }));
  const blogRoutes = allPostSlugs().map((s) => ({
    url: `${base}/blog/${s}`,
    lastModified: now,
  }));
  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
