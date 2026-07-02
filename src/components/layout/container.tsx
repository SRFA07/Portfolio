import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

/** Centered max-width wrapper with responsive gutters. */
export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6 md:px-8", className)} {...props} />
  );
}

/** A vertical section with generous rhythm and an optional anchor id. */
export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("scroll-mt-24 py-20 md:py-28", className)} {...props} />;
}

/** Small mono eyebrow label used above section headings. */
export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "font-mono text-xs uppercase tracking-[0.2em] text-accent",
        className,
      )}
      {...props}
    />
  );
}
