import Link from "next/link";
import { Info } from "lucide-react";

import { disclaimerNotices, toolDisclaimerKind } from "@/lib/disclaimers";

/** Short notice shown under a tool that handles money, tax, legal or compliance topics. */
export function ToolDisclaimer({ slug }: { slug: string }) {
  const kind = toolDisclaimerKind[slug];
  if (!kind) return null;
  const { text, anchor } = disclaimerNotices[kind];

  return (
    <aside
      role="note"
      className="mt-8 flex items-start gap-3 rounded-lg border border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground"
    >
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      <p className="leading-relaxed">
        {text}{" "}
        <Link href={`/disclaimer#${anchor}`} className="whitespace-nowrap text-primary underline-offset-4 hover:underline">
          Read the full disclaimer
        </Link>
      </p>
    </aside>
  );
}
