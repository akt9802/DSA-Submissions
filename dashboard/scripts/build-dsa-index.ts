#!/usr/bin/env node
/**
 * build-dsa-index.ts
 *
 * Reads the DSA-Submissions repository (one level up from this dashboard)
 * and generates lib/data/generated-data.json.
 *
 * Run:  node --loader ts-node/esm scripts/build-dsa-index.ts
 *   or: npm run generate-data
 */

import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";
import { getMetadata } from "../lib/data/metadata";
import type {
  DashboardData,
  Problem,
  Solution,
  ActivityDay,
  RecentCommit,
  RepositoryStats,
} from "../lib/data/schema";
import { blobUrl } from "../lib/github/urls";

// ──────────────────────────────────────────────
// Configuration
// ──────────────────────────────────────────────

const REPO_ROOT = path.resolve(__dirname, "../../");
const SOLUTIONS_DIR = path.join(REPO_ROOT, "Data Structures & Algorithms");
const OUTPUT_PATH = path.resolve(__dirname, "../lib/data/generated-data.json");

const EXTENSION_LANGUAGE: Record<string, string> = {
  cpp: "C++",
  py: "Python",
  js: "JavaScript",
  ts: "TypeScript",
  java: "Java",
  cs: "C#",
  go: "Go",
  rs: "Rust",
  kt: "Kotlin",
  swift: "Swift",
  sql: "SQL",
  rb: "Ruby",
};

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function getLanguage(ext: string): string {
  return EXTENSION_LANGUAGE[ext.toLowerCase()] ?? "Unknown";
}

function parseSubmissionIndex(filename: string): number {
  const match = filename.match(/submission-(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function runGit(args: string): string {
  try {
    return execSync(`git -C "${REPO_ROOT}" ${args}`, {
      encoding: "utf-8",
      stdio: ["pipe", "pipe", "pipe"],
    }).trim();
  } catch {
    return "";
  }
}

// ──────────────────────────────────────────────
// Main extraction
// ──────────────────────────────────────────────

function extractProblems(): Problem[] {
  if (!fs.existsSync(SOLUTIONS_DIR)) {
    console.error(`Solutions directory not found: ${SOLUTIONS_DIR}`);
    return [];
  }

  const problems: Problem[] = [];
  const problemDirs = fs
    .readdirSync(SOLUTIONS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name)
    .sort();

  for (const slug of problemDirs) {
    const problemDir = path.join(SOLUTIONS_DIR, slug);
    const solutionFiles = fs
      .readdirSync(problemDir, { withFileTypes: true })
      .filter(
        (f) =>
          f.isFile() &&
          !f.name.startsWith(".") &&
          f.name.match(/submission-\d+/)
      )
      .sort((a, b) => {
        const ai = parseSubmissionIndex(a.name);
        const bi = parseSubmissionIndex(b.name);
        return ai - bi;
      });

    if (solutionFiles.length === 0) {
      console.warn(`  ⚠ No submission files in: ${slug}`);
      continue;
    }

    const solutions: Solution[] = solutionFiles.map((f) => {
      const ext = f.name.split(".").pop() ?? "";
      const relPath = `Data Structures & Algorithms/${slug}/${f.name}`;
      return {
        id: `${slug}__${f.name}`,
        filePath: relPath,
        language: getLanguage(ext),
        extension: ext,
        submissionIndex: parseSubmissionIndex(f.name),
        codeUrl: blobUrl(relPath),
      };
    });

    const meta = getMetadata(slug);

    problems.push({
      id: slug,
      name: meta.name,
      topic: meta.topic,
      difficulty: meta.difficulty,
      platform: "NeetCode",
      problemUrl: meta.neetcodeUrl ?? meta.leetcodeUrl,
      solutions,
    });
  }

  console.log(`✓ Extracted ${problems.length} unique problems`);
  return problems;
}

function extractActivity(): { activity: ActivityDay[]; recentCommits: RecentCommit[]; totalCommits: number } {
  const logRaw = runGit(
    `log --format="%H|%ad|%s" --date=short`
  );

  if (!logRaw) {
    console.warn("  ⚠ Could not read git history — activity will be empty");
    return { activity: [], recentCommits: [], totalCommits: 0 };
  }

  const lines = logRaw.split("\n").filter(Boolean);
  const countByDate: Record<string, number> = {};
  const commits: RecentCommit[] = [];

  for (const line of lines) {
    const [hash, date, ...messageParts] = line.split("|");
    const message = messageParts.join("|");
    countByDate[date] = (countByDate[date] ?? 0) + 1;

    // Extract problem slug from commit messages like "Add: two-integer-sum - submission-0"
    const slugMatch = message.match(/Add:\s+([\w-]+)\s+-\s+submission/i);

    commits.push({
      hash: hash.substring(0, 8),
      message,
      date,
      problemSlug: slugMatch?.[1],
    });
  }

  const activity: ActivityDay[] = Object.entries(countByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, commitCount]) => ({ date, commitCount }));

  const recentCommits = commits.slice(0, 20);

  console.log(
    `✓ Activity: ${activity.length} active days, ${lines.length} commits`
  );
  return { activity, recentCommits, totalCommits: lines.length };
}

function buildStats(
  problems: Problem[],
  activity: ActivityDay[],
  recentCommits: RecentCommit[],
  totalCommits: number
): RepositoryStats {
  const totalSolutionFiles = problems.reduce(
    (sum, p) => sum + p.solutions.length,
    0
  );

  const languageCounts: Record<string, number> = {};
  const topicCounts: Record<string, number> = {};
  const difficultyCounts = { Easy: 0, Medium: 0, Hard: 0, Unknown: 0 };

  for (const problem of problems) {
    topicCounts[problem.topic] = (topicCounts[problem.topic] ?? 0) + 1;
    difficultyCounts[problem.difficulty]++;

    for (const sol of problem.solutions) {
      languageCounts[sol.language] = (languageCounts[sol.language] ?? 0) + 1;
    }
  }

  return {
    totalUniqueProblems: problems.length,
    totalSolutionFiles,
    totalCommits,
    totalActiveDays: activity.length,
    languageCounts,
    topicCounts,
    difficultyCounts,
    activity,
    recentCommits,
    lastUpdated: new Date().toISOString(),
  };
}

// ──────────────────────────────────────────────
// Run
// ──────────────────────────────────────────────

function main() {
  console.log("📊 Building DSA Analytics data index…\n");

  const problems = extractProblems();
  const { activity, recentCommits, totalCommits } = extractActivity();
  const stats = buildStats(problems, activity, recentCommits, totalCommits);

  const data: DashboardData = { stats, problems };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2), "utf-8");

  console.log(`\n✅ Generated: ${OUTPUT_PATH}`);
  console.log(`   Problems  : ${stats.totalUniqueProblems}`);
  console.log(`   Solutions : ${stats.totalSolutionFiles}`);
  console.log(`   Commits   : ${stats.totalCommits}`);
  console.log(`   Active days: ${stats.totalActiveDays}`);
  console.log(`   Languages : ${Object.keys(stats.languageCounts).join(", ")}`);
}

main();
