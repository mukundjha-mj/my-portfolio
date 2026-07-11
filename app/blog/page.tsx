import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: `Blog | ${profile.name}`,
  description: `Writing by ${profile.name} on backend systems, engineering, and building products.`,
};

const POSTS_PER_PAGE = 5;

/** Reference uses plain ISO dates (e.g. 2024-12-14). */
function isoDate(iso: string): string {
  return new Date(iso).toISOString().slice(0, 10);
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const posts = getAllPosts();
  const { page } = await searchParams;

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(
    Math.max(1, Number.parseInt(page ?? "1", 10) || 1),
    totalPages,
  );
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-8 px-4 py-10 sm:px-6 sm:py-12">
      <Breadcrumb current="Blog" />

      <Reveal>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="font-space text-3xl font-semibold tracking-tight text-foreground">
              Blog
            </h1>
            <span className="rounded-md border border-border bg-surface-2/60 px-2 py-0.5 font-mono text-xs text-muted">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>
          <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
            Notes on backend systems, engineering, and the occasional deep dive.
          </p>
        </div>
      </Reveal>

      {posts.length === 0 ? (
        <p className="text-sm text-muted">No posts yet — check back soon.</p>
      ) : (
        <>
          <ol className="flex flex-col gap-7">
            {pagePosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 50}>
                <li className="flex gap-4">
                  <span className="mt-1 shrink-0 font-mono text-xs font-medium text-faint">
                    {String(start + i + 1).padStart(2, "0")}.
                  </span>
                  <Link href={`/blog/${post.slug}`} className="group min-w-0">
                    <h2 className="font-space text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>
                    <time className="mt-1.5 block font-mono text-xs text-faint">
                      {isoDate(post.date)}
                    </time>
                  </Link>
                </li>
              </Reveal>
            ))}
          </ol>

          {totalPages > 1 && (
            <div className="flex items-center justify-between pt-2 text-sm">
              <p className="text-muted">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex items-center gap-2">
                <PageLink
                  page={currentPage - 1}
                  disabled={currentPage <= 1}
                  label="Previous"
                />
                <PageLink
                  page={currentPage + 1}
                  disabled={currentPage >= totalPages}
                  label="Next"
                />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function PageLink({
  page,
  disabled,
  label,
}: {
  page: number;
  disabled: boolean;
  label: string;
}) {
  const cls =
    "rounded-lg border border-border px-3 py-1.5 text-sm transition-colors";
  if (disabled) {
    return (
      <span className={`${cls} cursor-not-allowed text-faint opacity-50`}>
        {label}
      </span>
    );
  }
  return (
    <Link
      href={page === 1 ? "/blog" : `/blog?page=${page}`}
      className={`${cls} text-foreground hover:bg-surface-2`}
    >
      {label}
    </Link>
  );
}
