import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2 className="mb-4 mt-12 font-display text-lg font-semibold text-[#f2f4f6] first:mt-0" {...props} />
  ),
  p: (props) => <p className="mb-3.5 max-w-[78ch] text-ink-dim" {...props} />,
  strong: (props) => <strong className="text-ink" {...props} />,
  ul: (props) => <ul className="mb-3.5 list-disc pl-5 text-ink-dim" {...props} />,
  li: (props) => <li className="mb-1.5" {...props} />,
  a: (props) => <a className="border-b border-dotted border-accent2 text-accent2" {...props} />,
  // Display math ($$...$$) rendered by rehype-katex lands inside a <div class="katex-display">
  // wrapper already; we just give it a consistent card treatment.
  div: (props) => {
    if (props.className?.includes("math-display") || props.className?.includes("katex-display")) {
      return (
        <div
          className="my-3.5 overflow-x-auto rounded border border-border-soft bg-panel2 px-5 py-4"
          {...props}
        />
      );
    }
    return <div {...props} />;
  },
  table: (props) => <table className="my-3.5 w-full border-collapse text-sm" {...props} />,
  th: (props) => (
    <th
      className="border border-border-soft px-3 py-2.5 text-left font-mono text-[11px] uppercase tracking-wide text-muted"
      {...props}
    />
  ),
  td: (props) => <td className="border border-border-soft px-3 py-2.5 text-ink-dim" {...props} />,
  blockquote: (props) => (
    <blockquote className="my-3.5 border-l-2 border-limit pl-4 text-[15px] text-ink-dim" {...props} />
  ),
  pre: (props) => (
    <pre
      className="my-3 overflow-x-auto rounded border border-border-soft bg-[#0d1013] px-4.5 py-4 font-mono text-[13px] leading-relaxed text-[#c8cdd4]"
      {...props}
    />
  ),
  code: (props) => <code className="font-mono" {...props} />
};
