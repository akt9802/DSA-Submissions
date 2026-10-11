"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import type { Solution } from "@/lib/data/schema";
import { Copy, Check, ExternalLink } from "lucide-react";

interface SolutionViewerProps {
  solutions: Solution[];
  problemName: string;
}

const EXT_LANG: Record<string, string> = {
  cpp: "cpp", py: "python", js: "javascript", ts: "typescript",
  java: "java", cs: "csharp", go: "go", rs: "rust", kt: "kotlin",
  swift: "swift", sql: "sql",
};

function getHljsLang(ext: string): string {
  return EXT_LANG[ext.toLowerCase()] ?? "plaintext";
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1 text-[11px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors px-2 py-1"
      aria-label="Copy code"
    >
      {copied
        ? <><Check className="w-3 h-3 text-green-400" /> copied</>
        : <><Copy className="w-3 h-3" /> copy</>}
    </button>
  );
}

export function SolutionViewer({ solutions }: SolutionViewerProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (solutions.length === 0) {
    return <p className="text-sm text-[hsl(var(--muted-foreground))]">No solutions available.</p>;
  }

  const active = solutions[activeIdx];

  return (
    <div>
      {/* Tab strip */}
      <div className="flex items-center border-b border-[hsl(var(--border))] mb-0 overflow-x-auto">
        {solutions.map((sol, i) => (
          <button
            key={sol.id}
            onClick={() => setActiveIdx(i)}
            className={`px-3 py-2 text-xs font-mono whitespace-nowrap transition-colors border-b-2 -mb-px ${
              i === activeIdx
                ? "border-[hsl(var(--accent))] text-[hsl(var(--foreground))]"
                : "border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
            }`}
          >
            sub-{sol.submissionIndex}.{sol.extension}
          </button>
        ))}

        {/* Actions pinned right */}
        <div className="ml-auto flex items-center shrink-0 pl-2">
          {active.rawCode && <CopyButton code={active.rawCode} />}
          <a
            href={active.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[11px] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors px-2 py-1"
            aria-label="View on GitHub"
          >
            <ExternalLink className="w-3 h-3" />
            GitHub
          </a>
        </div>
      </div>

      {/* Code */}
      {active.rawCode ? (
        <div className="overflow-auto max-h-[600px] rounded-b-lg border-x border-b border-[hsl(var(--border))]">
          <SyntaxHighlighter
            language={getHljsLang(active.extension)}
            style={atomOneDark}
            showLineNumbers
            customStyle={{
              margin: 0,
              background: "hsl(222, 47%, 6%)",
              fontSize: "13px",
              lineHeight: "1.6",
            }}
            lineNumberStyle={{
              color: "hsl(215, 20%, 30%)",
              fontSize: 11,
              minWidth: "2.5em",
            }}
          >
            {active.rawCode}
          </SyntaxHighlighter>
        </div>
      ) : (
        <div className="py-12 text-center border-x border-b border-[hsl(var(--border))] rounded-b-lg bg-[hsl(222,47%,6%)]">
          <p className="text-sm text-[hsl(var(--muted-foreground))] mb-3">
            Source not bundled. Open on GitHub:
          </p>
          <a
            href={active.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-[hsl(var(--accent))] hover:underline"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {active.filePath.split("/").pop()}
          </a>
        </div>
      )}
    </div>
  );
}
