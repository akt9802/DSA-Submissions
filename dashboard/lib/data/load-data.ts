import type { DashboardData } from "./schema";
import path from "path";
import fs from "fs";

// This module loads the generated JSON index at build time (server-side only).
// The JSON file is produced by running:  node scripts/build-dsa-index.js

const JSON_PATH = path.join(process.cwd(), "lib/data/generated-data.json");

let cachedData: DashboardData | null = null;

export function getDashboardData(): DashboardData {
  if (cachedData) return cachedData;

  try {
    const raw = fs.readFileSync(JSON_PATH, "utf-8");
    cachedData = JSON.parse(raw) as DashboardData;
    return cachedData;
  } catch {
    // Return a safe empty state if JSON has not been generated yet
    const empty: DashboardData = {
      stats: {
        totalUniqueProblems: 0,
        totalSolutionFiles: 0,
        totalCommits: 0,
        totalActiveDays: 0,
        languageCounts: {},
        topicCounts: {},
        difficultyCounts: { Easy: 0, Medium: 0, Hard: 0, Unknown: 0 },
        activity: [],
        recentCommits: [],
        lastUpdated: new Date().toISOString(),
      },
      problems: [],
    };
    return empty;
  }
}

export function getProblem(id: string) {
  const data = getDashboardData();
  return data.problems.find((p) => p.id === id) ?? null;
}
