import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { PrivacyPolicyGeneratorTool } from "@/components/tools/privacy-policy-generator/privacy-policy-generator-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("privacy-policy-generator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function PrivacyPolicyGeneratorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <PrivacyPolicyGeneratorTool />
    </ToolPageLayout>
  );
}
