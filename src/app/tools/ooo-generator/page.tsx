import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { OooGeneratorTool } from "@/components/tools/ooo-generator/ooo-generator-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("ooo-generator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function OooGeneratorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <OooGeneratorTool />
    </ToolPageLayout>
  );
}
