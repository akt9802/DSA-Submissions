#!/usr/bin/env node
/**
 * build-dsa-index.js
 *
 * Reads the DSA-Submissions repository and generates
 * lib/data/generated-data.json consumed by the Next.js app.
 *
 * Usage:  node scripts/build-dsa-index.js
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// ──────────────────────────────────────────────
// Configuration
// ──────────────────────────────────────────────

const REPO_ROOT = path.resolve(__dirname, "../../");
const SOLUTIONS_DIR = path.join(REPO_ROOT, "Data Structures & Algorithms");
const OUTPUT_PATH = path.resolve(__dirname, "../lib/data/generated-data.json");

const REPO_URL = "https://github.com/akt9802/DSA-Submissions";
const DEFAULT_BRANCH = "main";

const EXTENSION_LANGUAGE = {
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
// Problem Metadata Map
// ──────────────────────────────────────────────

const PROBLEM_METADATA = {
  // Arrays & Hashing
  "two-integer-sum":            { name: "Two Sum",                                topic: "Arrays & Hashing",    difficulty: "Easy",   url: "https://neetcode.io/problems/two-integer-sum" },
  "duplicate-integer":          { name: "Contains Duplicate",                     topic: "Arrays & Hashing",    difficulty: "Easy",   url: "https://neetcode.io/problems/duplicate-integer" },
  "is-anagram":                 { name: "Valid Anagram",                           topic: "Arrays & Hashing",    difficulty: "Easy",   url: "https://neetcode.io/problems/is-anagram" },
  "anagram-groups":             { name: "Group Anagrams",                          topic: "Arrays & Hashing",    difficulty: "Medium", url: "https://neetcode.io/problems/anagram-groups" },
  "concatenation-of-array":     { name: "Concatenation of Array",                 topic: "Arrays & Hashing",    difficulty: "Easy",   url: "https://neetcode.io/problems/concatenation-of-array" },
  "products-of-array-discluding-self": { name: "Products of Array Except Self",  topic: "Arrays & Hashing",    difficulty: "Medium", url: "https://neetcode.io/problems/products-of-array-discluding-self" },
  "longest-consecutive-sequence": { name: "Longest Consecutive Sequence",        topic: "Arrays & Hashing",    difficulty: "Medium", url: "https://neetcode.io/problems/longest-consecutive-sequence" },
  "valid-sudoku":               { name: "Valid Sudoku",                            topic: "Arrays & Hashing",    difficulty: "Medium", url: "https://leetcode.com/problems/valid-sudoku/" },
  "string-encode-and-decode":   { name: "Encode and Decode Strings",              topic: "Arrays & Hashing",    difficulty: "Medium", url: "https://neetcode.io/problems/string-encode-and-decode" },
  "first-missing-positive":     { name: "First Missing Positive",                 topic: "Arrays & Hashing",    difficulty: "Hard",   url: "https://leetcode.com/problems/first-missing-positive/" },
  "find-duplicate-integer":     { name: "Find the Duplicate Number",              topic: "Arrays & Hashing",    difficulty: "Medium", url: "https://neetcode.io/problems/find-duplicate-integer" },
  "subarray-sum-equals-k":      { name: "Subarray Sum Equals K",                  topic: "Arrays & Hashing",    difficulty: "Medium", url: "https://leetcode.com/problems/subarray-sum-equals-k/" },
  "majority-element":           { name: "Majority Element",                        topic: "Arrays & Hashing",    difficulty: "Easy",   url: "https://leetcode.com/problems/majority-element/" },
  "majority-element-ii":        { name: "Majority Element II",                     topic: "Arrays & Hashing",    difficulty: "Medium", url: "https://leetcode.com/problems/majority-element-ii/" },
  "merge-strings-alternately":  { name: "Merge Strings Alternately",              topic: "Arrays & Hashing",    difficulty: "Easy",   url: "https://leetcode.com/problems/merge-strings-alternately/" },

  // Two Pointers
  "two-integer-sum-ii":         { name: "Two Sum II",                              topic: "Two Pointers",        difficulty: "Medium", url: "https://neetcode.io/problems/two-integer-sum-ii" },
  "three-integer-sum":          { name: "3Sum",                                    topic: "Two Pointers",        difficulty: "Medium", url: "https://neetcode.io/problems/three-integer-sum" },
  "4sum":                       { name: "4Sum",                                    topic: "Two Pointers",        difficulty: "Medium", url: "https://leetcode.com/problems/4sum/" },
  "is-palindrome":              { name: "Valid Palindrome",                         topic: "Two Pointers",        difficulty: "Easy",   url: "https://neetcode.io/problems/is-palindrome" },
  "valid-palindrome-ii":        { name: "Valid Palindrome II",                     topic: "Two Pointers",        difficulty: "Easy",   url: "https://leetcode.com/problems/valid-palindrome-ii/" },
  "max-water-container":        { name: "Container With Most Water",               topic: "Two Pointers",        difficulty: "Medium", url: "https://neetcode.io/problems/max-water-container" },
  "boats-to-save-people":       { name: "Boats to Save People",                   topic: "Two Pointers",        difficulty: "Medium", url: "https://leetcode.com/problems/boats-to-save-people/" },
  "remove-element":             { name: "Remove Element",                          topic: "Two Pointers",        difficulty: "Easy",   url: "https://leetcode.com/problems/remove-element/" },
  "remove-duplicates-from-sorted-array": { name: "Remove Duplicates from Sorted Array", topic: "Two Pointers", difficulty: "Easy",   url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/" },
  "merge-sorted-array":         { name: "Merge Sorted Array",                      topic: "Two Pointers",        difficulty: "Easy",   url: "https://leetcode.com/problems/merge-sorted-array/" },
  "rotate-array":               { name: "Rotate Array",                            topic: "Two Pointers",        difficulty: "Medium", url: "https://leetcode.com/problems/rotate-array/" },
  "reverse-string":             { name: "Reverse String",                          topic: "Two Pointers",        difficulty: "Easy",   url: "https://leetcode.com/problems/reverse-string/" },
  "sort-colors":                { name: "Sort Colors",                             topic: "Two Pointers",        difficulty: "Medium", url: "https://leetcode.com/problems/sort-colors/" },

  // Sliding Window
  "buy-and-sell-crypto":        { name: "Best Time to Buy and Sell Stock",        topic: "Sliding Window",      difficulty: "Easy",   url: "https://neetcode.io/problems/buy-and-sell-crypto" },
  "best-time-to-buy-and-sell-stock-ii": { name: "Best Time to Buy and Sell Stock II", topic: "Sliding Window", difficulty: "Medium", url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/" },
  "longest-substring-without-duplicates": { name: "Longest Substring Without Repeating Characters", topic: "Sliding Window", difficulty: "Medium", url: "https://neetcode.io/problems/longest-substring-without-duplicates" },
  "longest-repeating-substring-with-replacement": { name: "Longest Repeating Character Replacement", topic: "Sliding Window", difficulty: "Medium", url: "https://neetcode.io/problems/longest-repeating-substring-with-replacement" },
  "permutation-string":         { name: "Permutation in String",                  topic: "Sliding Window",      difficulty: "Medium", url: "https://neetcode.io/problems/permutation-string" },
  "minimum-window-with-characters": { name: "Minimum Window Substring",          topic: "Sliding Window",      difficulty: "Hard",   url: "https://neetcode.io/problems/minimum-window-with-characters" },
  "contains-duplicate-ii":      { name: "Contains Duplicate II",                  topic: "Sliding Window",      difficulty: "Easy",   url: "https://neetcode.io/problems/contains-duplicate-ii" },
  "minimum-size-subarray-sum":  { name: "Minimum Size Subarray Sum",              topic: "Sliding Window",      difficulty: "Medium", url: "https://leetcode.com/problems/minimum-size-subarray-sum/" },

  // Stack
  "validate-parentheses":       { name: "Valid Parentheses",                       topic: "Stack",               difficulty: "Easy",   url: "https://neetcode.io/problems/validate-parentheses" },
  "minimum-stack":              { name: "Min Stack",                               topic: "Stack",               difficulty: "Medium", url: "https://neetcode.io/problems/minimum-stack" },
  "evaluate-reverse-polish-notation": { name: "Evaluate Reverse Polish Notation", topic: "Stack",               difficulty: "Medium", url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
  "daily-temperatures":         { name: "Daily Temperatures",                      topic: "Stack",               difficulty: "Medium", url: "https://leetcode.com/problems/daily-temperatures/" },
  "car-fleet":                  { name: "Car Fleet",                               topic: "Stack",               difficulty: "Medium", url: "https://neetcode.io/problems/car-fleet" },
  "asteroid-collision":         { name: "Asteroid Collision",                      topic: "Stack",               difficulty: "Medium", url: "https://leetcode.com/problems/asteroid-collision/" },
  "baseball-game":              { name: "Baseball Game",                           topic: "Stack",               difficulty: "Easy",   url: "https://leetcode.com/problems/baseball-game/" },
  "decode-string":              { name: "Decode String",                           topic: "Stack",               difficulty: "Medium", url: "https://leetcode.com/problems/decode-string/" },
  "simplify-path":              { name: "Simplify Path",                           topic: "Stack",               difficulty: "Medium", url: "https://leetcode.com/problems/simplify-path/" },
  "implement-stack-using-queues": { name: "Implement Stack using Queues",         topic: "Stack",               difficulty: "Easy",   url: "https://leetcode.com/problems/implement-stack-using-queues/" },
  "implement-queue-using-stacks": { name: "Implement Queue using Stacks",         topic: "Stack",               difficulty: "Easy",   url: "https://leetcode.com/problems/implement-queue-using-stacks/" },

  // Linked List
  "reverse-a-linked-list":      { name: "Reverse Linked List",                    topic: "Linked List",         difficulty: "Easy",   url: "https://neetcode.io/problems/reverse-a-linked-list" },
  "merge-two-sorted-linked-lists": { name: "Merge Two Sorted Lists",             topic: "Linked List",         difficulty: "Easy",   url: "https://neetcode.io/problems/merge-two-sorted-linked-lists" },
  "linked-list-cycle-detection": { name: "Linked List Cycle",                     topic: "Linked List",         difficulty: "Easy",   url: "https://neetcode.io/problems/linked-list-cycle-detection" },
  "reorder-linked-list":        { name: "Reorder List",                           topic: "Linked List",         difficulty: "Medium", url: "https://neetcode.io/problems/reorder-linked-list" },
  "remove-node-from-end-of-linked-list": { name: "Remove Nth Node From End of List", topic: "Linked List",     difficulty: "Medium", url: "https://neetcode.io/problems/remove-node-from-end-of-linked-list" },
  "add-two-numbers":            { name: "Add Two Numbers",                         topic: "Linked List",         difficulty: "Medium", url: "https://leetcode.com/problems/add-two-numbers/" },
  "reverse-linked-list-ii":     { name: "Reverse Linked List II",                 topic: "Linked List",         difficulty: "Medium", url: "https://leetcode.com/problems/reverse-linked-list-ii/" },

  // Heap / Priority Queue
  "kth-largest-integer-in-a-stream": { name: "Kth Largest Element in a Stream",  topic: "Heap / Priority Queue", difficulty: "Easy", url: "https://neetcode.io/problems/kth-largest-integer-in-a-stream" },
  "last-stone-weight":          { name: "Last Stone Weight",                       topic: "Heap / Priority Queue", difficulty: "Easy", url: "https://neetcode.io/problems/last-stone-weight" },
  "k-closest-points-to-origin": { name: "K Closest Points to Origin",            topic: "Heap / Priority Queue", difficulty: "Medium", url: "https://neetcode.io/problems/k-closest-points-to-origin" },
  "kth-largest-element-in-an-array": { name: "Kth Largest Element in an Array",  topic: "Heap / Priority Queue", difficulty: "Medium", url: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
  "task-scheduling":            { name: "Task Scheduler",                          topic: "Heap / Priority Queue", difficulty: "Medium", url: "https://neetcode.io/problems/task-scheduling" },
  "design-twitter-feed":        { name: "Design Twitter",                          topic: "Heap / Priority Queue", difficulty: "Medium", url: "https://neetcode.io/problems/design-twitter-feed" },
  "find-k-closest-elements":    { name: "Find K Closest Elements",                topic: "Heap / Priority Queue", difficulty: "Medium", url: "https://leetcode.com/problems/find-k-closest-elements/" },
  "single-threaded-cpu":        { name: "Single-Threaded CPU",                    topic: "Heap / Priority Queue", difficulty: "Medium", url: "https://leetcode.com/problems/single-threaded-cpu/" },
  "reorganize-string":          { name: "Reorganize String",                       topic: "Heap / Priority Queue", difficulty: "Medium", url: "https://leetcode.com/problems/reorganize-string/" },
  "top-k-elements-in-list":     { name: "Top K Frequent Elements",                topic: "Heap / Priority Queue", difficulty: "Medium", url: "https://neetcode.io/problems/top-k-elements-in-list" },
  "longest-happy-string":       { name: "Longest Happy String",                   topic: "Heap / Priority Queue", difficulty: "Medium", url: "https://leetcode.com/problems/longest-happy-string/" },
  "sort-an-array":              { name: "Sort an Array",                           topic: "Heap / Priority Queue", difficulty: "Medium", url: "https://leetcode.com/problems/sort-an-array/" },

  // Design
  "design-hashset":             { name: "Design HashSet",                          topic: "Design",              difficulty: "Easy",   url: "https://leetcode.com/problems/design-hashset/" },
  "design-hashmap":             { name: "Design HashMap",                          topic: "Design",              difficulty: "Easy",   url: "https://leetcode.com/problems/design-hashmap/" },

  // Strings
  "longest-common-prefix":      { name: "Longest Common Prefix",                  topic: "Strings",             difficulty: "Easy",   url: "https://leetcode.com/problems/longest-common-prefix/" },
};

// ──────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────

function getLanguage(ext) {
  return EXTENSION_LANGUAGE[ext.toLowerCase()] || "Unknown";
}

function parseSubmissionIndex(filename) {
  const match = filename.match(/submission-(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function slugToTitle(slug) {
  return slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function getMetadata(slug) {
  return PROBLEM_METADATA[slug] || {
    name: slugToTitle(slug),
    topic: "Unknown",
    difficulty: "Unknown",
    url: undefined,
  };
}

function blobUrl(relativePath) {
  const encoded = relativePath.split("/").map(s => encodeURIComponent(s)).join("/");
  return `${REPO_URL}/blob/${DEFAULT_BRANCH}/${encoded}`;
}

function runGit(args) {
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

function extractProblems() {
  if (!fs.existsSync(SOLUTIONS_DIR)) {
    console.error("Solutions directory not found:", SOLUTIONS_DIR);
    return [];
  }

  const problems = [];
  const problemDirs = fs.readdirSync(SOLUTIONS_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .sort();

  for (const slug of problemDirs) {
    const problemDir = path.join(SOLUTIONS_DIR, slug);
    const solutionFiles = fs.readdirSync(problemDir, { withFileTypes: true })
      .filter(f => f.isFile() && !f.name.startsWith(".") && /submission-\d+/.test(f.name))
      .sort((a, b) => parseSubmissionIndex(a.name) - parseSubmissionIndex(b.name));

    if (solutionFiles.length === 0) {
      console.warn(`  ⚠ No submission files in: ${slug}`);
      continue;
    }

    const solutions = solutionFiles.map(f => {
      const ext = f.name.split(".").pop() || "";
      const relPath = `Data Structures & Algorithms/${slug}/${f.name}`;
      const absPath = path.join(problemDir, f.name);
      let rawCode;
      try {
        rawCode = fs.readFileSync(absPath, "utf-8");
      } catch {
        rawCode = undefined;
      }
      return {
        id: `${slug}__${f.name}`,
        filePath: relPath,
        language: getLanguage(ext),
        extension: ext,
        submissionIndex: parseSubmissionIndex(f.name),
        codeUrl: blobUrl(relPath),
        rawCode,
      };
    });

    const meta = getMetadata(slug);
    problems.push({
      id: slug,
      name: meta.name,
      topic: meta.topic,
      difficulty: meta.difficulty,
      platform: "NeetCode",
      problemUrl: meta.url,
      solutions,
    });
  }

  console.log(`✓ Extracted ${problems.length} unique problems`);
  return problems;
}

function extractActivity() {
  const logRaw = runGit(`log --format="%H|%ad|%s" --date=short`);

  if (!logRaw) {
    console.warn("  ⚠ Could not read git history — activity will be empty");
    return { activity: [], recentCommits: [], totalCommits: 0 };
  }

  const lines = logRaw.split("\n").filter(Boolean);
  const countByDate = {};
  const commits = [];

  for (const line of lines) {
    const pipeIdx = line.indexOf("|");
    const hash = line.substring(0, pipeIdx);
    const rest = line.substring(pipeIdx + 1);
    const pipe2 = rest.indexOf("|");
    const date = rest.substring(0, pipe2);
    const message = rest.substring(pipe2 + 1);

    countByDate[date] = (countByDate[date] || 0) + 1;

    const slugMatch = message.match(/Add:\s+([\w-]+)\s+-\s+submission/i);
    commits.push({
      hash: hash.substring(0, 8),
      message,
      date,
      problemSlug: slugMatch ? slugMatch[1] : undefined,
    });
  }

  const activity = Object.entries(countByDate)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, commitCount]) => ({ date, commitCount }));

  return { activity, recentCommits: commits.slice(0, 20), totalCommits: lines.length };
}

function buildStats(problems, activity, recentCommits, totalCommits) {
  const totalSolutionFiles = problems.reduce((sum, p) => sum + p.solutions.length, 0);
  const languageCounts = {};
  const topicCounts = {};
  const difficultyCounts = { Easy: 0, Medium: 0, Hard: 0, Unknown: 0 };

  for (const problem of problems) {
    topicCounts[problem.topic] = (topicCounts[problem.topic] || 0) + 1;
    difficultyCounts[problem.difficulty] = (difficultyCounts[problem.difficulty] || 0) + 1;
    for (const sol of problem.solutions) {
      languageCounts[sol.language] = (languageCounts[sol.language] || 0) + 1;
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

function main() {
  console.log("📊 Building DSA Analytics data index…\n");
  const problems = extractProblems();
  const { activity, recentCommits, totalCommits } = extractActivity();
  const stats = buildStats(problems, activity, recentCommits, totalCommits);
  const data = { stats, problems };

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(data, null, 2), "utf-8");
  console.log(`\n✅ Generated: ${OUTPUT_PATH}`);
  console.log(`   Problems   : ${stats.totalUniqueProblems}`);
  console.log(`   Solutions  : ${stats.totalSolutionFiles}`);
  console.log(`   Commits    : ${stats.totalCommits}`);
  console.log(`   Active days: ${stats.totalActiveDays}`);
  console.log(`   Languages  : ${Object.keys(stats.languageCounts).join(", ")}`);
}

main();
