import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { CaseConverterTool } from "@/components/tools/case-converter/case-converter-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("case-converter");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function CaseConverterPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <CaseConverterTool />
    </ToolPageLayout>
  );
}
