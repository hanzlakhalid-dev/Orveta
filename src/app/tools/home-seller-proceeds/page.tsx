import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { SellerProceedsTool } from "@/components/tools/home-seller-proceeds/seller-proceeds-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("home-seller-proceeds");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function SellerProceedsPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <SellerProceedsTool />
    </ToolPageLayout>
  );
}
