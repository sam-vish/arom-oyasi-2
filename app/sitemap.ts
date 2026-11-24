import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/site";

const routes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1, freq: "daily" },
  { path: "/about", priority: 0.9, freq: "monthly" },
  { path: "/messages", priority: 0.9, freq: "daily" },
  { path: "/books", priority: 0.8, freq: "monthly" },
  { path: "/itinerary", priority: 0.8, freq: "weekly" },
  { path: "/invite", priority: 0.7, freq: "yearly" },
  { path: "/partner", priority: 0.7, freq: "yearly" },
  { path: "/testimonies", priority: 0.6, freq: "monthly" },
  { path: "/prayer", priority: 0.5, freq: "yearly" },
  { path: "/contact", priority: 0.5, freq: "yearly" },
  { path: "/privacy", priority: 0.1, freq: "yearly" },
  { path: "/terms", priority: 0.1, freq: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
