import type { MetadataRoute } from "next";

import { tools } from "@/lib/tools-registry";
import { blogPosts } from "@/lib/blog-registry";
import { siteConfig } from "@/lib/site-config";

/**
 * Sitemap for search engines.
 *
 * Only the URL is listed for pages that have no recorded modification date.
 * We deliberately do NOT set `lastModified` to "now" for them: that would claim
 * every page changed on every deploy, and Google ignores sitemap dates once they
 * prove unreliable. `changeFrequency` and `priority` are also left out — Google
 * ignores them, and they implied update schedules the site does not promise.
 * Blog articles keep their recorded publish date.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteConfig.url },
    { url: `${siteConfig.url}/tools` },
    { url: `${siteConfig.url}/blog` },
    { url: `${siteConfig.url}/about` },
    { url: `${siteConfig.url}/contact` },
    { url: `${siteConfig.url}/privacy` },
    { url: `${siteConfig.url}/terms` },
    { url: `${siteConfig.url}/disclaimer` },
  ];

  const toolRoutes: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${siteConfig.url}/tools/${tool.slug}`,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: new Date(post.publishedDate),
  }));

  return [...staticRoutes, ...toolRoutes, ...blogRoutes];
}
