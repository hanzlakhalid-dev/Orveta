import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use",
  description: `The terms for using ${siteConfig.name}'s free tools and guides: what the tools do and don't promise, fair use, and how to contact us.`,
  path: "/terms",
});

const lastUpdated = "October 2026";

const linkClass = "text-primary underline-offset-4 hover:underline";
const h2Class = "font-display text-xl font-semibold text-foreground";

export default function TermsPage() {
  return (
    <div className="container py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>

        <div className="mt-10 space-y-8 text-muted-foreground">
          <section>
            <h2 className={h2Class}>Agreement</h2>
            <p className="mt-3 leading-relaxed">
              By using {siteConfig.name} ({siteConfig.url.replace("https://", "")}), you agree to
              these terms. If you don&apos;t agree, please don&apos;t use the site.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>What {siteConfig.name} provides</h2>
            <p className="mt-3 leading-relaxed">
              {siteConfig.name} is a library of free online tools, such as calculators, generators,
              converters and formatters, plus written guides. You don&apos;t need an account to use
              it. We may add, change or remove tools, guides or features at any time, without
              notice.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Estimates, not advice</h2>
            <p className="mt-3 leading-relaxed">
              The tools give estimates and starting points based on what you enter and the
              assumptions described on each tool&apos;s page. They are not financial, tax, legal,
              medical or other professional advice, and they don&apos;t replace a qualified
              professional. You are responsible for checking results and for any decision you make
              using them. See the{" "}
              <Link href="/disclaimer" className={linkClass}>
                Disclaimer
              </Link>{" "}
              for details.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Using the site fairly</h2>
            <p className="mt-3 leading-relaxed">Please don&apos;t:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>use the site for anything unlawful, or to harm others;</li>
              <li>try to break, overload or gain unauthorised access to the site or its systems;</li>
              <li>use automated tools to send an unreasonable amount of traffic;</li>
              <li>copy the site&apos;s text, design or code wholesale and present it as your own.</li>
            </ul>
            <p className="mt-3 leading-relaxed">We may block access for anyone who misuses the site.</p>
          </section>

          <section>
            <h2 className={h2Class}>What you enter and what you create</h2>
            <p className="mt-3 leading-relaxed">
              The tools are built to run in your browser, and what you enter is not sent to our
              servers by the tools themselves (see the{" "}
              <Link href="/privacy" className={linkClass}>
                Privacy Policy
              </Link>{" "}
              for how analytics work). You are responsible for what you enter. Anything you create
              with a tool, such as an invoice, a draft agreement or a snippet of code, is yours to
              use. Drafts such as NDAs or policies are starting points, so read and adapt them, and
              get professional advice where it matters.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Our content</h2>
            <p className="mt-3 leading-relaxed">
              The site&apos;s design, text, guides, branding and code belong to {siteConfig.name} or
              its operator, and are protected by copyright and other laws. These terms don&apos;t
              give you ownership of them.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Third-party services and links</h2>
            <p className="mt-3 leading-relaxed">
              The site uses third-party services, for example hosting and analytics, and may link to
              other websites. We don&apos;t control those services or sites and aren&apos;t
              responsible for them. The{" "}
              <Link href="/privacy" className={linkClass}>
                Privacy Policy
              </Link>{" "}
              lists the services we use.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>No guarantees</h2>
            <p className="mt-3 leading-relaxed">
              The site and tools are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;.
              We try to keep things accurate and running, but we don&apos;t promise that the site
              will always be available, error-free or up to date, or that any result is correct.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Limit of liability</h2>
            <p className="mt-3 leading-relaxed">
              To the extent the law allows, {siteConfig.name} and its operator are not liable for
              any indirect, incidental or consequential loss, or for any loss or damage arising from
              your use of, or inability to use, the site or its tools, including decisions made from
              the results. Nothing in these terms excludes liability that can&apos;t legally be
              excluded.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Changes to these terms</h2>
            <p className="mt-3 leading-relaxed">
              We may update these terms from time to time. The date at the top shows when they last
              changed. If you keep using the site after a change, you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Contact</h2>
            <p className="mt-3 leading-relaxed">
              Questions about these terms? Email{" "}
              <span className="font-medium text-foreground">{siteConfig.email}</span> or use the{" "}
              <Link href="/contact" className={linkClass}>
                contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
