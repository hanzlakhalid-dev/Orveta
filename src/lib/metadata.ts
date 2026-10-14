import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import type { BlogPost } from "@/types/blog";
import type { Tool } from "@/types/tool";

/**
 * Shared page metadata for Orveta.
 *
 * Why this exists: Next.js does NOT merge `openGraph` / `twitter` between the
 * site layout and a page — if a page sets its own `openGraph`, the layout's
 * settings (URL, image, site name) are replaced, and if it sets none, it inherits
 * the homepage's. Building every page's metadata through this helper means each
 * page always gets a complete, page-specific set.
 *
 * Paths are site-relative (e.g. "/about"). `metadataBase` in the root layout
 * (siteConfig.url, the www domain) turns them into absolute URLs.
 */

interface PageMetadataInput {
  /**
   * Page title WITHOUT the " | Orveta" suffix (the layout's title template adds it).
   * Leave undefined for the homepage so the layout's default title is used.
   */
  title?: string;
  description: string;
  /** Site-relative path, starting with "/". */
  path: string;
  /** Open Graph type. Defaults to "website". */
  type?: "website" | "article";
  /** ISO date for articles. Only set when the source data really has it. */
  publishedTime?: string;
}

const shareImage = {
  url: siteConfig.ogImage,
  width: 1200,
  height: 630,
  alt: siteConfig.name,
};

export function buildPageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: PageMetadataInput): Metadata {
  // Social title: the page's own title, or the site's default for the homepage.
  const socialTitle = title ?? `${siteConfig.name} — ${siteConfig.tagline}`;

  const openGraphCommon = {
    locale: "en_US",
    siteName: siteConfig.name,
    url: path,
    title: socialTitle,
    description,
    images: [shareImage],
  };

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph:
      type === "article"
        ? {
            ...openGraphCommon,
            type: "article" as const,
            ...(publishedTime ? { publishedTime } : {}),
          }
        : { ...openGraphCommon, type: "website" as const },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [siteConfig.ogImage],
    },
  };
}

/** Metadata for /tools/[slug]. */
export function toolMetadata(tool: Tool): Metadata {
  return buildPageMetadata({
    title: tool.name,
    description: tool.description,
    path: `/tools/${tool.slug}`,
  });
}

/**
 * Metadata for /blog/[slug].
 * Only the publish date is set: it is the date the site already shows on the
 * article and in its structured data. There is no verified author name or
 * last-modified date in the data, so those are intentionally left unset.
 */
export function blogPostMetadata(post: BlogPost): Metadata {
  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedDate,
  });
}
