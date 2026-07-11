import { profile } from "@/content/profile";

const WEEKS = 53;
const DAYS = 7;
const MONTHS = [
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul",
];

const HEAT = [
  "bg-heat-0",
  "bg-heat-1",
  "bg-heat-2",
  "bg-heat-3",
  "bg-heat-4",
];

// Deterministic pseudo-random level (0–4) so server/client render identically
// and we avoid Math.random (flagged by this Next.js version).
function levelFor(i: number): number {
  const x = Math.sin(i * 12.9898) * 43758.5453;
  const f = x - Math.floor(x);
  if (f < 0.5) return 0;
  if (f < 0.68) return 1;
  if (f < 0.84) return 2;
  if (f < 0.94) return 3;
  return 4;
}

export function ContributionGraph() {
  const cells = Array.from({ length: WEEKS * DAYS }, (_, i) => levelFor(i));

  return (
    <section className="w-full">
      <div className="overflow-x-auto pb-1">
        <div className="min-w-[680px]">
          {/* Month labels */}
          <div className="flex justify-between px-0.5 text-[10px] text-faint">
            {MONTHS.map((m, idx) => (
              <span key={`${m}-${idx}`}>{m}</span>
            ))}
          </div>

          {/* Grid: 7 rows, filled column-by-column */}
          <div className="mt-1.5 grid grid-flow-col grid-rows-7 gap-[3px]">
            {cells.map((level, i) => {
              const count = level === 0 ? 0 : level * 3 + (i % 4);
              return (
                <span
                  key={i}
                  title={
                    count === 0 ? "No contributions" : `${count} contributions`
                  }
                  className={`h-[11px] w-[11px] rounded-[2px] ${HEAT[level]} transition-transform hover:scale-125`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer: total + legend */}
      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <p>
          <span className="font-semibold text-foreground">
            {profile.contributions.count}
          </span>{" "}
          contributions in {profile.contributions.year}
        </p>
        <div className="flex items-center gap-1">
          <span className="mr-1 text-faint">Less</span>
          {HEAT.map((c) => (
            <span key={c} className={`h-[11px] w-[11px] rounded-[2px] ${c}`} />
          ))}
          <span className="ml-1 text-faint">More</span>
        </div>
      </div>
    </section>
  );
}
