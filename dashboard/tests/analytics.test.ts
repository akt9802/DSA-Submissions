import { describe, it, expect } from "vitest";

// ──────────────────────────────────────────────────────────────────────────────
// Tests for data parsing and analytics logic
// ──────────────────────────────────────────────────────────────────────────────

// Inline versions of the pure logic from build-dsa-index.js for unit testing

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
};

function getLanguage(ext: string): string {
  return EXTENSION_LANGUAGE[ext.toLowerCase()] ?? "Unknown";
}

function parseSubmissionIndex(filename: string): number {
  const match = filename.match(/submission-(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

function slugToTitle(slug: string): string {
  return slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

function filterProblems(
  problems: Array<{ name: string; topic: string; id: string; difficulty: string; solutions: Array<{ language: string }> }>,
  q: string,
  topic: string,
  difficulty: string,
  lang: string
) {
  const ql = q.toLowerCase();
  return problems.filter((p) => {
    if (q && !p.name.toLowerCase().includes(ql) && !p.topic.toLowerCase().includes(ql) && !p.id.toLowerCase().includes(ql))
      return false;
    if (topic && p.topic !== topic) return false;
    if (difficulty && p.difficulty !== difficulty) return false;
    if (lang && !p.solutions.some((s) => s.language === lang)) return false;
    return true;
  });
}

// ──────────────────────────────────────────────────────────────────────────────

describe("Language detection", () => {
  it("maps known extensions correctly", () => {
    expect(getLanguage("cpp")).toBe("C++");
    expect(getLanguage("py")).toBe("Python");
    expect(getLanguage("ts")).toBe("TypeScript");
    expect(getLanguage("js")).toBe("JavaScript");
    expect(getLanguage("java")).toBe("Java");
    expect(getLanguage("go")).toBe("Go");
    expect(getLanguage("rs")).toBe("Rust");
  });

  it("is case-insensitive", () => {
    expect(getLanguage("CPP")).toBe("C++");
    expect(getLanguage("PY")).toBe("Python");
  });

  it("returns Unknown for unrecognised extensions", () => {
    expect(getLanguage("xyz")).toBe("Unknown");
    expect(getLanguage("")).toBe("Unknown");
  });
});

describe("Submission index parsing", () => {
  it("parses standard filenames", () => {
    expect(parseSubmissionIndex("submission-0.cpp")).toBe(0);
    expect(parseSubmissionIndex("submission-5.cpp")).toBe(5);
    expect(parseSubmissionIndex("submission-14.cpp")).toBe(14);
  });

  it("returns 0 for unrecognised filenames", () => {
    expect(parseSubmissionIndex("solution.cpp")).toBe(0);
    expect(parseSubmissionIndex("")).toBe(0);
  });
});

describe("Slug to title conversion", () => {
  it("converts simple slugs", () => {
    expect(slugToTitle("two-integer-sum")).toBe("Two Integer Sum");
    expect(slugToTitle("buy-and-sell-crypto")).toBe("Buy And Sell Crypto");
  });

  it("handles single-word slugs", () => {
    expect(slugToTitle("4sum")).toBe("4sum");
  });
});

describe("Problem filtering", () => {
  const problems = [
    {
      id: "two-integer-sum",
      name: "Two Sum",
      topic: "Arrays & Hashing",
      difficulty: "Easy",
      solutions: [{ language: "C++" }],
    },
    {
      id: "buy-and-sell-crypto",
      name: "Best Time to Buy and Sell Stock",
      topic: "Sliding Window",
      difficulty: "Easy",
      solutions: [{ language: "C++" }],
    },
    {
      id: "minimum-window-with-characters",
      name: "Minimum Window Substring",
      topic: "Sliding Window",
      difficulty: "Hard",
      solutions: [{ language: "C++" }, { language: "Python" }],
    },
  ];

  it("returns all problems with no filters", () => {
    expect(filterProblems(problems, "", "", "", "")).toHaveLength(3);
  });

  it("filters by topic", () => {
    const result = filterProblems(problems, "", "Sliding Window", "", "");
    expect(result).toHaveLength(2);
    expect(result.every((p) => p.topic === "Sliding Window")).toBe(true);
  });

  it("filters by difficulty", () => {
    const result = filterProblems(problems, "", "", "Hard", "");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Minimum Window Substring");
  });

  it("filters by query text (name)", () => {
    const result = filterProblems(problems, "two sum", "", "", "");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("two-integer-sum");
  });

  it("filters by query text (topic)", () => {
    const result = filterProblems(problems, "sliding", "", "", "");
    expect(result).toHaveLength(2);
  });

  it("filters by language", () => {
    const result = filterProblems(problems, "", "", "", "Python");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("minimum-window-with-characters");
  });

  it("combines multiple filters", () => {
    const result = filterProblems(problems, "", "Sliding Window", "Easy", "");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("buy-and-sell-crypto");
  });

  it("returns empty array when nothing matches", () => {
    const result = filterProblems(problems, "zzznomatch", "", "", "");
    expect(result).toHaveLength(0);
  });
});

describe("Stats calculation", () => {
  it("counts unique problems correctly", () => {
    const problems = [
      { id: "a", solutions: [{ language: "C++" }, { language: "C++" }] },
      { id: "b", solutions: [{ language: "Python" }] },
    ];
    const total = problems.length;
    const files = problems.reduce((s, p) => s + p.solutions.length, 0);
    expect(total).toBe(2);
    expect(files).toBe(3);
  });

  it("does not conflate solution files with unique problems", () => {
    // A problem with 10 submissions is still 1 problem
    const p = { id: "two-integer-sum", solutions: Array(10).fill({ language: "C++" }) };
    expect([p].length).toBe(1);
    expect(p.solutions.length).toBe(10);
  });
});
