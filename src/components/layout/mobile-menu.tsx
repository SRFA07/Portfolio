"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="grid h-9 w-9 place-items-center rounded-full text-fg-muted transition-colors hover:bg-surface hover:text-fg"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      <div
        className={cn(
          "fixed inset-x-0 top-16 z-40 origin-top border-b border-line bg-bg/95 backdrop-blur-xl transition-all duration-200",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <nav className="flex flex-col px-6 py-3">
          {site.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3.5 text-[15px] text-fg-muted transition-colors last:border-0 hover:text-fg"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-3 border-t border-line pt-3">
            <div className="pb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
              Role-specific résumés
            </div>
            <div className="flex flex-wrap gap-2">
              {site.resumes.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setOpen(false)}
                  className="rounded-lg border border-line px-3 py-1.5 text-sm text-accent transition-colors hover:bg-surface"
                >
                  {r.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
