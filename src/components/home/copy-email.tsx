"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CopyEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard blocked — fall back to opening the mail client.
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <button
      onClick={copy}
      className={cn(buttonVariants({ variant: "outline" }), "font-mono")}
      aria-label="Copy email address"
    >
      {copied ? <Check className="h-4 w-4 text-accent" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : email}
    </button>
  );
}
