import type { MetadataRoute } from "next";
import { getDeploymentUrl } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getDeploymentUrl();
  const chinese = ["", "/research/", "/publications/", "/projects/", "/team/", "/join/"];
  const english = ["/en/", "/en/research/", "/en/publications/", "/en/projects/", "/en/team/", "/en/join/"];
  return [...chinese, ...english].map((pagePath) => ({ url: `${base}${pagePath}`, changeFrequency: "monthly", priority: pagePath === "" || pagePath === "/en/" ? 1 : 0.8 }));
}
