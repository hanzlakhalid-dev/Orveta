import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { InvoiceBuilderTool } from "@/components/tools/invoice-builder/invoice-builder-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("invoice-builder");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function InvoiceBuilderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <InvoiceBuilderTool />
    </ToolPageLayout>
  );
}
