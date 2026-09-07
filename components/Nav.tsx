"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

const SECTIONS = [
  { id: "research", num: "01", label: "RESEARCH" },
  { id: "projects", num: "02", label: "PROJECTS" },
  { id: "suas", num: "03", label: "LEADERSHIP" },
  { id: "experience", num: "04", label: "EXPERIENCE" },
  { id: "publications", num: "05", label: "PUBLICATIONS" },
  { id: "about", num: "06", label: "ABOUT" }
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const pathname = usePathname();
  const onHome = pathname === "/";

  useEffect(() => {
    if (!onHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [onHome]);

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-4 pt-3.5">
      <div className="flex w-full max-w-wide items-center justify-between rounded-full border border-border-soft bg-bg/80 px-4 py-2 backdrop-blur-md sm:px-5">
        <Link href="/" className="flex items-center gap-2 font-mono text-xs tracking-wider text-ink">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent pulse-soft" />
          CBR
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={onHome ? `#${s.id}` : `/#${s.id}`}
              className={`rounded-full px-3 py-1.5 font-mono text-[11.5px] tracking-wide transition-colors ${
                active === s.id ? "bg-accent-soft text-accent" : "text-muted hover:text-ink-dim"
              }`}
            >
              <span className="text-[10px] opacity-60">{s.num}</span> / {s.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          {/* Email Button added here */}
          <a
            href="mailto:ae22b028@smail.iitm.ac.in"
            className="hidden rounded-full border border-border px-3 py-1.5 font-mono text-[11.5px] text-ink-dim hover:border-accent hover:text-accent sm:block"
          >
            Email
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-border px-3 py-1.5 font-mono text-[11.5px] text-ink-dim hover:border-accent hover:text-accent sm:block"
          >
            GitHub
          </a>
          <button
            className="rounded-full border border-border px-3 py-1.5 font-mono text-[11px] text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute inset-x-4 top-16 flex flex-col gap-1 rounded-2xl border border-border-soft bg-bg/95 p-3 backdrop-blur-md md:hidden">
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={onHome ? `#${s.id}` : `/#${s.id}`}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 font-mono text-[12.5px] text-ink-dim hover:bg-accent-soft hover:text-accent"
            >
              <span className="opacity-60">{s.num}</span> / {s.label}
            </a>
          ))}
          {/* Email Button added to the mobile dropdown menu */}
          <a
            href="mailto:ae22b028@smail.iitm.ac.in"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2.5 font-mono text-[12.5px] text-ink-dim hover:bg-accent-soft hover:text-accent"
          >
            Email ↗
          </a>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-2.5 font-mono text-[12.5px] text-ink-dim hover:bg-accent-soft hover:text-accent"
          >
            GitHub ↗
          </a>
        </div>
      )}
    </header>
  );
}