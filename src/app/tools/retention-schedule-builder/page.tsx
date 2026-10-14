import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { RetentionScheduleTool } from "@/components/tools/retention-schedule-builder/retention-schedule-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("retention-schedule-builder");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function RetentionScheduleBuilderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <RetentionScheduleTool />
    </ToolPageLayout>
  );
}
