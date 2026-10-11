import type { Difficulty } from "./schema";

// ---------------------------------------------------------------------------
// Curated metadata for problems found in the repository.
// Source: NeetCode.io problem list.
// Difficulty is based on the NeetCode difficulty classification.
// Update this map when new problems are added to the repository.
// ---------------------------------------------------------------------------

export interface ProblemMeta {
  name: string;
  topic: string;
  difficulty: Difficulty;
  neetcodeUrl?: string;
  leetcodeUrl?: string;
}

export const PROBLEM_METADATA: Record<string, ProblemMeta> = {
  // ── Arrays & Hashing ────────────────────────────────────────────────────
  "two-integer-sum": {
    name: "Two Sum",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    neetcodeUrl: "https://neetcode.io/problems/two-integer-sum",
    leetcodeUrl: "https://leetcode.com/problems/two-sum/",
  },
  "duplicate-integer": {
    name: "Contains Duplicate",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    neetcodeUrl: "https://neetcode.io/problems/duplicate-integer",
    leetcodeUrl: "https://leetcode.com/problems/contains-duplicate/",
  },
  "is-anagram": {
    name: "Valid Anagram",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    neetcodeUrl: "https://neetcode.io/problems/is-anagram",
    leetcodeUrl: "https://leetcode.com/problems/valid-anagram/",
  },
  "anagram-groups": {
    name: "Group Anagrams",
    topic: "Arrays & Hashing",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/anagram-groups",
    leetcodeUrl: "https://leetcode.com/problems/group-anagrams/",
  },
  "concatenation-of-array": {
    name: "Concatenation of Array",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    neetcodeUrl: "https://neetcode.io/problems/concatenation-of-array",
    leetcodeUrl: "https://leetcode.com/problems/concatenation-of-array/",
  },
  "products-of-array-discluding-self": {
    name: "Products of Array Except Self",
    topic: "Arrays & Hashing",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/products-of-array-discluding-self",
    leetcodeUrl: "https://leetcode.com/problems/product-of-array-except-self/",
  },
  "longest-consecutive-sequence": {
    name: "Longest Consecutive Sequence",
    topic: "Arrays & Hashing",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/longest-consecutive-sequence",
    leetcodeUrl: "https://leetcode.com/problems/longest-consecutive-sequence/",
  },
  "valid-sudoku": {
    name: "Valid Sudoku",
    topic: "Arrays & Hashing",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/valid-sudoku",
    leetcodeUrl: "https://leetcode.com/problems/valid-sudoku/",
  },
  "string-encode-and-decode": {
    name: "Encode and Decode Strings",
    topic: "Arrays & Hashing",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/string-encode-and-decode",
  },
  "first-missing-positive": {
    name: "First Missing Positive",
    topic: "Arrays & Hashing",
    difficulty: "Hard",
    neetcodeUrl: "https://neetcode.io/problems/first-missing-positive",
    leetcodeUrl: "https://leetcode.com/problems/first-missing-positive/",
  },
  "find-duplicate-integer": {
    name: "Find the Duplicate Number",
    topic: "Arrays & Hashing",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/find-duplicate-integer",
    leetcodeUrl: "https://leetcode.com/problems/find-the-duplicate-number/",
  },
  "subarray-sum-equals-k": {
    name: "Subarray Sum Equals K",
    topic: "Arrays & Hashing",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/subarray-sum-equals-k",
    leetcodeUrl: "https://leetcode.com/problems/subarray-sum-equals-k/",
  },
  "majority-element": {
    name: "Majority Element",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    neetcodeUrl: "https://neetcode.io/problems/majority-element",
    leetcodeUrl: "https://leetcode.com/problems/majority-element/",
  },
  "majority-element-ii": {
    name: "Majority Element II",
    topic: "Arrays & Hashing",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/majority-element-ii",
    leetcodeUrl: "https://leetcode.com/problems/majority-element-ii/",
  },
  "merge-strings-alternately": {
    name: "Merge Strings Alternately",
    topic: "Arrays & Hashing",
    difficulty: "Easy",
    leetcodeUrl: "https://leetcode.com/problems/merge-strings-alternately/",
  },

  // ── Two Pointers ─────────────────────────────────────────────────────────
  "two-integer-sum-ii": {
    name: "Two Sum II",
    topic: "Two Pointers",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/two-integer-sum-ii",
    leetcodeUrl: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/",
  },
  "three-integer-sum": {
    name: "3Sum",
    topic: "Two Pointers",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/three-integer-sum",
    leetcodeUrl: "https://leetcode.com/problems/3sum/",
  },
  "4sum": {
    name: "4Sum",
    topic: "Two Pointers",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/4sum/",
  },
  "is-palindrome": {
    name: "Valid Palindrome",
    topic: "Two Pointers",
    difficulty: "Easy",
    neetcodeUrl: "https://neetcode.io/problems/is-palindrome",
    leetcodeUrl: "https://leetcode.com/problems/valid-palindrome/",
  },
  "valid-palindrome-ii": {
    name: "Valid Palindrome II",
    topic: "Two Pointers",
    difficulty: "Easy",
    leetcodeUrl: "https://leetcode.com/problems/valid-palindrome-ii/",
  },
  "max-water-container": {
    name: "Container With Most Water",
    topic: "Two Pointers",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/max-water-container",
    leetcodeUrl: "https://leetcode.com/problems/container-with-most-water/",
  },
  "boats-to-save-people": {
    name: "Boats to Save People",
    topic: "Two Pointers",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/boats-to-save-people/",
  },
  "remove-element": {
    name: "Remove Element",
    topic: "Two Pointers",
    difficulty: "Easy",
    leetcodeUrl: "https://leetcode.com/problems/remove-element/",
  },
  "remove-duplicates-from-sorted-array": {
    name: "Remove Duplicates from Sorted Array",
    topic: "Two Pointers",
    difficulty: "Easy",
    leetcodeUrl: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/",
  },
  "merge-sorted-array": {
    name: "Merge Sorted Array",
    topic: "Two Pointers",
    difficulty: "Easy",
    leetcodeUrl: "https://leetcode.com/problems/merge-sorted-array/",
  },
  "rotate-array": {
    name: "Rotate Array",
    topic: "Two Pointers",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/rotate-array/",
  },
  "reverse-string": {
    name: "Reverse String",
    topic: "Two Pointers",
    difficulty: "Easy",
    leetcodeUrl: "https://leetcode.com/problems/reverse-string/",
  },
  "sort-colors": {
    name: "Sort Colors",
    topic: "Two Pointers",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/sort-colors/",
  },

  // ── Sliding Window ───────────────────────────────────────────────────────
  "buy-and-sell-crypto": {
    name: "Best Time to Buy and Sell Stock",
    topic: "Sliding Window",
    difficulty: "Easy",
    neetcodeUrl: "https://neetcode.io/problems/buy-and-sell-crypto",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
  },
  "best-time-to-buy-and-sell-stock-ii": {
    name: "Best Time to Buy and Sell Stock II",
    topic: "Sliding Window",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/",
  },
  "longest-substring-without-duplicates": {
    name: "Longest Substring Without Repeating Characters",
    topic: "Sliding Window",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/longest-substring-without-duplicates",
    leetcodeUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
  },
  "longest-repeating-substring-with-replacement": {
    name: "Longest Repeating Character Replacement",
    topic: "Sliding Window",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/longest-repeating-substring-with-replacement",
    leetcodeUrl: "https://leetcode.com/problems/longest-repeating-character-replacement/",
  },
  "permutation-string": {
    name: "Permutation in String",
    topic: "Sliding Window",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/permutation-string",
    leetcodeUrl: "https://leetcode.com/problems/permutation-in-string/",
  },
  "minimum-window-with-characters": {
    name: "Minimum Window Substring",
    topic: "Sliding Window",
    difficulty: "Hard",
    neetcodeUrl: "https://neetcode.io/problems/minimum-window-with-characters",
    leetcodeUrl: "https://leetcode.com/problems/minimum-window-substring/",
  },
  "contains-duplicate-ii": {
    name: "Contains Duplicate II",
    topic: "Sliding Window",
    difficulty: "Easy",
    neetcodeUrl: "https://neetcode.io/problems/contains-duplicate-ii",
    leetcodeUrl: "https://leetcode.com/problems/contains-duplicate-ii/",
  },
  "minimum-size-subarray-sum": {
    name: "Minimum Size Subarray Sum",
    topic: "Sliding Window",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/minimum-size-subarray-sum/",
  },

  // ── Stack ────────────────────────────────────────────────────────────────
  "validate-parentheses": {
    name: "Valid Parentheses",
    topic: "Stack",
    difficulty: "Easy",
    neetcodeUrl: "https://neetcode.io/problems/validate-parentheses",
    leetcodeUrl: "https://leetcode.com/problems/valid-parentheses/",
  },
  "minimum-stack": {
    name: "Min Stack",
    topic: "Stack",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/minimum-stack",
    leetcodeUrl: "https://leetcode.com/problems/min-stack/",
  },
  "evaluate-reverse-polish-notation": {
    name: "Evaluate Reverse Polish Notation",
    topic: "Stack",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/evaluate-reverse-polish-notation/",
  },
  "daily-temperatures": {
    name: "Daily Temperatures",
    topic: "Stack",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/daily-temperatures/",
  },
  "car-fleet": {
    name: "Car Fleet",
    topic: "Stack",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/car-fleet",
    leetcodeUrl: "https://leetcode.com/problems/car-fleet/",
  },
  "asteroid-collision": {
    name: "Asteroid Collision",
    topic: "Stack",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/asteroid-collision/",
  },
  "baseball-game": {
    name: "Baseball Game",
    topic: "Stack",
    difficulty: "Easy",
    leetcodeUrl: "https://leetcode.com/problems/baseball-game/",
  },
  "decode-string": {
    name: "Decode String",
    topic: "Stack",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/decode-string/",
  },
  "simplify-path": {
    name: "Simplify Path",
    topic: "Stack",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/simplify-path/",
  },
  "implement-stack-using-queues": {
    name: "Implement Stack using Queues",
    topic: "Stack",
    difficulty: "Easy",
    leetcodeUrl: "https://leetcode.com/problems/implement-stack-using-queues/",
  },
  "implement-queue-using-stacks": {
    name: "Implement Queue using Stacks",
    topic: "Stack",
    difficulty: "Easy",
    leetcodeUrl: "https://leetcode.com/problems/implement-queue-using-stacks/",
  },

  // ── Linked List ──────────────────────────────────────────────────────────
  "reverse-a-linked-list": {
    name: "Reverse Linked List",
    topic: "Linked List",
    difficulty: "Easy",
    neetcodeUrl: "https://neetcode.io/problems/reverse-a-linked-list",
    leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list/",
  },
  "merge-two-sorted-linked-lists": {
    name: "Merge Two Sorted Lists",
    topic: "Linked List",
    difficulty: "Easy",
    neetcodeUrl: "https://neetcode.io/problems/merge-two-sorted-linked-lists",
    leetcodeUrl: "https://leetcode.com/problems/merge-two-sorted-lists/",
  },
  "linked-list-cycle-detection": {
    name: "Linked List Cycle",
    topic: "Linked List",
    difficulty: "Easy",
    neetcodeUrl: "https://neetcode.io/problems/linked-list-cycle-detection",
    leetcodeUrl: "https://leetcode.com/problems/linked-list-cycle/",
  },
  "reorder-linked-list": {
    name: "Reorder List",
    topic: "Linked List",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/reorder-linked-list",
    leetcodeUrl: "https://leetcode.com/problems/reorder-list/",
  },
  "remove-node-from-end-of-linked-list": {
    name: "Remove Nth Node From End of List",
    topic: "Linked List",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/remove-node-from-end-of-linked-list",
    leetcodeUrl: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/",
  },
  "add-two-numbers": {
    name: "Add Two Numbers",
    topic: "Linked List",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/add-two-numbers/",
  },
  "reverse-linked-list-ii": {
    name: "Reverse Linked List II",
    topic: "Linked List",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/reverse-linked-list-ii/",
  },

  // ── Heap / Priority Queue ────────────────────────────────────────────────
  "kth-largest-integer-in-a-stream": {
    name: "Kth Largest Element in a Stream",
    topic: "Heap / Priority Queue",
    difficulty: "Easy",
    neetcodeUrl: "https://neetcode.io/problems/kth-largest-integer-in-a-stream",
    leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-a-stream/",
  },
  "last-stone-weight": {
    name: "Last Stone Weight",
    topic: "Heap / Priority Queue",
    difficulty: "Easy",
    neetcodeUrl: "https://neetcode.io/problems/last-stone-weight",
    leetcodeUrl: "https://leetcode.com/problems/last-stone-weight/",
  },
  "k-closest-points-to-origin": {
    name: "K Closest Points to Origin",
    topic: "Heap / Priority Queue",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/k-closest-points-to-origin",
    leetcodeUrl: "https://leetcode.com/problems/k-closest-points-to-origin/",
  },
  "kth-largest-element-in-an-array": {
    name: "Kth Largest Element in an Array",
    topic: "Heap / Priority Queue",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/kth-largest-element-in-an-array/",
  },
  "task-scheduling": {
    name: "Task Scheduler",
    topic: "Heap / Priority Queue",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/task-scheduling",
    leetcodeUrl: "https://leetcode.com/problems/task-scheduler/",
  },
  "design-twitter-feed": {
    name: "Design Twitter",
    topic: "Heap / Priority Queue",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/design-twitter-feed",
    leetcodeUrl: "https://leetcode.com/problems/design-twitter/",
  },
  "find-k-closest-elements": {
    name: "Find K Closest Elements",
    topic: "Heap / Priority Queue",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/find-k-closest-elements/",
  },
  "single-threaded-cpu": {
    name: "Single-Threaded CPU",
    topic: "Heap / Priority Queue",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/single-threaded-cpu/",
  },
  "reorganize-string": {
    name: "Reorganize String",
    topic: "Heap / Priority Queue",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/reorganize-string/",
  },
  "top-k-elements-in-list": {
    name: "Top K Frequent Elements",
    topic: "Heap / Priority Queue",
    difficulty: "Medium",
    neetcodeUrl: "https://neetcode.io/problems/top-k-elements-in-list",
    leetcodeUrl: "https://leetcode.com/problems/top-k-frequent-elements/",
  },
  "longest-happy-string": {
    name: "Longest Happy String",
    topic: "Heap / Priority Queue",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/longest-happy-string/",
  },
  "sort-an-array": {
    name: "Sort an Array",
    topic: "Heap / Priority Queue",
    difficulty: "Medium",
    leetcodeUrl: "https://leetcode.com/problems/sort-an-array/",
  },

  // ── Design / Hash Map ────────────────────────────────────────────────────
  "design-hashset": {
    name: "Design HashSet",
    topic: "Design",
    difficulty: "Easy",
    leetcodeUrl: "https://leetcode.com/problems/design-hashset/",
  },
  "design-hashmap": {
    name: "Design HashMap",
    topic: "Design",
    difficulty: "Easy",
    leetcodeUrl: "https://leetcode.com/problems/design-hashmap/",
  },

  // ── Strings ──────────────────────────────────────────────────────────────
  "longest-common-prefix": {
    name: "Longest Common Prefix",
    topic: "Strings",
    difficulty: "Easy",
    leetcodeUrl: "https://leetcode.com/problems/longest-common-prefix/",
  },
};

// Fallback for any slug not found in the map above
export function getMetadata(slug: string): ProblemMeta {
  return (
    PROBLEM_METADATA[slug] ?? {
      name: slugToTitle(slug),
      topic: "Unknown",
      difficulty: "Unknown",
    }
  );
}

// Convert a slug like "two-integer-sum" → "Two Integer Sum"
export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
