// ---------------------------------------------------------------------------
// Core data types for the DSA Analytics Dashboard
// ---------------------------------------------------------------------------

export type Difficulty = "Easy" | "Medium" | "Hard" | "Unknown";

export interface Solution {
  id: string;
  filePath: string;           // relative path inside the repo
  language: string;           // e.g. "C++", "Python"
  extension: string;          // e.g. "cpp"
  submissionIndex: number;    // parsed from filename (submission-N)
  codeUrl: string;            // absolute GitHub raw/blob URL
  rawCode?: string;           // source code text (loaded on demand)
}

export interface Problem {
  id: string;                 // folder slug, e.g. "two-integer-sum"
  name: string;               // human-readable title
  topic: string;              // e.g. "Arrays & Hashing"
  difficulty: Difficulty;
  platform?: string;          // "NeetCode"
  problemUrl?: string;        // link to NeetCode/LeetCode problem
  solutions: Solution[];
}

export interface ActivityDay {
  date: string;               // YYYY-MM-DD
  commitCount: number;
}

export interface RecentCommit {
  hash: string;
  message: string;
  date: string;               // YYYY-MM-DD
  problemSlug?: string;       // extracted from commit message when possible
}

export interface RepositoryStats {
  totalUniqueProblems: number;
  totalSolutionFiles: number;
  totalCommits: number;
  totalActiveDays: number;
  languageCounts: Record<string, number>;
  topicCounts: Record<string, number>;
  difficultyCounts: Record<Difficulty, number>;
  activity: ActivityDay[];
  recentCommits: RecentCommit[];
  lastUpdated: string;        // ISO timestamp of generation
}

export interface DashboardData {
  stats: RepositoryStats;
  problems: Problem[];
}
