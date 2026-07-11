import Link from "next/link";

type Variant = "solid" | "outline";

const styles: Record<Variant, string> = {
  solid:
    "bg-foreground text-background hover:opacity-90",
  outline:
    "border border-border-strong text-foreground hover:bg-surface-2",
};

type Props = {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function LinkButton({
  href,
  variant = "outline",
  external,
  className = "",
  children,
}: Props) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
