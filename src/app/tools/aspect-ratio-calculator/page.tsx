import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { AspectRatioCalculatorTool } from "@/components/tools/aspect-ratio-calculator/aspect-ratio-calculator-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("aspect-ratio-calculator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function AspectRatioCalculatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <AspectRatioCalculatorTool />
    </ToolPageLayout>
  );
}
