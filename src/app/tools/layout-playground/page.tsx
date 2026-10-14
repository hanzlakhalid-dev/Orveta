import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { LayoutPlaygroundTool } from "@/components/tools/layout-playground/layout-playground-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("layout-playground");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function LayoutPlaygroundPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <LayoutPlaygroundTool />
    </ToolPageLayout>
  );
}
