import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/products/navdhan",
  "/for-platforms",
  "/team",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `https://kubar.tech${route}`,
    lastModified: new Date("2026-08-17"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/products/navdhan" ? 0.9 : 0.7,
  }));
}
