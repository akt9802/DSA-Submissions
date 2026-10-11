import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24 text-center space-y-4">
      <h1 className="text-6xl font-bold text-[hsl(var(--muted-foreground))]">404</h1>
      <p className="text-xl font-medium">Page not found</p>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="inline-flex mt-4 px-4 py-2 rounded-lg bg-[hsl(var(--accent))] text-white text-sm font-medium hover:opacity-90 transition-opacity"
      >
        Back to Dashboard
      </Link>
    </div>
  );
}
