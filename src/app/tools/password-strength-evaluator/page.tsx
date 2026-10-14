import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { PasswordStrengthEvaluatorTool } from "@/components/tools/password-strength-evaluator/password-strength-evaluator-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("password-strength-evaluator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function PasswordStrengthEvaluatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <PasswordStrengthEvaluatorTool />
    </ToolPageLayout>
  );
}
