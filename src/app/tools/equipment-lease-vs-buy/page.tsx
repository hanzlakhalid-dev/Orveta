import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { LeaseVsBuyTool } from "@/components/tools/equipment-lease-vs-buy/lease-vs-buy-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("equipment-lease-vs-buy");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function LeaseVsBuyPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <LeaseVsBuyTool />
    </ToolPageLayout>
  );
}
