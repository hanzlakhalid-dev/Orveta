import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { PdfMetadataExtractorTool } from "@/components/tools/pdf-metadata-extractor/pdf-metadata-extractor-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("pdf-metadata-extractor");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function PdfMetadataExtractorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <PdfMetadataExtractorTool />
    </ToolPageLayout>
  );
}
