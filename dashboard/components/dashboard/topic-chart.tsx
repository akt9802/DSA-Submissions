"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { topicColor } from "@/lib/utils";

interface TopicChartProps {
  topicCounts: Record<string, number>;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: { topic: string } }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const { value, payload: p } = payload[0];
  return (
    <div className="custom-tooltip">
      <p className="font-medium">{p.topic}</p>
      <p className="text-[hsl(var(--muted-foreground))]">
        {value} problem{value !== 1 ? "s" : ""}
      </p>
    </div>
  );
}

export function TopicChart({ topicCounts }: TopicChartProps) {
  const data = Object.entries(topicCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([topic, count]) => ({ topic, count, fill: topicColor(topic) }));

  if (data.length === 0) {
    return (
      <div className="h-56 flex items-center justify-center text-[hsl(var(--muted-foreground))] text-sm">
        No topic data available.
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24, top: 4, bottom: 4 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="hsl(216, 34%, 17%)"
          horizontal={false}
        />
        <XAxis
          type="number"
          tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }}
          axisLine={false}
          tickLine={false}
          allowDecimals={false}
        />
        <YAxis
          type="category"
          dataKey="topic"
          width={140}
          tick={{ fontSize: 11, fill: "hsl(215, 20%, 55%)" }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(216, 34%, 17%)" }} />
        <Bar dataKey="count" radius={[0, 4, 4, 0]}>
          {data.map((entry, index) => (
            <Cell key={index} fill={entry.fill} fillOpacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
