import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/utils";

export function Logo({ tone = "default", className }: { tone?: "default" | "light"; className?: string }) {
  return (
    <Link to="/" className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gold-gradient shadow-soft">
        <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 text-gold-foreground" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 17c3-6 6-6 8-3s5 3 8-3" />
          <path d="M4 11c3-6 6-6 8-3s5 3 8-3" opacity=".45" />
        </svg>
      </span>
      <span
        className={cn(
          "logo-wordmark text-xl tracking-tight",
          tone === "light" ? "text-ink-foreground" : "text-foreground",
        )}
      >
        Capstone<span className="italic text-gold">Flow</span>
      </span>
    </Link>
  );
}
