import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/blog";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: `Blog | ${profile.name}`,
  description: `Writing by ${profile.name} on backend systems, engineering, and building products.`,
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-2xl font-semibold tracking-tight text-foreground">
        Blog<span className="text-accent">.</span>
      </h1>
      <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
        Notes on backend systems, engineering, and the occasional deep dive.
      </p>

      {posts.length === 0 ? (
        <p className="mt-8 text-sm text-muted">No posts yet — check back soon.</p>
      ) : (
        <ul className="mt-8 divide-y divide-border">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex flex-col gap-1 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <div className="min-w-0">
                  <h2 className="text-sm font-medium text-foreground group-hover:text-accent">
                    {post.title}
                  </h2>
                  {post.summary && (
                    <p className="mt-1 line-clamp-1 text-sm text-muted">
                      {post.summary}
                    </p>
                  )}
                </div>
                <time className="shrink-0 font-mono text-xs text-faint">
                  {formatDate(post.date)}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
