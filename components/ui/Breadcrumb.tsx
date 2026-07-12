import Link from "next/link";

/**
 * Small "Home / Page" breadcrumb shown at the top of sub-pages,
 * matching the reference site. Pass `parent` for a third level, e.g.
 * "Home / Projects / CuraNet" on a project detail page.
 */
export function Breadcrumb({
  current,
  parent,
}: {
  current: string;
  parent?: { label: string; href: string };
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex items-center gap-2 text-muted">
        <li>
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
        </li>
        <li aria-hidden className="text-faint">
          /
        </li>
        {parent && (
          <>
            <li>
              <Link
                href={parent.href}
                className="transition-colors hover:text-foreground"
              >
                {parent.label}
              </Link>
            </li>
            <li aria-hidden className="text-faint">
              /
            </li>
          </>
        )}
        <li className="font-medium text-foreground">{current}</li>
      </ol>
    </nav>
  );
}
