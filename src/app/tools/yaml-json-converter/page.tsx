import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { YamlJsonConverterTool } from "@/components/tools/yaml-json-converter/yaml-json-converter-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("yaml-json-converter");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function YamlJsonConverterPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <YamlJsonConverterTool />
    </ToolPageLayout>
  );
}
