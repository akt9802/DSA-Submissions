import Link from "next/link";
import { Github } from "lucide-react";
import Image from "next/image";

const NAV = [
  { href: "/", label: "dashboard" },
  { href: "/problems", label: "problems" },
  { href: "/about", label: "about" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[hsl(var(--border))] bg-[hsl(var(--background))/98] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-6">
        {/* Logo — favicon + identity */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group"
        >
          <Image
            src="/favicon.ico"
            alt="logo"
            width={20}
            height={20}
            className="rounded-sm opacity-90 group-hover:opacity-100 transition-opacity"
            unoptimized
          />
          <span className="font-mono text-sm font-semibold text-[hsl(var(--foreground))] tracking-tight">
            akt9802
            <span className="text-[hsl(var(--muted-foreground))] font-normal">/dsa</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-0">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-1 text-sm font-mono text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* GitHub */}
        <a
          href="https://github.com/akt9802/DSA-Submissions"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
          aria-label="GitHub repository"
        >
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline text-xs">GitHub</span>
        </a>
      </div>
    </header>
  );
}
