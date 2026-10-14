import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { JsonFormatterTool } from "@/components/tools/json-formatter/json-formatter-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("json-formatter");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function JsonFormatterPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <JsonFormatterTool />
    </ToolPageLayout>
  );
}
