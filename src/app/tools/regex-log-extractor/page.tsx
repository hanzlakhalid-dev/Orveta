import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { RegexLogExtractorTool } from "@/components/tools/regex-log-extractor/regex-log-extractor-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("regex-log-extractor");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function RegexLogExtractorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <RegexLogExtractorTool />
    </ToolPageLayout>
  );
}
