import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { CapTableSimulatorTool } from "@/components/tools/cap-table-simulator/cap-table-simulator-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("cap-table-simulator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function CapTableSimulatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <CapTableSimulatorTool />
    </ToolPageLayout>
  );
}
