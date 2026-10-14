import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { RateCalculatorTool } from "@/components/tools/rate-calculator/rate-calculator-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("rate-calculator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function RateCalculatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <RateCalculatorTool />
    </ToolPageLayout>
  );
}
