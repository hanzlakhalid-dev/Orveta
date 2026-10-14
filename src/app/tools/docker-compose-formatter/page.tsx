import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { DockerComposeFormatterTool } from "@/components/tools/docker-compose-formatter/docker-compose-formatter-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("docker-compose-formatter");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function DockerComposeFormatterPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <DockerComposeFormatterTool />
    </ToolPageLayout>
  );
}
