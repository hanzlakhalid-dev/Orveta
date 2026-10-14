import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostLayout } from "@/components/blog/blog-post-layout";
import { PricingForTargetMarginContent } from "@/components/blog/posts/pricing-for-target-margin-content";
import { getPostBySlug } from "@/lib/blog-registry";
import { blogPostMetadata } from "@/lib/metadata";

const post = getPostBySlug("pricing-for-target-margin");

export const metadata: Metadata = post ? blogPostMetadata(post) : {};

export default function Page() {
  if (!post) notFound();
  return (
    <BlogPostLayout post={post}>
      <PricingForTargetMarginContent />
    </BlogPostLayout>
  );
}
