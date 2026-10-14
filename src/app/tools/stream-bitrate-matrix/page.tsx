import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ToolPageLayout } from "@/components/tools/tool-page-layout";
import { StreamBitrateMatrixTool } from "@/components/tools/stream-bitrate-matrix/stream-bitrate-matrix-tool";
import { toolMetadata } from "@/lib/metadata";
import { getToolBySlug } from "@/lib/tools-registry";

const tool = getToolBySlug("stream-bitrate-matrix");

export const metadata: Metadata = tool ? toolMetadata(tool) : {};

export default function StreamBitrateMatrixPage() {
  if (!tool) notFound();
  return (
    <ToolPageLayout tool={tool}>
      <StreamBitrateMatrixTool />
    </ToolPageLayout>
  );
}
