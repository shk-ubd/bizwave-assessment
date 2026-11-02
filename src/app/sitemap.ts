import type { MetadataRoute } from "next";
import { destinations, services } from "@/data/travel";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  return [
    "",
    "/about",
    "/contact",
    "/destinations",
    "/privacy",
    "/terms",
    ...services.map((item) => `/services/${item.id}`),
    ...destinations.map((item) => `/destinations/${item.slug}`),
  ].map((path) => ({
    url: base + path,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
