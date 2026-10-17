import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { activeCategories, tools } from "@/lib/tools-registry";
import { categoryLabels } from "@/types/tool";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "About",
  description: `Why ${siteConfig.name} exists, how the tools work, what free means here, and how to reach us.`,
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="container py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          About Orveta
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Orveta is a free library of small, well-made tools for everyday work — the kind of thing
          you reach for once, use for thirty seconds, and forget about until next time you need it.
        </p>

        <div className="mt-10 space-y-8 text-muted-foreground">
          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Why this exists</h2>
            <p className="mt-3 leading-relaxed">
              Most "free tools" online today are the same handful of features buried behind
              sign-up walls, autoplay video ads, or a dozen clicks to find the actual button you
              need. We got tired of that, so we started building the tools we kept wishing existed
              — no account required, no bait-and-switch premium tier, just a page that does the
              one thing you came for.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">How the tools work</h2>
            <p className="mt-3 leading-relaxed">
              The tools on Orveta are built to run in your browser. When you fill in a form —
              whether that's drafting an out-of-office message, building an invoice, or timing a
              meeting's cost — the calculation happens on your device, and the tool itself doesn't
              send what you type to our servers. One tool, the UTM Builder, saves your campaign
              list in your browser's local storage so it's there next time, and that stays on your
              device too. Like most websites, {siteConfig.name} uses analytics to see how pages are
              used; the{" "}
              <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                Privacy Policy
              </Link>{" "}
              explains what is collected.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Is Orveta really free?</h2>
            <p className="mt-3 leading-relaxed">
              Yes. Every tool is free to use, with no sign-up, no usage limits and no "upgrade to
              unlock" walls. Running a website costs money, so we may show advertising in the
              future. If that happens, the{" "}
              <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
                Privacy Policy
              </Link>{" "}
              will explain how it works.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">A note on accuracy</h2>
            <p className="mt-3 leading-relaxed">
              Calculators and generators give estimates and starting points, based on the numbers
              you enter and the assumptions explained on each tool's page. They aren't financial,
              tax or legal advice, so check anything important with a qualified professional. If
              you spot a mistake, please{" "}
              <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                tell us
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Where we're headed</h2>
            <p className="mt-3 leading-relaxed">
              Orveta currently has {tools.length} tools live across{" "}
              {new Intl.ListFormat("en", { style: "long", type: "conjunction" }).format(
                activeCategories.map((category) => categoryLabels[category].toLowerCase())
              )}{" "}
              categories, and new tools are added over time. If there's a tool you keep wishing
              existed, that's exactly the kind of thing we want to hear about.
            </p>
          </section>

          <section>
            <h2 className="font-display text-xl font-semibold text-foreground">Questions or feedback?</h2>
            <p className="mt-3 leading-relaxed">
              Email us at{" "}
              <span className="font-medium text-foreground">{siteConfig.email}</span>, or use the{" "}
              <Link href="/contact" className="text-primary underline-offset-4 hover:underline">
                contact page
              </Link>
              . Corrections, bug reports and tool ideas are all welcome.
            </p>
          </section>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/tools">Browse all tools</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
