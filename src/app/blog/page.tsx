import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { Container, Eyebrow } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on machine learning, evaluation, and building reliable systems.",
};

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <Container className="py-20 md:py-28">
      <Eyebrow>Writing</Eyebrow>
      <h1 className="mt-4 max-w-3xl text-4xl font-medium tracking-tight text-fg md:text-5xl">
        Notes
      </h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-fg-muted">
        Some technical, some personal. Writing on machine learning and honest evaluation,
        and sometimes on being human, philosophy, and the things I think about away from the
        screen.
      </p>

      <div className="mt-14 divide-y divide-line border-t border-line">
        {posts.length === 0 && (
          <p className="py-16 text-sm text-fg-subtle">No posts yet, check back soon.</p>
        )}
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-3 py-8 transition-colors md:flex-row md:items-baseline md:justify-between"
          >
            <div className="md:max-w-2xl">
              <div className="flex items-center gap-3 font-mono text-xs text-fg-subtle">
                <time>{formatDate(post.date)}</time>
                <span>·</span>
                <span>{post.readingTime}</span>
              </div>
              <h2 className="mt-2 text-xl font-medium text-fg transition-colors group-hover:text-accent">
                {post.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-fg-muted">{post.excerpt}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {post.tags.map((t) => (
                  <Badge key={t}>{t}</Badge>
                ))}
              </div>
            </div>
            <ArrowUpRight className="hidden h-5 w-5 shrink-0 text-fg-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent md:block" />
          </Link>
        ))}
      </div>
    </Container>
  );
}
