"use client";

import * as React from "react";
import { Check, Copy, ExternalLink, Mail } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

/**
 * A plain mailto: link does nothing on devices with no mail app set up, so we
 * offer three ways in: open the mail app, compose in Gmail, or copy the address.
 */
export function ContactActions({ email }: { email: string }) {
  const [copied, setCopied] = React.useState(false);
  const [mailHint, setMailHint] = React.useState(false);
  const hintTimer = React.useRef<number | undefined>(undefined);

  React.useEffect(() => () => window.clearTimeout(hintTimer.current), []);

  /**
   * If a mail app opens, the browser window loses focus almost immediately.
   * If nothing happens within 1.5s, the device probably has no mail app set up,
   * so we point the visitor to the other two options.
   */
  function handleMailClick() {
    setMailHint(false);
    window.clearTimeout(hintTimer.current);
    const cancel = () => {
      window.clearTimeout(hintTimer.current);
      window.removeEventListener("blur", cancel);
      document.removeEventListener("visibilitychange", cancel);
    };
    window.addEventListener("blur", cancel, { once: true });
    document.addEventListener("visibilitychange", cancel, { once: true });
    hintTimer.current = window.setTimeout(() => {
      cancel();
      setMailHint(true);
    }, 1500);
  }

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      toast.success("Email address copied");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.message(`Our email is ${email}`);
    }
  }

  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-border bg-card px-4 py-3">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Email us at</p>
        <p className="mt-1 select-all break-all font-mono text-base font-medium text-foreground sm:text-lg">
          {email}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        <Button asChild size="lg">
          <a href={`mailto:${email}`} onClick={handleMailClick}>
            <Mail /> Open email app
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a href={gmailUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink /> Write in Gmail
          </a>
        </Button>
        <Button size="lg" variant="outline" onClick={copyEmail}>
          {copied ? <Check /> : <Copy />} {copied ? "Copied" : "Copy address"}
        </Button>
      </div>

      {mailHint && (
        <p role="status" className="text-sm text-muted-foreground">
          Nothing opened? This device may not have an email app set up. Use &ldquo;Write in
          Gmail&rdquo; or copy the address instead.
        </p>
      )}
    </div>
  );
}
