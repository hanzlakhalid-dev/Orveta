import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { UtmBuilderTool } from "@/components/tools/utm-builder/utm-builder-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("utm-builder");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function UtmBuilderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <UtmBuilderTool />
    </ToolPageLayout>
  );
}
