import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { EmailRecordValidatorTool } from "@/components/tools/spf-dkim-validator/email-record-validator-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("spf-dkim-validator");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function SpfDkimValidatorPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <EmailRecordValidatorTool />
    </ToolPageLayout>
  );
}
