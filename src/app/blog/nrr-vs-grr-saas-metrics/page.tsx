import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { BlogPostLayout } from "@/components/blog/blog-post-layout";
import { NrrVsGrrContent } from "@/components/blog/posts/nrr-vs-grr-content";
import { getPostBySlug } from "@/lib/blog-registry";
import { blogPostMetadata } from "@/lib/metadata";

const post = getPostBySlug("nrr-vs-grr-saas-metrics");

export const metadata: Metadata = post ? blogPostMetadata(post) : {};

export default function Page() {
  if (!post) notFound();
  return (
    <BlogPostLayout post={post}>
      <NrrVsGrrContent />
    </BlogPostLayout>
  );
}
