import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { PodcastFileSizeEstimatorTool } from "@/components/tools/podcast-file-size-estimator/podcast-file-size-estimator-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("podcast-file-size-estimator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function PodcastFileSizeEstimatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <PodcastFileSizeEstimatorTool />
    </ToolPageLayout>
  );
}
