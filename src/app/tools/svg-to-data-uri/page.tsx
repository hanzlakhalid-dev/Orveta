import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { SvgToDataUriTool } from "@/components/tools/svg-to-data-uri/svg-to-data-uri-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("svg-to-data-uri");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function SvgToDataUriPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <SvgToDataUriTool />
    </ToolPageLayout>
  );
}
