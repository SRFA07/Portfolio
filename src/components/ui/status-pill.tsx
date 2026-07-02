import { cn } from "@/lib/utils";
import type { Status } from "@/content/projects/types";

const labels: Record<Status, string> = {
  research: "Research",
  shipped: "Shipped",
  "design-spec": "Design spec",
  "in-progress": "In progress",
};

// Active/forward-looking states get the accent dot; shipped is calm/neutral.
const accentDot: Record<Status, boolean> = {
  research: true,
  shipped: false,
  "design-spec": true,
  "in-progress": true,
};

export function StatusPill({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs text-fg-subtle",
        className,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          accentDot[status] ? "bg-accent" : "bg-fg-subtle",
        )}
      />
      {labels[status]}
    </span>
  );
}
