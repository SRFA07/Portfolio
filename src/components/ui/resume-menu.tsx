"use client";

import { useEffect, useRef, useState } from "react";
import { FileText, ChevronDown } from "lucide-react";
import { site } from "@/lib/site";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

/**
 * "Résumé" button that opens a dropdown of role-specific résumés.
 * Closes on outside click or Escape.
 */
export function ResumeMenu({
  variant = "outline",
  size = "md",
  align = "left",
  label = "Résumé",
  className,
}: {
  variant?: Variant;
  size?: Size;
  align?: "left" | "right";
  label?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={buttonVariants({ variant, size })}
      >
        <FileText className="h-4 w-4" />
        {label}
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      <div
        role="menu"
        className={cn(
          "absolute z-50 mt-2 w-48 overflow-hidden rounded-xl border border-line bg-elevated p-1 shadow-xl transition-all duration-150",
          align === "right" ? "right-0" : "left-0",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div className="px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-subtle">
          Role-specific résumés
        </div>
        {site.resumes.map((r) => (
          <a
            key={r.label}
            href={r.href}
            target="_blank"
            rel="noreferrer"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-fg-muted transition-colors hover:bg-surface hover:text-fg"
          >
            {r.label}
            <FileText className="h-3.5 w-3.5 opacity-40" />
          </a>
        ))}
      </div>
    </div>
  );
}
