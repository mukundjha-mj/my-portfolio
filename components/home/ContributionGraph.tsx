import { profile } from "@/content/profile";
import { getContributions } from "@/lib/github";

const HEAT = [
  "bg-heat-0",
  "bg-heat-1",
  "bg-heat-2",
  "bg-heat-3",
  "bg-heat-4",
];

const WEEKDAYS = ["", "Mon", "", "Wed", "", "Fri", ""];

export async function ContributionGraph() {
  const { total, weeks, months } = await getContributions(
    profile.githubUsername,
  );

  return (
    <section className="w-full">
      <div className="overflow-x-auto pb-1">
        <div className="inline-block min-w-full">
          {/* Month labels */}
          <div className="flex pl-7 text-[10px] text-faint">
            {months.map((m, i) => (
              <span
                key={i}
                className="w-[13px] shrink-0 text-left"
              >
                {m.label}
              </span>
            ))}
          </div>

          <div className="mt-1 flex gap-[3px]">
            {/* Weekday labels */}
            <div className="mr-1 flex w-6 flex-col gap-[3px] text-[9px] leading-[10px] text-faint">
              {WEEKDAYS.map((d, i) => (
                <span key={i} className="h-[10px]">
                  {d}
                </span>
              ))}
            </div>

            {/* Week columns */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[3px]">
                  {week.map((day, di) => (
                    <span
                      key={di}
                      title={
                        day.date
                          ? `${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`
                          : undefined
                      }
                      className={`h-[10px] w-[10px] rounded-[2px] ${
                        day.date ? HEAT[day.level] : "bg-transparent"
                      } transition-transform hover:scale-125`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer: total + legend */}
      <div className="mt-3 flex items-center justify-between text-xs text-muted">
        <p>
          <span className="font-semibold text-foreground">{total}</span>{" "}
          contributions in the last year
        </p>
        <div className="flex items-center gap-1">
          <span className="mr-1 text-faint">Less</span>
          {HEAT.map((c) => (
            <span key={c} className={`h-[10px] w-[10px] rounded-[2px] ${c}`} />
          ))}
          <span className="ml-1 text-faint">More</span>
        </div>
      </div>
    </section>
  );
}
