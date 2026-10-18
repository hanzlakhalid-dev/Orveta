import type { Metadata } from "next";
import Link from "next/link";
import { Mail } from "lucide-react";

import { ContactActions } from "@/components/contact/contact-actions";
import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact",
  description: `Questions, feedback, bug reports or tool suggestions? Here's how to reach the ${siteConfig.name} team.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container py-14">
      <div className="mx-auto max-w-xl text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Mail className="h-5 w-5" />
        </span>
        <h1 className="mt-5 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Get in touch
        </h1>
        <p className="mt-3 text-muted-foreground">
          Found a bug, have a tool idea, or a question about how something works? Send us a note
          and we&apos;ll get back to you as soon as we can.
        </p>

        <div className="mt-8">
          <ContactActions email={siteConfig.email} />
        </div>

        <div className="mt-10 space-y-6 text-left text-sm text-muted-foreground">
          <section>
            <h2 className="font-display text-base font-semibold text-foreground">
              Reporting a problem? Please include
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 leading-relaxed">
              <li>the name of the tool, or the address of the page</li>
              <li>what you entered and what you expected to happen</li>
              <li>what actually happened</li>
              <li>your browser and device, for example Chrome on Windows</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-base font-semibold text-foreground">
              Please don&apos;t send
            </h2>
            <p className="mt-2 leading-relaxed">
              Passwords, bank or card details, or other sensitive personal information. We also
              can&apos;t give financial, tax or legal advice. The tools give estimates and starting
              points (see the{" "}
              <Link href="/disclaimer" className="text-primary underline-offset-4 hover:underline">
                Disclaimer
              </Link>
              ).
            </p>
          </section>

          <p className="leading-relaxed">
            Wondering how we handle your data? Read the{" "}
            <Link href="/privacy" className="text-primary underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
