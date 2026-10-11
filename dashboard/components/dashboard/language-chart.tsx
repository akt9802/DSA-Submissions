"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface LanguageChartProps {
  languageCounts: Record<string, number>;
}

const LANG_COLORS: Record<string, string> = {
  "C++": "#00599C",
  Python: "#3776AB",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  Java: "#ED8B00",
  "C#": "#178600",
  Go: "#00ADD8",
  Rust: "#DEA584",
  Kotlin: "#7F52FF",
  Swift: "#F05138",
  SQL: "#e38c00",
  Unknown: "#6b7280",
};

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { language: string } }>;
}

function CustomTooltip({ active, payload }: TooltipProps) {
  if (!active || !payload?.length) return null;
  const { value, payload: p } = payload[0];
  return (
    <div className="custom-tooltip">
      <p className="font-medium">{p.language}</p>
      <p className="text-[hsl(var(--muted-foreground))]">
        {value} file{value !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

export function LanguageChart({ languageCounts }: LanguageChartProps) {
  const data = Object.entries(languageCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([language, count]) => ({
      language,
      count,
      fill: LANG_COLORS[language] ?? "#6b7280",
    }));

  if (data.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center text-[hsl(var(--muted-foreground))] text-sm">
        No language data available.
      </div>
    );
  }

  // If only one language, show a simpler card
  if (data.length === 1) {
    const [item] = data;
    return (
      <div className="flex flex-col items-center justify-center h-40 gap-2">
        <div
          className="text-4xl font-bold"
          style={{ color: item.fill }}
        >
          {item.count}
        </div>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          solution files in{" "}
          <span className="font-medium text-[hsl(var(--foreground))]">
            {item.language}
          </span>
        </p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={data} margin={{ left: 0, right: 16, top: 4, bottom: 0 }}>
        <XAxis
          dataKey="language"
          tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          allowDecimals={false}
          tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }}
          axisLine={false}
          tickLine={false}
          width={30}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(216, 34%, 17%)" }} />
        <Bar dataKey="count" radius={[4, 4, 0, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={entry.fill} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
