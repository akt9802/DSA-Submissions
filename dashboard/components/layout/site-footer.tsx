import { getDashboardData } from "@/lib/data/load-data";

export function SiteFooter() {
  const data = getDashboardData();
  const lastUpdated = new Date(data.stats.lastUpdated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <footer className="border-t border-[hsl(var(--border))] py-5 mt-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-1 text-xs text-[hsl(var(--muted-foreground))] font-mono">
        <span>data generated {lastUpdated}</span>
        <span>
          <a href="https://neetcode.io" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--foreground))] transition-colors">neetcode</a>
          {" · "}
          <a href="https://github.com/akt9802/DSA-Submissions" target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(var(--foreground))] transition-colors">akt9802/dsa-submissions</a>
        </span>
      </div>
    </footer>
  );
}
