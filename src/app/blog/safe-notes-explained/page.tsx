import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostLayout } from "@/components/blog/blog-post-layout";
import { SafeNotesExplainedContent } from "@/components/blog/posts/safe-notes-explained-content";
import { getPostBySlug } from "@/lib/blog-registry";
import { blogPostMetadata } from "@/lib/metadata";

const post = getPostBySlug("safe-notes-explained");

export const metadata: Metadata = post ? blogPostMetadata(post) : {};

export default function Page() {
  if (!post) notFound();
  return (
    <BlogPostLayout post={post}>
      <SafeNotesExplainedContent />
    </BlogPostLayout>
  );
}
