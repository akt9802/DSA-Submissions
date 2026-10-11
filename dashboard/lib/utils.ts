import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function difficultyColor(difficulty: string): string {
  switch (difficulty) {
    case "Easy":
      return "text-green-400";
    case "Medium":
      return "text-amber-400";
    case "Hard":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
}

export function difficultyBg(difficulty: string): string {
  switch (difficulty) {
    case "Easy":
      return "bg-green-400/10 text-green-400 border-green-400/20";
    case "Medium":
      return "bg-amber-400/10 text-amber-400 border-amber-400/20";
    case "Hard":
      return "bg-red-400/10 text-red-400 border-red-400/20";
    default:
      return "bg-gray-400/10 text-gray-400 border-gray-400/20";
  }
}

export function topicColor(topic: string): string {
  const palette: Record<string, string> = {
    "Arrays & Hashing": "#3b82f6",
    "Two Pointers": "#8b5cf6",
    "Sliding Window": "#06b6d4",
    Stack: "#f59e0b",
    "Linked List": "#10b981",
    "Heap / Priority Queue": "#ef4444",
    Design: "#ec4899",
    Strings: "#84cc16",
    Unknown: "#6b7280",
  };
  return palette[topic] ?? "#6b7280";
}
