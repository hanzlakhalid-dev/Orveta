import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { SerpSimulatorTool } from "@/components/tools/serp-simulator/serp-simulator-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("serp-simulator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function SerpSimulatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <SerpSimulatorTool />
    </ToolPageLayout>
  );
}
