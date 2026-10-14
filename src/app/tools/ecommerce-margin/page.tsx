import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { EcommerceMarginTool } from "@/components/tools/ecommerce-margin/ecommerce-margin-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("ecommerce-margin");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function EcommerceMarginPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <EcommerceMarginTool />
    </ToolPageLayout>
  );
}
