import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

// dir="auto" lets each block detect its own direction, so Urdu renders
// right-to-left while English stays left-to-right in the same post.
const components: Components = {
  h1: ({ node, ...props }) => <h1 dir="auto" className="mt-12 mb-4 text-3xl font-medium tracking-tight text-fg" {...props} />,
  h2: ({ node, ...props }) => <h2 dir="auto" className="mt-12 mb-4 text-2xl font-medium tracking-tight text-fg" {...props} />,
  h3: ({ node, ...props }) => <h3 dir="auto" className="mt-8 mb-3 text-xl font-medium text-fg" {...props} />,
  p: ({ node, ...props }) => <p dir="auto" className="my-4 text-[15px] leading-relaxed text-fg-muted" {...props} />,
  a: ({ node, href, ...props }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noreferrer" : undefined}
      className="text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent"
      {...props}
    />
  ),
  ul: ({ node, ...props }) => (
    <ul className="my-4 list-disc space-y-2 pl-5 text-[15px] text-fg-muted marker:text-accent" {...props} />
  ),
  ol: ({ node, ...props }) => (
    <ol className="my-4 list-decimal space-y-2 pl-5 text-[15px] text-fg-muted marker:text-fg-subtle" {...props} />
  ),
  li: ({ node, ...props }) => <li dir="auto" className="leading-relaxed" {...props} />,
  strong: ({ node, ...props }) => <strong className="font-medium text-fg" {...props} />,
  blockquote: ({ node, ...props }) => (
    <blockquote dir="auto" className="my-6 border-l-2 border-accent pl-5 text-[15px] italic text-fg" {...props} />
  ),
  hr: () => <hr className="my-10 border-line" />,
  pre: ({ node, ...props }) => (
    <pre
      className="my-6 overflow-x-auto rounded-2xl border border-line bg-bg-subtle p-5 text-[13px] leading-relaxed"
      {...props}
    />
  ),
  code: ({ node, className, children, ...props }) => {
    const isBlock = /language-/.test(className ?? "");
    if (isBlock) {
      return (
        <code className="font-mono text-fg-muted" {...props}>
          {children}
        </code>
      );
    }
    return (
      <code
        className="rounded bg-elevated px-1.5 py-0.5 font-mono text-[0.85em] text-accent-bright"
        {...props}
      >
        {children}
      </code>
    );
  },
};

export function Markdown({ content }: { content: string }) {
  return (
    <div>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
