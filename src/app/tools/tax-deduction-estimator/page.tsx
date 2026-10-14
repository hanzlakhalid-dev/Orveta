import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { TaxDeductionEstimatorTool } from "@/components/tools/tax-deduction-estimator/tax-deduction-estimator-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("tax-deduction-estimator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function TaxDeductionEstimatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <TaxDeductionEstimatorTool />
    </ToolPageLayout>
  );
}
