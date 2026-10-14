import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { NdaBuilderTool } from "@/components/tools/nda-builder/nda-builder-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("nda-builder");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function NdaBuilderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <NdaBuilderTool />
    </ToolPageLayout>
  );
}
