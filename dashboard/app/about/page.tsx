import { getDashboardData } from "@/lib/data/load-data";
import { Github, ExternalLink, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "How the DSA Analytics Dashboard works.",
};

export default async function AboutPage() {
  const { stats } = getDashboardData();
  const generated = new Date(stats.lastUpdated).toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">About This Dashboard</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">
          What you&apos;re looking at and how it works.
        </p>
      </div>

      {/* What is this */}
      <Card>
        <CardHeader>
          <CardTitle>What Is This?</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-[hsl(var(--foreground))] space-y-3 leading-relaxed">
          <p>
            This is a data-driven analytics dashboard for{" "}
            <a
              href="https://github.com/akt9802"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--accent))] hover:underline"
            >
              akt9802
            </a>
            &apos;s DSA problem-solving journey on{" "}
            <a
              href="https://neetcode.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[hsl(var(--accent))] hover:underline"
            >
              NeetCode.io
            </a>
            .
          </p>
          <p>
            NeetCode.io automatically syncs accepted solutions to GitHub. This
            dashboard reads that repository, extracts structured metadata, and
            presents an interactive analytics view.
          </p>
          <a
            href="https://github.com/akt9802/DSA-Submissions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[hsl(var(--border))] text-sm hover:border-[hsl(var(--accent))] hover:text-[hsl(var(--accent))] transition-colors"
          >
            <Github className="w-4 h-4" />
            akt9802/DSA-Submissions
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </CardContent>
      </Card>

      {/* Metric definitions */}
      <Card>
        <CardHeader>
          <CardTitle>Metric Definitions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm leading-relaxed">
          {[
            {
              term: "Unique Problems",
              def: "The count of distinct problem folders in the repository. Each folder (e.g. two-integer-sum/) corresponds to one problem.",
            },
            {
              term: "Solution Files",
              def: "The total number of submission files (submission-0.cpp, submission-1.cpp, etc.). Multiple files can belong to the same problem — they represent different attempts or approaches.",
            },
            {
              term: "Total Commits",
              def: "The number of Git commits in the repository. A single commit typically adds one submission file. This is NOT equivalent to unique problems solved.",
            },
            {
              term: "Active Days",
              def: "The number of distinct calendar days that have at least one commit. This measures repository activity, not new problems discovered on that day.",
            },
            {
              term: "Difficulty",
              def: "Mapped from a curated metadata table based on NeetCode.io's difficulty classification. Problems not yet in the table show 'Unknown'.",
            },
            {
              term: "Topic",
              def: "Mapped from the same metadata table (e.g. 'Arrays & Hashing', 'Sliding Window'). The repository folder structure does not encode topic information.",
            },
          ].map(({ term, def }) => (
            <div key={term} className="border-b border-[hsl(var(--border))] pb-3 last:border-0 last:pb-0">
              <p className="font-medium text-[hsl(var(--foreground))]">{term}</p>
              <p className="text-[hsl(var(--muted-foreground))] mt-0.5">{def}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* How it works */}
      <Card>
        <CardHeader>
          <CardTitle>How Data Is Generated</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed space-y-3 text-[hsl(var(--muted-foreground))]">
          <p>
            A Node.js script (<code className="font-mono text-[hsl(var(--foreground))]">scripts/build-dsa-index.js</code>) reads
            the repository files and Git log, then writes a JSON file consumed
            by the Next.js app at build time.
          </p>
          <p>
            To refresh the data after pushing new solutions, run:
          </p>
          <pre className="bg-[hsl(var(--muted))] rounded px-4 py-3 font-mono text-xs overflow-x-auto text-[hsl(var(--foreground))]">
            npm run generate-data
          </pre>
          <p>
            Data last generated: <span className="text-[hsl(var(--foreground))]">{generated}</span>
          </p>
        </CardContent>
      </Card>

      {/* Limitations */}
      <Card>
        <CardHeader>
          <CardTitle>Known Limitations</CardTitle>
        </CardHeader>
        <CardContent className="text-sm leading-relaxed space-y-2 text-[hsl(var(--muted-foreground))]">
          <div className="flex gap-2">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
            <p>All current solutions are in C++. The dashboard handles other languages but the repository currently contains only C++ files.</p>
          </div>
          <div className="flex gap-2">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
            <p>Difficulty and topic metadata are curated manually. Newly added problems may show &quot;Unknown&quot; until the metadata map is updated.</p>
          </div>
          <div className="flex gap-2">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
            <p>Commit dates reflect when solutions were pushed to GitHub, not when problems were originally solved on NeetCode.io.</p>
          </div>
          <div className="flex gap-2">
            <Info className="w-4 h-4 mt-0.5 shrink-0 text-amber-400" />
            <p>The dashboard does not connect to NeetCode.io or LeetCode APIs — all statistics come from the local repository.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
