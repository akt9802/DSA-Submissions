"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";
import { X } from "lucide-react";

interface FilterOptions {
  topics: string[];
  difficulties: string[];
  languages: string[];
}

interface ProblemFiltersProps {
  options: FilterOptions;
  currentQuery: string;
  currentTopic: string;
  currentDifficulty: string;
  currentLanguage: string;
  resultCount: number;
}

export function ProblemFilters({
  options,
  currentQuery,
  currentTopic,
  currentDifficulty,
  currentLanguage,
  resultCount,
}: ProblemFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value) params.set(key, value);
        else params.delete(key);
      }
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  const update = (key: string, value: string) =>
    router.push(`${pathname}?${createQueryString({ [key]: value })}`, { scroll: false });

  const clearAll = () => router.push(pathname, { scroll: false });

  const hasFilters = currentQuery || currentTopic || currentDifficulty || currentLanguage;

  return (
    <div className="space-y-3">
      {/* Search */}
      <input
        type="search"
        placeholder="search by name, topic, or slug…"
        defaultValue={currentQuery}
        onChange={(e) => update("q", e.target.value)}
        className="w-full px-0 py-2 bg-transparent border-0 border-b border-[hsl(var(--border))] text-sm placeholder:text-[hsl(var(--muted-foreground))] focus:outline-none focus:border-[hsl(var(--foreground))] transition-colors"
        aria-label="Search problems"
      />

      {/* Filter row */}
      <div className="flex flex-wrap gap-2 items-center text-sm">
        <select
          value={currentTopic}
          onChange={(e) => update("topic", e.target.value)}
          className="bg-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] border-0 text-xs cursor-pointer focus:outline-none transition-colors appearance-none pr-4"
          style={{ backgroundImage: "none" }}
          aria-label="Filter by topic"
        >
          <option value="">all topics</option>
          {options.topics.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>

        <span className="text-[hsl(var(--border))]">·</span>

        <select
          value={currentDifficulty}
          onChange={(e) => update("difficulty", e.target.value)}
          className="bg-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] border-0 text-xs cursor-pointer focus:outline-none transition-colors appearance-none pr-4"
          style={{ backgroundImage: "none" }}
          aria-label="Filter by difficulty"
        >
          <option value="">all difficulties</option>
          {options.difficulties.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>

        <span className="text-[hsl(var(--border))]">·</span>

        <select
          value={currentLanguage}
          onChange={(e) => update("lang", e.target.value)}
          className="bg-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] border-0 text-xs cursor-pointer focus:outline-none transition-colors appearance-none pr-4"
          style={{ backgroundImage: "none" }}
          aria-label="Filter by language"
        >
          <option value="">all languages</option>
          {options.languages.map((l) => <option key={l} value={l}>{l}</option>)}
        </select>

        <div className="ml-auto flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
          <span>{resultCount} results</span>
          {hasFilters && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1 hover:text-[hsl(var(--foreground))] transition-colors"
            >
              <X className="w-3 h-3" />
              clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
