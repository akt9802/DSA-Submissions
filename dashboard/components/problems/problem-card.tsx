import Link from "next/link";
import type { Problem } from "@/lib/data/schema";
import { difficultyColor, topicColor } from "@/lib/utils";

interface ProblemCardProps {
  problem: Problem;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  const topicCol = topicColor(problem.topic);
  const languages = [...new Set(problem.solutions.map((s) => s.language))];

  return (
    <Link
      href={`/problems/${problem.id}`}
      className="group flex items-start gap-3 py-3 px-3 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors border border-transparent hover:border-[hsl(var(--border))]"
    >
      {/* Topic dot */}
      <div
        className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"
        style={{ background: topicCol }}
        aria-hidden
      />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--accent))] transition-colors truncate">
          {problem.name}
        </p>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
          <span style={{ color: topicCol }} className="opacity-80">{problem.topic}</span>
          <span className="mx-1.5 opacity-30">·</span>
          <span className={difficultyColor(problem.difficulty)}>{problem.difficulty}</span>
          <span className="mx-1.5 opacity-30">·</span>
          <span>{languages.join(", ")}</span>
          <span className="mx-1.5 opacity-30">·</span>
          <span>{problem.solutions.length} sub</span>
        </p>
      </div>
    </Link>
  );
}
