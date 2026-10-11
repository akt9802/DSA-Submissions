"use client";

import type { ActivityDay } from "@/lib/data/schema";

interface ActivityHeatmapProps {
  activity: ActivityDay[];
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"];

function getIntensity(count: number, max: number): number {
  if (count === 0) return 0;
  return Math.ceil((count / max) * 4);
}

function getCellBg(intensity: number): string {
  const colors = [
    "hsl(222, 47%, 13%)",   // 0 = empty
    "hsl(215, 60%, 22%)",   // 1
    "hsl(215, 65%, 34%)",   // 2
    "hsl(215, 68%, 46%)",   // 3
    "hsl(215, 72%, 58%)",   // 4
  ];
  return colors[Math.min(intensity, 4)];
}

function buildWeekGrid(activity: ActivityDay[]): { date: string; count: number }[][] {
  if (activity.length === 0) return [];
  const byDate: Record<string, number> = {};
  activity.forEach(({ date, commitCount }) => (byDate[date] = commitCount));

  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 364);
  start.setDate(start.getDate() - start.getDay()); // align to Sunday

  const weeks: { date: string; count: number }[][] = [];
  let week: { date: string; count: number }[] = [];
  const cursor = new Date(start);

  while (cursor <= today) {
    const key = cursor.toISOString().split("T")[0];
    week.push({ date: key, count: byDate[key] ?? 0 });
    if (week.length === 7) { weeks.push(week); week = []; }
    cursor.setDate(cursor.getDate() + 1);
  }
  if (week.length > 0) weeks.push(week);
  return weeks;
}

export function ActivityHeatmap({ activity }: ActivityHeatmapProps) {
  if (activity.length === 0) {
    return (
      <div className="py-6 text-sm text-[hsl(var(--muted-foreground))]">
        No commit activity data available.
      </div>
    );
  }

  const maxCount = Math.max(...activity.map((a) => a.commitCount));
  const weeks = buildWeekGrid(activity);
  const totalCommits = activity.reduce((s, a) => s + a.commitCount, 0);

  // Month labels
  const monthLabels: { label: string; col: number }[] = [];
  weeks.forEach((week, i) => {
    const first = week.find((d) => d.date)?.date;
    if (!first) return;
    const d = new Date(first);
    if (d.getDate() <= 7) monthLabels.push({ label: MONTHS[d.getMonth()], col: i });
  });

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-sm font-medium text-[hsl(var(--muted-foreground))]">commit activity</h2>
        <span className="text-xs text-[hsl(var(--muted-foreground))]">
          {totalCommits} commits · {activity.length} days
        </span>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          {/* Month row */}
          <div className="flex mb-1 ml-7">
            {weeks.map((_, i) => {
              const lbl = monthLabels.find((m) => m.col === i);
              return (
                <div key={i} className="w-[13px] mr-[2px] text-[9px] text-[hsl(var(--muted-foreground))]">
                  {lbl?.label ?? ""}
                </div>
              );
            })}
          </div>

          <div className="flex gap-[2px]">
            {/* Day labels */}
            <div className="flex flex-col gap-[2px] mr-1 w-6">
              {DAY_LABELS.map((d, i) => (
                <div key={i} className="h-[13px] flex items-center justify-end pr-1 text-[9px] text-[hsl(var(--muted-foreground))]">
                  {i % 2 === 1 ? d : ""}
                </div>
              ))}
            </div>

            {/* Cells */}
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[2px]">
                {week.map((day, di) => {
                  const intensity = getIntensity(day.count, maxCount);
                  return (
                    <div
                      key={di}
                      title={day.count > 0 ? `${day.date}: ${day.count} commit${day.count !== 1 ? "s" : ""}` : day.date}
                      className="w-[13px] h-[13px] rounded-[2px]"
                      style={{ background: getCellBg(intensity) }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-[3px] mt-2.5 justify-end">
        <span className="text-[10px] text-[hsl(var(--muted-foreground))] mr-1">less</span>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="w-[13px] h-[13px] rounded-[2px]" style={{ background: getCellBg(i) }} />
        ))}
        <span className="text-[10px] text-[hsl(var(--muted-foreground))] ml-1">more</span>
      </div>

      <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-2 opacity-70">
        Tracks commit frequency, not new problems per day.
      </p>
    </div>
  );
}
