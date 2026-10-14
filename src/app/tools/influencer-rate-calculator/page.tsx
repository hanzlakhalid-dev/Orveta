import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { InfluencerRateCalculatorTool } from "@/components/tools/influencer-rate-calculator/influencer-rate-calculator-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("influencer-rate-calculator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function InfluencerRateCalculatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <InfluencerRateCalculatorTool />
    </ToolPageLayout>
  );
}
