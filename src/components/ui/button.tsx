import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Variant = "primary" | "outline" | "ghost" | "accent";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:bg-white",
  outline:
    "border border-line-strong text-fg hover:bg-surface hover:border-[color:var(--color-line-strong)]",
  ghost: "text-fg-muted hover:text-fg",
  accent:
    "border border-transparent bg-accent-soft text-accent-bright hover:border-[color:var(--color-accent-dim)]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function buttonVariants({
  variant = "primary",
  size = "md",
}: { variant?: Variant; size?: Size } = {}) {
  return cn(base, variants[variant], sizes[size]);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; size?: Size }) {
  return <button className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
