import { getDashboardData, getProblem } from "@/lib/data/load-data";
import { notFound } from "next/navigation";
import { SolutionViewer } from "@/components/problems/solution-viewer";
import { difficultyColor, topicColor } from "@/lib/utils";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const { problems } = getDashboardData();
  return problems.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const problem = getProblem(id);
  if (!problem) return { title: "Problem Not Found" };
  return {
    title: problem.name,
    description: `${problem.topic} · ${problem.difficulty} · ${problem.solutions.length} submission(s)`,
  };
}

export default async function ProblemPage({ params }: PageProps) {
  const { id } = await params;
  const problem = getProblem(id);
  if (!problem) notFound();

  const languages = [...new Set(problem.solutions.map((s) => s.language))];
  const topicCol = topicColor(problem.topic);
  const diffCol = difficultyColor(problem.difficulty);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Back */}
      <Link
        href="/problems"
        className="inline-flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        problems
      </Link>

      {/* Header */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h1 className="text-2xl font-bold tracking-tight">{problem.name}</h1>
          {problem.problemUrl && (
            <a
              href={problem.problemUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
            >
              {problem.platform ?? "open"}
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span style={{ color: topicCol }} className="opacity-90">{problem.topic}</span>
          <span className={diffCol}>{problem.difficulty}</span>
          <span className="text-[hsl(var(--muted-foreground))]">{languages.join(", ")}</span>
          <span className="text-[hsl(var(--muted-foreground))]">
            {problem.solutions.length} submission{problem.solutions.length !== 1 ? "s" : ""}
          </span>
          <span className="font-mono text-xs text-[hsl(var(--muted-foreground))] opacity-50">
            {problem.id}
          </span>
        </div>

        {problem.difficulty === "Unknown" && (
          <p className="text-xs text-[hsl(var(--muted-foreground))] opacity-60">
            Difficulty not mapped — add it to <code className="font-mono">lib/data/metadata.ts</code>.
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-[hsl(var(--border))]" />

      {/* Solutions */}
      <SolutionViewer solutions={problem.solutions} problemName={problem.name} />

      <p className="text-[11px] text-[hsl(var(--muted-foreground))] opacity-50">
        Submissions from NeetCode.io. Correctness not verified by this dashboard.
      </p>
    </div>
  );
}
