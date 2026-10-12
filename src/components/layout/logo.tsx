import Link from "next/link";

import { cn } from "@/lib/utils";

/**
 * Orveta mark — an "O" ring with an open gap and a single amber spark
 * orbiting it. The ring is the toolkit, the spark is the tool you reach for.
 * Colors are fixed brand values so the mark looks identical in light and dark.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("h-8 w-8 shrink-0", className)}
    >
      <rect width="32" height="32" rx="8" fill="#3D5AFE" />
      <g className="origin-[16px_16px] transition-transform duration-500 ease-out motion-reduce:transition-none group-hover:rotate-90">
        <circle
          cx="16"
          cy="16"
          r="7.5"
          fill="none"
          stroke="#fff"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeDasharray="36.12 11"
          transform="rotate(-3 16 16)"
        />
        <circle cx="21.3" cy="10.7" r="2.4" fill="#FFB020" />
      </g>
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="Orveta home"
      className={cn("group flex shrink-0 items-center gap-2.5", className)}
    >
      <LogoMark />
      <span className="font-display text-lg font-bold tracking-tight text-foreground">
        Orveta
      </span>
    </Link>
  );
}
