import { toolContent } from "@/lib/tool-content";

const h2Class = "mt-10 font-display text-xl font-semibold text-foreground";
const pClass = "mt-3 text-sm leading-relaxed text-muted-foreground";

/** "How it works", "Worked example" and "Limits and assumptions" for tools that have written content. */
export function ToolContentSections({ slug }: { slug: string }) {
  const content = toolContent[slug];
  if (!content) return null;

  return (
    <>
      <h2 className={h2Class}>How it works</h2>
      {content.method.map((paragraph, i) => (
        <p key={i} className={pClass}>
          {paragraph}
        </p>
      ))}
      {content.formulas && (
        <ul className="mt-4 space-y-2">
          {content.formulas.map((formula, i) => (
            <li
              key={i}
              className="rounded-md border border-border bg-secondary/40 px-3 py-2 font-mono text-xs leading-relaxed text-foreground"
            >
              {formula}
            </li>
          ))}
        </ul>
      )}

      <h2 className={h2Class}>Worked example</h2>
      <p className={pClass}>{content.example.intro}</p>
      <div className="mt-4 rounded-lg border border-border p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">You enter</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-muted-foreground">
          {content.example.inputs.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Result</p>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-foreground">
          {content.example.results.map((line, i) => (
            <li key={i}>{line}</li>
          ))}
        </ul>
      </div>

      <h2 className={h2Class}>Limits and assumptions</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
        {content.limits.map((limit, i) => (
          <li key={i}>{limit}</li>
        ))}
      </ul>
    </>
  );
}
