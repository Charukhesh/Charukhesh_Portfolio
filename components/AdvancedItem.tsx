import type { Project } from "@/data/projects";

export default function AdvancedItem({ project }: { project: Project }) {
  return (
    <div className="grid grid-cols-1 items-center gap-4 border-b border-border-soft py-5 sm:grid-cols-[1fr_auto]">
      <div>
        <div className="text-[16.5px] text-[#f2f4f6]">{project.title}</div>
        <div className="mt-1.5 max-w-[62ch] text-[14.5px] text-ink-dim">{project.summary}</div>
        <div className="mt-1.5 font-mono text-[11.5px] text-muted">{project.methods.join(" · ")}</div>
      </div>
      {project.repo.url ? (
        <a
          href={project.repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap rounded border border-border px-3 py-1.5 font-mono text-xs text-accent2 hover:border-accent2"
        >
          GitHub ↗
        </a>
      ) : (
        <span className="whitespace-nowrap font-mono text-xs text-muted">{project.repo.note}</span>
      )}
    </div>
  );
}
