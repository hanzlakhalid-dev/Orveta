import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { LeaseCalculatorTool } from "@/components/tools/lease-calculator/lease-calculator-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("lease-calculator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function LeaseCalculatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <LeaseCalculatorTool />
    </ToolPageLayout>
  );
}
