import type { RecentCommit } from "@/lib/data/schema";
import { REPO_URL } from "@/lib/github/urls";

interface RecentActivityProps {
  commits: RecentCommit[];
}

function formatMessage(msg: string): string {
  // Simplify "Add: problem-slug - submission-0" → "problem-slug"
  const match = msg.match(/Add:\s+([\w-]+)\s+-\s+submission-(\d+)/i);
  if (match) {
    const slug = match[1].replace(/-/g, " ");
    return `${slug}  ·  sub ${match[2]}`;
  }
  return msg;
}

export function RecentActivity({ commits }: RecentActivityProps) {
  if (commits.length === 0) {
    return (
      <p className="text-sm text-[hsl(var(--muted-foreground))]">
        No commits available.
      </p>
    );
  }

  // Group by date
  const byDate: Record<string, RecentCommit[]> = {};
  for (const c of commits) {
    if (!byDate[c.date]) byDate[c.date] = [];
    byDate[c.date].push(c);
  }

  return (
    <div className="space-y-3">
      {Object.entries(byDate).map(([date, group]) => (
        <div key={date} className="flex gap-3">
          {/* Date label */}
          <div className="w-20 shrink-0 pt-0.5">
            <span className="text-[11px] font-mono text-[hsl(var(--muted-foreground))]">
              {date.slice(5)} {/* MM-DD */}
            </span>
          </div>

          {/* Commits for this date */}
          <div className="flex-1 space-y-1">
            {group.map((commit) => (
              <a
                key={commit.hash}
                href={`${REPO_URL}/commit/${commit.hash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors group"
              >
                <span className="font-mono text-[11px] opacity-40 group-hover:opacity-70 shrink-0">
                  {commit.hash}
                </span>
                <span className="truncate">{formatMessage(commit.message)}</span>
              </a>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
