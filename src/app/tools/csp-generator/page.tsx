import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { CspGeneratorTool } from "@/components/tools/csp-generator/csp-generator-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("csp-generator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function CspGeneratorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <CspGeneratorTool />
    </ToolPageLayout>
  );
}
