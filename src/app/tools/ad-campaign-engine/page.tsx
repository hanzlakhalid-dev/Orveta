import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { AdCampaignEngineTool } from "@/components/tools/ad-campaign-engine/ad-campaign-engine-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("ad-campaign-engine");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function AdCampaignEnginePage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <AdCampaignEngineTool />
    </ToolPageLayout>
  );
}
