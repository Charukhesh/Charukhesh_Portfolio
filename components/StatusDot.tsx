import type { ProjectStatus } from "@/data/projects";

const STATUS_META: Record<ProjectStatus, { label: string; color: string }> = {
  active: { label: "ACTIVE", color: "#d7a24a" },
  completed: { label: "COMPLETED", color: "#7c8590" },
  validated: { label: "VALIDATED", color: "#5fb8b0" },
  industry: { label: "INDUSTRY COLLABORATION", color: "#8bd0a0" },
  research: { label: "RESEARCH", color: "#aeb6c0" }
};

export default function StatusDot({ status }: { status: ProjectStatus }) {
  const meta = STATUS_META[status];
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] uppercase tracking-wider text-muted">
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: meta.color }}
        aria-hidden
      />
      {meta.label}
    </span>
  );
}
