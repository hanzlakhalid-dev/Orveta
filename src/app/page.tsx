import type { Metadata } from "next";

import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { BlogTeaser } from "@/components/home/blog-teaser";
import { CtaBanner } from "@/components/home/cta-banner";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/metadata";
import { organizationJsonLd, serializeJsonLd, websiteJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = buildPageMetadata({
  description: siteConfig.description,
  path: "/",
});

const homeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [organizationJsonLd, websiteJsonLd],
};

export default function HomePage() {
  return (
    <>
      {/* eslint-disable-next-line react/no-danger */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(homeJsonLd) }}
      />
      <Hero />
      <ValueProps />
      <CategoriesGrid />
      <BlogTeaser />
      <CtaBanner />
    </>
  );
}

