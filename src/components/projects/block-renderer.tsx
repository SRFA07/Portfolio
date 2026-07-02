import { Info, Lightbulb, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Block } from "@/content/projects/types";
import { Diagram } from "./diagrams";

const calloutStyle = {
  note: { wrap: "border-line bg-surface", icon: "text-fg-muted", Icon: Info },
  insight: {
    wrap: "border-[color:var(--color-accent-dim)] bg-accent-soft",
    icon: "text-accent",
    Icon: Lightbulb,
  },
  caution: {
    wrap: "border-amber-500/30 bg-amber-500/[0.06]",
    icon: "text-amber-300",
    Icon: TriangleAlert,
  },
} as const;

function OneBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-[15px] leading-relaxed text-fg-muted">{block.text}</p>;

    case "list":
      if (block.ordered) {
        return (
          <ol className="list-decimal space-y-2.5 pl-5 text-[15px] leading-relaxed text-fg-muted">
            {block.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="space-y-2.5 pl-1 text-[15px] leading-relaxed text-fg-muted">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "callout": {
      const s = calloutStyle[block.tone ?? "note"];
      return (
        <div className={cn("rounded-2xl border p-5", s.wrap)}>
          <div className="flex items-start gap-3">
            <s.Icon className={cn("mt-0.5 h-4 w-4 shrink-0", s.icon)} />
            <div>
              {block.title && (
                <div className="text-sm font-medium text-fg">{block.title}</div>
              )}
              <p className={cn("text-sm leading-relaxed text-fg-muted", block.title && "mt-1.5")}>
                {block.text}
              </p>
            </div>
          </div>
        </div>
      );
    }

    case "metrics":
      return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {block.items.map((m) => (
            <div key={m.label} className="rounded-2xl border border-line bg-surface p-5">
              <div className="text-2xl font-medium tracking-tight text-fg">{m.value}</div>
              <div className="mt-1.5 text-sm text-fg-muted">{m.label}</div>
              {m.sub && <div className="mt-0.5 text-xs text-fg-subtle">{m.sub}</div>}
            </div>
          ))}
        </div>
      );

    case "table":
      return (
        <figure className="overflow-hidden rounded-2xl border border-line">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b border-line bg-surface">
                  {block.columns.map((c) => (
                    <th
                      key={c}
                      className="px-4 py-3 text-left font-mono text-xs uppercase tracking-wider text-fg-subtle"
                    >
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr
                    key={ri}
                    className={cn(
                      "border-b border-line last:border-0",
                      block.highlightRows?.includes(ri)
                        ? "bg-accent-soft"
                        : "hover:bg-surface/60",
                    )}
                  >
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className={cn(
                          "px-4 py-3",
                          ci === 0 ? "text-fg" : "font-mono text-fg-muted",
                          block.highlightRows?.includes(ri) && "text-fg",
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <figcaption className="border-t border-line bg-surface/40 px-4 py-3 text-xs leading-relaxed text-fg-subtle">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "code":
      return (
        <figure className="overflow-hidden rounded-2xl border border-line bg-bg-subtle">
          <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed">
            <code className="font-mono text-fg-muted">{block.code}</code>
          </pre>
          {block.caption && (
            <figcaption className="border-t border-line px-5 py-3 text-xs text-fg-subtle">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "image":
      return (
        <figure className="overflow-hidden rounded-2xl border border-line bg-surface">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={block.src} alt={block.alt} className="w-full" />
          {block.caption && (
            <figcaption className="border-t border-line px-4 py-3 text-xs text-fg-subtle">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );

    case "diagram":
      return (
        <figure className="overflow-hidden rounded-2xl border border-line bg-bg-subtle p-6">
          <Diagram id={block.id} />
          {block.caption && (
            <figcaption className="mt-4 text-xs leading-relaxed text-fg-subtle">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
  }
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => (
        <OneBlock key={i} block={block} />
      ))}
    </div>
  );
}
