import { getDashboardData } from "@/lib/data/load-data";
import { ProblemCard } from "@/components/problems/problem-card";
import { ProblemFilters } from "@/components/problems/problem-filters";
import { Suspense } from "react";
import type { Problem } from "@/lib/data/schema";

export const metadata = {
  title: "Problems",
  description: "Browse and filter all DSA problems.",
};

interface PageProps {
  searchParams: Promise<{
    q?: string;
    topic?: string;
    difficulty?: string;
    lang?: string;
    page?: string;
  }>;
}

const PAGE_SIZE = 30;

function filterProblems(
  problems: Problem[],
  q: string,
  topic: string,
  difficulty: string,
  lang: string
): Problem[] {
  const ql = q.toLowerCase();
  return problems.filter((p) => {
    if (
      q &&
      !p.name.toLowerCase().includes(ql) &&
      !p.topic.toLowerCase().includes(ql) &&
      !p.id.toLowerCase().includes(ql)
    )
      return false;
    if (topic && p.topic !== topic) return false;
    if (difficulty && p.difficulty !== difficulty) return false;
    if (lang && !p.solutions.some((s) => s.language === lang)) return false;
    return true;
  });
}

export default async function ProblemsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const { problems } = getDashboardData();

  const q = params.q ?? "";
  const topic = params.topic ?? "";
  const difficulty = params.difficulty ?? "";
  const lang = params.lang ?? "";
  const page = Math.max(1, parseInt(params.page ?? "1", 10));

  const filtered = filterProblems(problems, q, topic, difficulty, lang);
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const allTopics = [...new Set(problems.map((p) => p.topic))].sort();
  const allDifficulties = ["Easy", "Medium", "Hard", "Unknown"];
  const allLanguages = [
    ...new Set(problems.flatMap((p) => p.solutions.map((s) => s.language))),
  ].sort();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Problems</h1>
        <p className="text-[hsl(var(--muted-foreground))] mt-1">
          {problems.length} problems · all from NeetCode.io
        </p>
      </div>

      {/* Filters */}
      <Suspense>
        <ProblemFilters
          options={{ topics: allTopics, difficulties: allDifficulties, languages: allLanguages }}
          currentQuery={q}
          currentTopic={topic}
          currentDifficulty={difficulty}
          currentLanguage={lang}
          resultCount={filtered.length}
        />
      </Suspense>

      {/* Problem list */}
      {paginated.length === 0 ? (
        <div className="py-12 text-center text-[hsl(var(--muted-foreground))]">
          <p className="font-medium mb-1">Nothing found</p>
          <p className="text-sm">Try a different search or clear your filters.</p>
        </div>
      ) : (
        <>
          <div className="divide-y divide-[hsl(var(--border)/0.5)]">
            {paginated.map((p) => (
              <ProblemCard key={p.id} problem={p} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination current={page} total={totalPages} q={q} topic={topic} difficulty={difficulty} lang={lang} />
          )}
        </>
      )}
    </div>
  );
}

function Pagination({
  current, total, q, topic, difficulty, lang,
}: {
  current: number; total: number; q: string; topic: string; difficulty: string; lang: string;
}) {
  function buildHref(page: number) {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (topic) p.set("topic", topic);
    if (difficulty) p.set("difficulty", difficulty);
    if (lang) p.set("lang", lang);
    p.set("page", String(page));
    return `/problems?${p.toString()}`;
  }

  return (
    <nav className="flex items-center justify-center gap-4 pt-2 text-sm" aria-label="Pagination">
      {current > 1 && (
        <a href={buildHref(current - 1)} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
          ← prev
        </a>
      )}
      <span className="text-[hsl(var(--muted-foreground))] font-mono text-xs">
        {current} / {total}
      </span>
      {current < total && (
        <a href={buildHref(current + 1)} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
          next →
        </a>
      )}
    </nav>
  );
}
