import { siteConfig } from "@/lib/site-config";
import type { ToolCategory } from "@/types/tool";

/**
 * Helpers for JSON-LD structured data (Stage 1.8).
 */

/**
 * Serialise JSON-LD for use inside a <script> tag. "<" is escaped so that text in
 * the data (for example a FAQ answer that mentions a script tag) can never end the
 * script element early.
 */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/** Publisher / organisation details. Only facts that are on the site: name, address, logo file, email. */
export const organizationJsonLd = {
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  logo: {
    "@type": "ImageObject",
    url: `${siteConfig.url}/icon-512.png`,
    width: 512,
    height: 512,
  },
  email: siteConfig.email,
} as const;

/** WebSite entity for the homepage. */
export const websiteJsonLd = {
  "@type": "WebSite",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  inLanguage: "en",
} as const;

/**
 * Google's supported `applicationCategory` values for each tool category.
 * "productivity" and "ai" have no tools today; these are placeholders for when they do.
 */
export const appCategoryByToolCategory: Record<ToolCategory, string> = {
  business: "BusinessApplication",
  marketing: "BusinessApplication",
  developer: "DeveloperApplication",
  finance: "FinanceApplication",
  security: "SecurityApplication",
  utility: "UtilitiesApplication",
  productivity: "BusinessApplication",
  ai: "UtilitiesApplication",
};
