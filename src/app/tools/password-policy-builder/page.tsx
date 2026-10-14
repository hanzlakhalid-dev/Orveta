import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { PasswordPolicyBuilderTool } from "@/components/tools/password-policy-builder/password-policy-builder-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("password-policy-builder");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function PasswordPolicyBuilderPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <PasswordPolicyBuilderTool />
    </ToolPageLayout>
  );
}
