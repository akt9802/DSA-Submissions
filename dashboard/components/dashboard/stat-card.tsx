import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  description?: string;
  accent?: string;
}

export function StatCard({
  label,
  value,
  description,
  accent = "#4f7fff",
}: StatCardProps) {
  return (
    <div
      className="pl-4 py-1"
      style={{ borderLeft: `2px solid ${accent}40` }}
    >
      <p
        className="text-3xl font-bold tabular-nums leading-none"
        style={{ color: accent }}
      >
        {value}
      </p>
      <p className="text-sm text-[hsl(var(--foreground))] mt-1.5 font-medium">
        {label}
      </p>
      {description && (
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5 leading-snug">
          {description}
        </p>
      )}
    </div>
  );
}
