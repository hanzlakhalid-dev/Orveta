import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { DowntimeCostTool } from "@/components/tools/downtime-cost-estimator/downtime-cost-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("downtime-cost-estimator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function DowntimeCostPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <DowntimeCostTool />
    </ToolPageLayout>
  );
}
