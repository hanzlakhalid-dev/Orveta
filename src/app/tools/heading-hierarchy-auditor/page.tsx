import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { HeadingHierarchyAuditorTool } from "@/components/tools/heading-hierarchy-auditor/heading-hierarchy-auditor-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("heading-hierarchy-auditor");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function HeadingHierarchyAuditorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <HeadingHierarchyAuditorTool />
    </ToolPageLayout>
  );
}
