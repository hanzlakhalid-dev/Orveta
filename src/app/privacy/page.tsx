import type { Metadata } from "next";
import Link from "next/link";

import { siteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles your data, cookies and analytics.`,
  path: "/privacy",
});

const lastUpdated = "October 2026";

const linkClass = "text-primary underline-offset-4 hover:underline";
const h2Class = "font-display text-xl font-semibold text-foreground";

export default function PrivacyPage() {
  return (
    <div className="container py-14">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">Last updated: {lastUpdated}</p>

        <div className="mt-10 space-y-8 text-muted-foreground">
          <section>
            <h2 className={h2Class}>Overview</h2>
            <p className="mt-3 leading-relaxed">
              {siteConfig.name} (&quot;we&quot;) operates {siteConfig.url.replace("https://", "")}. This
              policy explains what information is collected when you use the
              site, how it&apos;s used, and the choices you have. By using {siteConfig.name}, you
              agree to the practices described here.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Information you enter into tools</h2>
            <p className="mt-3 leading-relaxed">
              The tools are built to run in your browser. Text, numbers and dates you type into a
              tool, for example invoice details or meeting attendee counts, are processed on your
              device to produce the result, and the tools themselves don&apos;t send them to our
              servers. You don&apos;t need an account, so we don&apos;t keep what you enter.
            </p>
            <p className="mt-3 leading-relaxed">
              Two things to know. First, tool pages are covered by the analytics described below.
              Our session-recording tool is set to its strictest masking mode, which hides page text
              and the contents of form fields in recordings. Second, if you save a campaign in the
              UTM Builder, it is kept in your browser&apos;s local storage (see below). As a general
              precaution, please avoid entering passwords, bank or card details, or other sensitive
              personal information into any online tool.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Information you send us</h2>
            <p className="mt-3 leading-relaxed">
              If you email us or use the contact page, we receive your email address and whatever
              you include in your message. It is held in our email account, and we use it only to
              read and reply to you and to keep a record of the conversation. If you&apos;d like us
              to delete a message you sent, email us and ask.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Automatically collected information</h2>
            <p className="mt-3 leading-relaxed">
              Our hosting provider, Vercel, receives standard technical information when your
              browser asks for a page, such as your IP address, browser type and the page
              requested, and may keep it in server logs. We use this kind of information to
              understand traffic and improve the site, not to identify individual visitors.
            </p>
            <p className="mt-3 leading-relaxed">
              We use Microsoft Clarity, a behavior analytics tool, to see how visitors use our pages
              (for example clicks, scrolling and the type of device) so we can improve the site.
              Clarity may record sessions and create heatmaps. We have set Clarity to its strictest
              masking mode, which hides page text and the contents of form fields in those
              recordings. Microsoft processes this data; you can read how it handles it in the{" "}
              <a
                href="https://privacy.microsoft.com/privacystatement"
                target="_blank"
                rel="noopener noreferrer"
                className={linkClass}
              >
                Microsoft Privacy Statement
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Cookies and local storage</h2>
            <p className="mt-3 leading-relaxed">
              <span className="font-medium text-foreground">Local storage.</span> We use your
              browser&apos;s local storage for two things: remembering whether you prefer light or
              dark mode, and, in the UTM Builder, the campaign links you choose to save. These stay
              on your device and aren&apos;t sent to us. You can clear them in your browser settings,
              or use &quot;Clear all saved campaigns&quot; in the UTM Builder.
            </p>
            <p className="mt-3 leading-relaxed">
              <span className="font-medium text-foreground">Cookies.</span> Our own code
              doesn&apos;t set cookies. Microsoft Clarity sets cookies, such as one that holds an
              anonymous visitor ID and one that groups page views into a visit. Microsoft states
              that Clarity doesn&apos;t set its cookies for visitors in the European Economic Area,
              the United Kingdom or Switzerland unless consent is given. We don&apos;t currently
              show a consent prompt, so those visitors are treated as not having consented. You can
              block or delete cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Advertising</h2>
            <p className="mt-3 leading-relaxed">
              {siteConfig.name} doesn&apos;t currently show advertising. We may add it in the future
              to help cover the cost of running the site. If we do, this policy will be updated to
              explain which advertising services are used, what cookies they set, and how you can
              opt out.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Services we use</h2>
            <ul className="mt-3 list-disc space-y-1 pl-5 leading-relaxed">
              <li>Vercel: hosting and delivering the site.</li>
              <li>Microsoft Clarity: usage analytics, as described above.</li>
              <li>Zoho Mail: the email account that receives your messages.</li>
            </ul>
          </section>

          <section>
            <h2 className={h2Class}>Third-party links</h2>
            <p className="mt-3 leading-relaxed">
              Some pages may link to third-party websites or services. We aren&apos;t responsible
              for the content or privacy practices of sites we don&apos;t operate, and we&apos;d
              encourage you to review their own privacy policies.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Children&apos;s privacy</h2>
            <p className="mt-3 leading-relaxed">
              {siteConfig.name} is not directed at children under 13, and we do not knowingly
              collect personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Changes to this policy</h2>
            <p className="mt-3 leading-relaxed">
              We may update this policy from time to time. Changes will be posted on this page with
              an updated revision date.
            </p>
          </section>

          <section>
            <h2 className={h2Class}>Contact us</h2>
            <p className="mt-3 leading-relaxed">
              Questions about this policy can be sent to{" "}
              <span className="font-medium text-foreground">{siteConfig.email}</span>, or via our{" "}
              <Link href="/contact" className={linkClass}>
                Contact page
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
