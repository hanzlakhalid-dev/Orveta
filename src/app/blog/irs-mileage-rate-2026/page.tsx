import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostLayout } from "@/components/blog/blog-post-layout";
import { IrsMileageRate2026Content } from "@/components/blog/posts/irs-mileage-rate-2026-content";
import { getPostBySlug } from "@/lib/blog-registry";
import { blogPostMetadata } from "@/lib/metadata";

const post = getPostBySlug("irs-mileage-rate-2026");

export const metadata: Metadata = post ? blogPostMetadata(post) : {};

export default function Page() {
  if (!post) notFound();
  return (
    <BlogPostLayout post={post}>
      <IrsMileageRate2026Content />
    </BlogPostLayout>
  );
}
