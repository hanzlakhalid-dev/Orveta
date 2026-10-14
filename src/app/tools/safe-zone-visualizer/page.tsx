import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { SafeZoneVisualizerTool } from "@/components/tools/safe-zone-visualizer/safe-zone-visualizer-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("safe-zone-visualizer");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function SafeZoneVisualizerPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <SafeZoneVisualizerTool />
    </ToolPageLayout>
  );
}
