import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostLayout } from "@/components/blog/blog-post-layout";
import { DebtSnowballVsAvalancheContent } from "@/components/blog/posts/debt-snowball-vs-avalanche-content";
import { getPostBySlug } from "@/lib/blog-registry";
import { blogPostMetadata } from "@/lib/metadata";

const post = getPostBySlug("debt-snowball-vs-avalanche");

export const metadata: Metadata = post ? blogPostMetadata(post) : {};

export default function Page() {
  if (!post) notFound();
  return (
    <BlogPostLayout post={post}>
      <DebtSnowballVsAvalancheContent />
    </BlogPostLayout>
  );
}
