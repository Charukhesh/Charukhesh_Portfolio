import clsx from "clsx";

export function Tag({ children, active = false }: { children: React.ReactNode; active?: boolean }) {
  return (
    <span
      className={clsx(
        "whitespace-nowrap rounded border px-3 py-1.5 font-mono text-[12.5px]",
        active ? "border-accent2 bg-accent2-soft text-accent2" : "border-border text-ink-dim"
      )}
    >
      {children}
    </span>
  );
}

type BadgeKind = "deployed" | "validated" | "industrial" | "future";

const badgeStyles: Record<BadgeKind, string> = {
  deployed: "border-[#8bd0a055] text-[#8bd0a0]",
  validated: "border-accent2 text-accent2",
  industrial: "border-accent text-accent",
  future: "border-border text-muted"
};

export function Badge({ kind, children }: { kind: BadgeKind; children: React.ReactNode }) {
  return (
    <span className={clsx("rounded border px-2.5 py-1 font-mono text-[11px]", badgeStyles[kind])}>{children}</span>
  );
}
