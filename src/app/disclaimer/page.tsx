import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Disclaimer",
  description: `What ${siteConfig.name}'s tools can and can't do: estimates, drafts and quick checks are not financial, tax or legal advice.`,
  path: "/disclaimer",
});

const lastUpdated = "October 2026";

const linkClass = "text-primary underline-offset-4 hover:underline";
const h2Class = "font-display text-xl font-semibold text-foreground";
const sectionClass = "scroll-mt-24";

export default function DisclaimerPage() {
  return (
    <div className="container py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Disclaimer
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>

        <p className="mt-8 leading-relaxed text-muted-foreground">
          {siteConfig.name}&apos;s tools are built to be helpful and easy to use, but they are
          general-purpose tools. This page explains what they can and can&apos;t do. It applies
          alongside the{" "}
          <Link href="/terms" className={linkClass}>
            Terms of Use
          </Link>
          .
        </p>

        <div className="mt-10 space-y-8 text-muted-foreground">
          <section id="general" className={sectionClass}>
            <h2 className={h2Class}>General</h2>
            <p className="mt-3 leading-relaxed">
              Everything on {siteConfig.name} — tools, results, drafts and guides — is provided for
              general information only. It is not professional advice, and using the site does not
              create a client, advisor or other professional relationship. Results depend entirely
              on what you enter and on the assumptions described on each tool&apos;s page. Rates,
              thresholds and legal requirements change, and they differ between countries, states
              and industries. Several tools use U.S. examples or rules (for example, IRS mileage
              rates), which may not apply where you live. Always check important figures against a
              current official source.
            </p>
          </section>

          <section id="financial" className={sectionClass}>
            <h2 className={h2Class}>Financial calculators and estimates</h2>
            <p className="mt-3 leading-relaxed">
              Calculators for pricing, margins, leases, debt payoff, ownership dilution, retention
              and similar topics produce estimates from your inputs. They are not financial,
              investment or accounting advice, and they are not an offer or a recommendation. Actual
              outcomes, such as closing costs, interest, valuations or revenue, can and will differ.
              Check the numbers with a qualified professional before you commit money, sign a
              contract or raise funds based on them. Invoices and receipts you create are your own
              documents: you are responsible for their contents, including the taxes and legal
              requirements that apply to your business.
            </p>
          </section>

          <section id="tax" className={sectionClass}>
            <h2 className={h2Class}>Tax</h2>
            <p className="mt-3 leading-relaxed">
              The tax deduction estimator gives a rough estimate only. Tax rules, rates and
              eligibility vary by country, state and personal circumstances, and they change.
              Whether an expense is actually deductible is something only you and a qualified tax
              professional can decide. Keep proper records, and don&apos;t rely on this tool when
              preparing a tax return.
            </p>
          </section>

          <section id="legal" className={sectionClass}>
            <h2 className={h2Class}>Legal and compliance drafts</h2>
            <p className="mt-3 leading-relaxed">
              The NDA builder, privacy policy generator, retention schedule builder, contractor
              classifier and password policy builder produce baseline drafts or indicative results to
              help you get started. {siteConfig.name} is not a law firm, and nothing here is legal
              advice or creates an attorney–client relationship. Laws differ by location and
              situation, and a draft may be incomplete or unsuitable for your case. A risk score is
              not a legal determination: it doesn&apos;t decide how a tax authority or a court would
              classify a worker. Have a qualified lawyer review any document before you rely on or
              publish it.
            </p>
          </section>

          <section id="security" className={sectionClass}>
            <h2 className={h2Class}>Security, accessibility and technical checks</h2>
            <p className="mt-3 leading-relaxed">
              Tools that check passwords, security headers, email authentication records, colour
              contrast or page structure give a quick indication, not a guarantee. A high password
              score doesn&apos;t mean a password is safe, and a passing check doesn&apos;t prove that
              a site is secure, accessible or compliant with a standard. Test changes in a safe
              environment before you use them in production. As a precaution, don&apos;t enter a
              password you currently use anywhere into any online tool, including this one.
            </p>
          </section>

          <section id="estimates" className={sectionClass}>
            <h2 className={h2Class}>Marketing and other estimates</h2>
            <p className="mt-3 leading-relaxed">
              Estimators for advertising, quality scores, sponsorship rates and similar topics show
              illustrative figures. Our quality score estimator is not Google&apos;s own score, and
              real results on any platform depend on factors we can&apos;t see. Treat these figures
              as starting points for your own judgment.
            </p>
          </section>

          <section id="affiliation" className={sectionClass}>
            <h2 className={h2Class}>No affiliation</h2>
            <p className="mt-3 leading-relaxed">
              {siteConfig.name} is independent. Names of other companies and products that appear on
              the site, such as Google, TikTok, Instagram, YouTube and Twitch, are trademarks of
              their owners, and their appearance doesn&apos;t mean any affiliation with or
              endorsement by them. References to the IRS or other agencies are for explanation only;{" "}
              {siteConfig.name} is not connected to any government body.
            </p>
          </section>

          <section id="mistakes" className={sectionClass}>
            <h2 className={h2Class}>Found a mistake?</h2>
            <p className="mt-3 leading-relaxed">
              We want the tools to be right. If you spot an error or an out-of-date figure, please{" "}
              <Link href="/contact" className={linkClass}>
                tell us
              </Link>{" "}
              at <span className="font-medium text-foreground">{siteConfig.email}</span>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
