import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { TokenDecoderTool } from "@/components/tools/saml-jwt-decoder/token-decoder-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("saml-jwt-decoder");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function TokenDecoderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <TokenDecoderTool />
    </ToolPageLayout>
  );
}
