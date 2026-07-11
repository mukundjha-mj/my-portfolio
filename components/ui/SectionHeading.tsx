export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-space text-lg font-semibold tracking-tight text-foreground">
      {children}
      <span className="text-accent">.</span>
    </h2>
  );
}
