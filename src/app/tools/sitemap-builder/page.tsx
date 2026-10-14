import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { SitemapBuilderTool } from "@/components/tools/sitemap-builder/sitemap-builder-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("sitemap-builder");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function SitemapBuilderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <SitemapBuilderTool />
    </ToolPageLayout>
  );
}
