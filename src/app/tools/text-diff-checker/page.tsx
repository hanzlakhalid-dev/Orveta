import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { TextDiffCheckerTool } from "@/components/tools/text-diff-checker/text-diff-checker-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("text-diff-checker");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function TextDiffCheckerPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <TextDiffCheckerTool />
    </ToolPageLayout>
  );
}
