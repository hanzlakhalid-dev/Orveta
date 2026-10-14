import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { QualityScoreEstimatorTool } from "@/components/tools/quality-score-estimator/quality-score-estimator-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("quality-score-estimator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function QualityScoreEstimatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <QualityScoreEstimatorTool />
    </ToolPageLayout>
  );
}
