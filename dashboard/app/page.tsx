import { getDashboardData } from "@/lib/data/load-data";
import { StatCard } from "@/components/dashboard/stat-card";
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap";
import { TopicChart } from "@/components/dashboard/topic-chart";
import { DifficultyChart } from "@/components/dashboard/difficulty-chart";
import { LanguageChart } from "@/components/dashboard/language-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const { stats } = getDashboardData();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-12">

      {/* Intro */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          My DSA journey, in numbers.
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] max-w-xl leading-relaxed">
          Problems solved on{" "}
          <a
            href="https://neetcode.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[hsl(var(--foreground))] underline underline-offset-2 decoration-[hsl(var(--border))] hover:decoration-[hsl(var(--accent))] transition-colors"
          >
            NeetCode.io
          </a>
          , synced automatically to{" "}
          <a
            href="https://github.com/akt9802/DSA-Submissions"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[hsl(var(--foreground))] underline underline-offset-2 decoration-[hsl(var(--border))] hover:decoration-[hsl(var(--accent))] transition-colors"
          >
            GitHub
          </a>
          .
        </p>
      </div>

      {/* Stats — horizontal strip, no cards */}
      <section aria-label="Overview statistics">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-6 gap-y-6">
          <StatCard
            label="Problems solved"
            value={stats.totalUniqueProblems}
            description="unique problem folders"
            accent="#4f7fff"
          />
          <StatCard
            label="Submissions"
            value={stats.totalSolutionFiles}
            description="total solution files"
            accent="#a78bfa"
          />
          <StatCard
            label="Commits"
            value={stats.totalCommits}
            description="pushes to GitHub"
            accent="#34d399"
          />
          <StatCard
            label="Active days"
            value={stats.totalActiveDays}
            description="days with commits"
            accent="#fbbf24"
          />
          <StatCard
            label="Language"
            value={Object.keys(stats.languageCounts).join(", ")}
            description="from file extensions"
            accent="#f87171"
          />
        </div>
      </section>

      {/* Heatmap */}
      <section aria-label="Activity heatmap">
        <ActivityHeatmap activity={stats.activity} />
      </section>

      {/* Topic + Difficulty */}
      <section
        aria-label="Topic and difficulty breakdown"
        className="grid grid-cols-1 lg:grid-cols-5 gap-6"
      >
        <div className="lg:col-span-3 space-y-3">
          <h2 className="text-sm font-medium text-[hsl(var(--muted-foreground))]">by topic</h2>
          <TopicChart topicCounts={stats.topicCounts} />
        </div>

        <div className="lg:col-span-2 space-y-3">
          <h2 className="text-sm font-medium text-[hsl(var(--muted-foreground))]">by difficulty</h2>
          <DifficultyChart difficultyCounts={stats.difficultyCounts} />
        </div>
      </section>

      {/* Language + Recent activity */}
      <section
        aria-label="Language and recent commits"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-[hsl(var(--muted-foreground))]">language breakdown</h2>
          <LanguageChart languageCounts={stats.languageCounts} />
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Derived from file extensions.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-medium text-[hsl(var(--muted-foreground))]">recent commits</h2>
            <a
              href="https://github.com/akt9802/DSA-Submissions/commits"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
            >
              view all →
            </a>
          </div>
          <RecentActivity commits={stats.recentCommits} />
        </div>
      </section>
    </div>
  );
}
