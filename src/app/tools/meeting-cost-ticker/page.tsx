import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { MeetingCostTickerTool } from "@/components/tools/meeting-cost-ticker/meeting-cost-ticker-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("meeting-cost-ticker");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function MeetingCostTickerPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <MeetingCostTickerTool />
    </ToolPageLayout>
  );
}
