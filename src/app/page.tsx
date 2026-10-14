import type { Metadata } from "next";

import { Hero } from "@/components/home/hero";
import { ValueProps } from "@/components/home/value-props";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { BlogTeaser } from "@/components/home/blog-teaser";
import { CtaBanner } from "@/components/home/cta-banner";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  description: siteConfig.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueProps />
      <CategoriesGrid />
      <BlogTeaser />
      <CtaBanner />
    </>
  );
}

