import type { MDXComponents } from "mdx/types";

/**
 * Root MDX components map — REQUIRED by the App Router for MDX to render.
 * Styles the elements produced by blog posts to match the site's typography.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => (
      <h1 className="mt-8 mb-4 text-2xl font-semibold text-foreground" {...props} />
    ),
    h2: (props) => (
      <h2 className="mt-8 mb-3 text-xl font-semibold text-foreground" {...props} />
    ),
    h3: (props) => (
      <h3 className="mt-6 mb-2 text-lg font-semibold text-foreground" {...props} />
    ),
    p: (props) => <p className="my-4 leading-7 text-muted" {...props} />,
    a: (props) => (
      <a className="text-accent underline underline-offset-4 hover:opacity-80" {...props} />
    ),
    ul: (props) => <ul className="my-4 list-disc space-y-2 pl-6 text-muted" {...props} />,
    ol: (props) => <ol className="my-4 list-decimal space-y-2 pl-6 text-muted" {...props} />,
    li: (props) => <li className="leading-7" {...props} />,
    blockquote: (props) => (
      <blockquote
        className="my-4 border-l-2 border-border-strong pl-4 italic text-muted"
        {...props}
      />
    ),
    code: (props) => (
      <code
        className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm text-foreground"
        {...props}
      />
    ),
    pre: (props) => (
      <pre
        className="my-4 overflow-x-auto rounded-lg border border-border bg-surface-2 p-4 font-mono text-sm"
        {...props}
      />
    ),
    hr: (props) => <hr className="my-8 border-border" {...props} />,
    ...components,
  };
}
