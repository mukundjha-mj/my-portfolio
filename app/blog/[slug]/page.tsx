import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPostSlugs, getPostMeta, formatDate } from "@/lib/blog";
import { profile } from "@/content/profile";

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  if (!meta) return { title: `Blog | ${profile.name}` };
  return {
    title: `${meta.title} | ${profile.name}`,
    description: meta.summary,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const meta = getPostMeta(slug);
  if (!meta) notFound();

  // Dynamically import the compiled MDX (frontmatter stripped by remark-frontmatter).
  let Post: React.ComponentType;
  try {
    const mod = await import(`../../../content/blog/${slug}.mdx`);
    Post = mod.default;
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-12">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to blog
      </Link>

      <article className="mt-8">
        <header className="border-b border-border pb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            {meta.title}
          </h1>
          <time className="mt-2 block font-mono text-xs text-faint">
            {formatDate(meta.date)}
          </time>
        </header>
        <div className="mt-2">
          <Post />
        </div>
      </article>
    </div>
  );
}
